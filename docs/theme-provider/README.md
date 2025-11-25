# ThemeProvider

`ThemeProvider` attaches a named theme created via `createTheme` to the React tree, pushes CSS variables and global resets, and (optionally) wraps children with `BreakpointProvider` so responsive hooks can function without extra boilerplate.

## Props

| Prop                | Type                 | Default     | Description                                                                                                                       |
| ------------------- | -------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `theme`             | `string`             | —           | Registered theme name. Throws if the theme was not created with `createTheme`.                                                    |
| `applyScrollbarCss` | `boolean`            | `true`      | When `true`, injects themed scrollbar styles via `useScrollbar`. Set to `false` if the host app manages scrollbars independently. |
| `isRootProvider`    | `boolean`            | `false`     | Wraps children with `BreakpointProvider` and enforces global typography, background, and layout defaults. Useful at the app root. |
| `renderIsRoot`      | `React.ReactElement` | `undefined` | Rendered next to children when `isRootProvider` is `true` (e.g., for portals such as modals).                                     |
| `...tagProps`       | `TagProps`           | —           | Any prop accepted by `Tag` (including `sx`, `px`, `direction`, native DOM attributes).                                            |

## Usage Examples

### Root-Level Provider with Scrollbar Styling

```tsx
import { ThemeProvider } from 'xanui-core'

export const AppShell = ({ children }) => (
  <ThemeProvider
    theme="light"
    isRootProvider
    renderIsRoot={<div id="modal-root" />}
  >
    {children}
  </ThemeProvider>
)
```

### Nested Provider Without Breakpoint Context

```tsx
<ThemeProvider
  theme="brand-dark"
  applyScrollbarCss={false}
  px={20}
  py={16}
  radius={12}
>
  <SidebarContent />
</ThemeProvider>
```
