# useBreakpoint

`useBreakpoint` reads the current responsive breakpoint from `BreakpointCtx` (populated by `BreakpointProvider`) and exposes helper predicates for comparing it against the breakpoint scale.

The breakpoint scale comes from `breakpoints` in `css` (`{ xs: 0, sm: 640, md: 768, lg: 1024, xl: 1280 }`), ordered `xs < sm < md < lg < xl`.

## `BreakpointProvider`

> **Not exported.** `src/breakpoint/index.ts` exports `BreakpointProvider`, but `xanui-core`'s package entry (`src/index.ts`) only re-exports `useBreakpoint` and `useBreakpointProps` from that folder — `BreakpointProvider` itself is internal. `AppRoot` is the only supported way to mount it.

```tsx
// internal shape, for reference only — not importable from 'xanui-core'
<BreakpointProvider defaultKey="xl">{children}</BreakpointProvider>
```

| Prop         | Type             | Description                                                                                     |
| ------------ | ---------------- | ------------------------------------------------------------------------------------------------- |
| `defaultKey` | `BreakpointKeys` | Breakpoint used for the initial render (e.g. during SSR, before `matchMedia` can run in the browser). |
| `children`   | `ReactNode`      | —                                                                                                    |

On mount, the provider evaluates `matchMedia` queries built from the `breakpoints` scale, stores the resolved breakpoint in a `xuibp` cookie, and keeps state in sync as the viewport crosses breakpoints (via `change` listeners on each media query).

`AppRoot` renders a `BreakpointProvider` around its children, seeded from its own `defaultBreakpoint` prop (falling back to `"xl"`) — use that prop rather than trying to import `BreakpointProvider` directly.

## `useBreakpoint()`

Returns:

| Field                  | Type                                   | Description                                                                                   |
| ---------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `value`                | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | The active breakpoint, as provided by the nearest `BreakpointProvider`.                          |
| `is(key)`              | `(key: BreakpointKeys) => boolean`     | `true` when the current breakpoint equals `key`.                                                 |
| `isUp(key)`            | `(key: BreakpointKeys) => boolean`     | `true` when the current breakpoint is the same as or larger than `key`.                          |
| `isDown(key)`          | `(key: BreakpointKeys) => boolean`     | `true` when the current breakpoint is smaller than `key` (exclusive).                             |
| `isOrUp(key)`          | `(key: BreakpointKeys) => boolean`     | Same as `isUp(key)` (current breakpoint is `key` or larger).                                      |
| `isOrDown(key)`        | `(key: BreakpointKeys) => boolean`     | `true` when the current breakpoint is `key` or smaller.                                          |
| `isBetween(start,end)` | `(start, end: BreakpointKeys) => boolean` | `true` when the current breakpoint is at or above `start` and strictly below `end`.           |

## Usage Example

```tsx
import { Tag, useBreakpoint } from 'xanui-core'

const ResponsiveSidebar = () => {
  const bp = useBreakpoint()
  const collapsed = bp.isDown('lg')

  return (
    <Tag
      component="aside"
      width={collapsed ? 72 : 280}
      transition="width 200ms ease"
      px={collapsed ? 8 : 20}
    >
      {collapsed ? <IconMenu /> : <FullMenu />}
    </Tag>
  )
}
```

```tsx
const bp = useBreakpoint()

if (bp.isBetween('sm', 'lg')) {
  // sm or md, but not lg/xl
}
```

Wrap your tree with `<BreakpointProvider defaultKey="...">` (or use `<AppRoot>`, which does this for you) to activate the context. Without a provider, `value` will be `undefined` and the predicates will compare against an index of `-1`.
