# AppRoot

`AppRoot` is the composition root for a Xanui-powered application. It wraps `ThemeProvider` (with `isRoot` forced on), and also mounts `DocumentProvider`, `CSSCacheProvider`, `AppRootProvider`, and `BreakpointProvider` around your tree — so a single component gives you theme CSS variables, a CSS reset, scrollbar styling, breakpoint context, document context, and a CSS cache scope.

## Signature

```tsx
<AppRoot theme={theme} defaultBreakpoint="lg" noScrollbarCss={false} selectionColor="brand">
  {children}
</AppRoot>
```

`AppRoot` is a `forwardRef` component generic over the rendered tag (defaults to `"div"`), so `ref` resolves to the underlying DOM node.

### Props

`AppRoot` extends `ThemeProviderProps<T>` (which itself extends `TagProps<T>`), so every prop accepted by `ThemeProvider`/`Tag` works here (`theme`, `onThemeUpdate`, `scrollbar`, `component`, spacing/color/layout props, DOM attributes, etc.). Additional props defined by `AppRoot` itself:

| Prop                | Type                                                                                          | Default      | Description                                                                                                                        |
| ------------------- | ---------------------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| `theme`             | `ThemeOptions`                                                                                  | —            | Required. The active theme, e.g. from `createTheme(...)`.                                                                          |
| `noScrollbarCss`    | `boolean`                                                                                       | `false`      | When `true`, skips injecting the themed scrollbar CSS (see the `scrollbar` prop below).                                          |
| `document`          | `Document`                                                                                      | `window.document` (when available) | Lets you render `AppRoot` against a different `document` — used internally by `<Iframe>` to mount a nested root inside an iframe's own document. |
| `CSSCacheId`        | `string`                                                                                        | auto-generated via `useId()` | Scopes the `oncss` style cache for everything rendered under this `AppRoot`. Useful for isolating style caches between multiple roots (e.g. host page vs. an `<Iframe>`). |
| `disableRenderar`   | `boolean`                                                                                       | `false`      | When `true`, does not mount `<RenderRenderar />`, so `Renderar.render(...)` calls made under this tree won't have anywhere to output. |
| `defaultBreakpoint` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"`                                                          | `"xl"`       | Seeds `BreakpointProvider`'s initial key for SSR. When omitted, the root is rendered with `visibility: hidden` until the client mounts and measures the real breakpoint, avoiding a flash of content sized for the wrong breakpoint. |
| `selectionColor`    | `"default" \| "brand" \| "accent" \| "info" \| "success" \| "warning" \| "danger"`             | `"brand"`    | Themes the `::selection` highlight using `{selectionColor}.primary` / `{selectionColor}.contrast`. Pass `"default"` to leave the browser's native selection styling untouched. |

### Built-in behavior

- Renders `ThemeProvider` with `isRoot` always set, which injects the CSS reset (box sizing, margin/padding zero, list-style reset, anchor defaults, table/border resets, etc.) and the themed scrollbar CSS (unless `noScrollbarCss`).
- Wraps children in `BreakpointProvider` (`defaultKey={defaultBreakpoint ?? "xl"}`), so `useBreakpoint`/`useBreakpointProps` work immediately.
- Wraps children in `CSSCacheProvider` (using `CSSCacheId`) and `DocumentProvider` (using `document`), so `useCSSCache`/`useCSSCacheId`/`getCSSCache` and `useDocument` resolve correctly, including inside a nested `<Iframe>`.
- Persists the active theme name to a cookie (`xuitm`) on mount (if not already set) and again whenever `onThemeUpdate` fires, so the next server render can start with the correct theme and avoid a flash.
- On mount, moves any `<style data-oncss>` elements found under `<body>` into `<head>`.
- Mounts `<RenderRenderar />` (unless `disableRenderar`) so `Renderar.render(...)` has somewhere to output — see below.

## Usage

### Application entry

```tsx
import { AppRoot, createTheme } from 'xanui-core'

const theme = createTheme({ name: 'light', mode: 'light' })

export const Root = ({ children }) => (
  <AppRoot component="body" theme={theme}>
    {children}
  </AppRoot>
)
```

### Disabling scrollbar styles

```tsx
<AppRoot theme={theme} noScrollbarCss>
  <Dashboard />
</AppRoot>
```

### Custom scrollbar colors

`scrollbar` is forwarded to `ThemeProvider`:

```tsx
<AppRoot
  theme={theme}
  scrollbar={{ size: 7, thumbColor: 'var(--color-neutral-600)', trackColor: 'var(--color-neutral-200)' }}
>
  {children}
</AppRoot>
```

### Fixing the SSR breakpoint

```tsx
<AppRoot theme={theme} defaultBreakpoint="lg">
  {children}
</AppRoot>
```

Use `AppRoot` at the very top of your React tree (e.g., around the contents of `document.body`). For nested theme islands or styling overrides without the rest of the root behavior, use `ThemeProvider` directly.

## Related utilities

### `useAppRootElement()`

Exported alongside `AppRoot`. Returns the DOM node of the nearest `AppRoot` (or `null` during SSR):

```tsx
import { useAppRootElement } from 'xanui-core'

const rootEl = useAppRootElement()
```

Useful when a portal or overlay needs to stay attached within the themed `AppRoot` subtree instead of `document.body`.

### `Renderar`

An imperative, render-anywhere registry that `AppRoot` wires up automatically via `<RenderRenderar />` (rendered as the last child of `BreakpointProvider`, unless `disableRenderar` is set). It lets you mount components from outside the React tree — e.g. from an event handler or a utility function — without prop-drilling a portal target:

```tsx
import { Renderar } from 'xanui-core'

const handle = Renderar.render(MyToast, { message: 'Saved!' })

handle.updateProps({ message: 'Updated!' })
handle.unrender()
```

`Renderar.render(component, props?)` returns `{ unrender(), updateProps(newProps) }`. Each call to `Renderar.render` adds an entry to an internal list that `RenderRenderar` re-renders whenever it changes; `Renderar.unrender(component)` and `Renderar.updateProps(component, props)` are also available as static methods if you kept a reference to the original component instead of the returned handle.
