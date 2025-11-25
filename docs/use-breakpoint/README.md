# useBreakpoint

`useBreakpoint` provides the current responsive breakpoint and helper predicates driven by `BreakpointProvider`. It relies on the shared `breakpoints` map (xs, sm, md, lg, xl) exported from `css`.

## Return Shape

| Field           | Type                                   | Description                                                                          |
| --------------- | -------------------------------------- | ------------------------------------------------------------------------------------ |
| `value`         | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | The active breakpoint derived from `window.innerWidth`. Defaults to `xl` during SSR. |
| `is(key)`       | `(BreakpointKeys) => boolean`          | `true` when the current breakpoint equals `key`.                                     |
| `isDown(key)`   | `(BreakpointKeys) => boolean`          | `true` when the viewport width is greater than the pixel value of `key`.             |
| `isUp(key)`     | `(BreakpointKeys) => boolean`          | `true` when the viewport width is less than the pixel value of `key`.                |
| `isOrDown(key)` | `(BreakpointKeys) => boolean`          | `is(key)                                                                             |  | isDown(key)`. |
| `isOrUp(key)`   | `(BreakpointKeys) => boolean`          | `is(key)                                                                             |  | isUp(key)`.   |

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

Wrap your tree with `<BreakpointProvider>` (or set `ThemeProvider`'s `isRootProvider`) to activate the context.
