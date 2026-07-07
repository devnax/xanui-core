# Server-Side Rendering (Styles)

> Note: there is no exported `RenderServerStyles` component (nor any component by that name in `src/`). Style injection during SSR happens automatically, internally, wherever `<Tag>` or `<ThemeProvider>`/`<AppRoot>` render. This page documents the actual mechanism and the public APIs around it (`useCSSCache`, `useCSSCacheId`, `getCSSCache`, and the `CSSCacheId` prop on `AppRoot`/`Iframe`).

## How style injection works

Every `<Tag>` (via `useTagProps`) and every `<ThemeProvider>`/`<AppRoot>` (for the theme's global CSS variables, CSS reset, and scrollbar styling) computes its styles with the internal `css()` factory (from `src/css`, built on `oncss`). That call returns a `CSSFactoryType` object exposing at least `classname` and `css` (the generated stylesheet text).

When rendering on the server (`typeof window === "undefined"`), each of these components additionally renders an internal `<ServerStyleTag factory={...} />` (`src/Tag/ServerStyleTag.tsx`) next to its output:

```tsx
// src/Tag/ServerStyleTag.tsx (internal, not exported)
const ServerStyleTag = ({ factory }) => {
  if (typeof window === 'undefined') {
    return (
      <style
        dangerouslySetInnerHTML={{ __html: factory.css }}
        precedence={factory.classname}
        href={factory.classname}
      />
    )
  }
  return null
}
```

- The `precedence` / `href` attributes are React DOM's built-in hoistable-stylesheet mechanism (React 19): React automatically de-duplicates identical `<style href="...">` tags and hoists them into `<head>` during server rendering (including streaming), so **you don't need to manually place anything in `<head>`** — it happens wherever `<Tag>`/`<ThemeProvider>`/`<AppRoot>` happen to render.
- On the client, `ServerStyleTag` renders `null`. Styles are instead injected directly into the DOM by `oncss` itself (the `css()` call is made with `injectStyle: typeof window !== "undefined"`).
- Separately, `AppRoot` runs an effect on mount that moves any `<style data-oncss>` elements it finds under `<body>` into `<head>`. None of the current internal styling code sets a `data-oncss` attribute, so today this only matters if something else in your app renders style tags with that attribute.

Because this all happens automatically, integrating SSR requires no extra setup beyond rendering `<AppRoot>` (or `<ThemeProvider isRoot>`) on the server as you normally would — there's no separate "flush styles" call or head-injection component to wire up.

## Style caching (`CSSCacheProvider`)

`AppRoot` (and, transitively, `Iframe`, which renders a nested `AppRoot`) wraps its subtree in a `CSSCacheProvider` that supplies a `cacheId` string through context:

```tsx
<AppRoot CSSCacheId="my-app"> {/* defaults to an auto-generated useId() value */}
  {children}
</AppRoot>
```

Every `css()` call made by `<Tag>`/`<ThemeProvider>` inside that subtree reads the nearest `cacheId` (via `useCSSCacheId()`) and passes it through to `oncss`, which uses it to key the generated stylesheet cache per root. This is what lets an `<Iframe>` — which mounts a separate `AppRoot` inside a different `document` — keep its own independent style cache instead of colliding with the parent page's.

### Exports

| Export                      | Signature                                | Description                                                                                                                                    |
| ---------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `useCSSCacheId()`           | `() => string`                            | Returns the `cacheId` from the nearest `CSSCacheProvider` (set by `AppRoot`/`Iframe`). Used internally by `<Tag>` and `<ThemeProvider>`.        |
| `useCSSCache()`             | `() => { cacheId: string; cache: Map<string, CSSFactoryType> \| undefined } \| null` | Client-only — returns `null` during SSR. Otherwise looks up the current cache from `oncss`'s global `ONCSS_CACHE.caches()` map. |
| `getCSSCache(cacheId)`      | `(cacheId: string) => Map<string, CSSFactoryType> \| undefined` | Context-free version of the above — look up a specific cache by id (for example, one you assigned via `CSSCacheId` on an `AppRoot`), from outside the component tree. |

## Usage

### Giving an `AppRoot` a stable cache id

Useful if you want a deterministic id (e.g. for debugging, or to look it up later with `getCSSCache`) instead of the auto-generated one:

```tsx
import { AppRoot } from 'xanui-core'

<AppRoot theme={theme} CSSCacheId="main-app">
  {children}
</AppRoot>
```

### Inspecting the cache

```tsx
import { useCSSCache, getCSSCache } from 'xanui-core'

const Inspector = () => {
  const { cacheId, cache } = useCSSCache() ?? {}
  // cache?.size -> number of distinct generated stylesheets for this root

  return null
}

// or, given a known id:
const cache = getCSSCache('main-app')
```
