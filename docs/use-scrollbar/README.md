# useScrollbar

`useScrollbar(themeName, rootCls?)` injects global scrollbar styles that respect the chosen theme's colors. It returns the generated class name (via `css`) so you can track or test the styles if needed, but usually you just call it for its side effects.

## Parameters

| Parameter   | Type     | Default | Description                                                                                                                        |
| ----------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `themeName` | `string` | —       | Name of a theme registered with `createTheme`. Required.                                                                           |
| `rootCls`   | `string` | `''`    | Optional selector to scope the scrollbar styles (e.g., `.sidebar`). When omitted, global `*`/`::-webkit-scrollbar` rules are used. |

## Behavior

- Looks up the theme via `getTheme(themeName)`.
- Generates rules for `scrollbar-width`, `scrollbar-color`, thumb/track size, colors, and hover states using theme tokens.
- Writes the rules using the `css` utility's global mode.

## Usage Examples

### Automatic (inside ThemeProvider)

`ThemeProvider` calls `useScrollbar(theme, rootCls)` for you when `applyScrollbarCss` is `true`, so most apps already get the styling.

### Manual Invocation

```tsx
import { useScrollbar } from 'xanui-core'

export const ScrollArea = ({ children }) => {
  React.useEffect(() => {
    useScrollbar('light', '.scroll-area')
  }, [])

  return (
    <div className="scroll-area" style={{ maxHeight: 320, overflowY: 'auto' }}>
      {children}
    </div>
  )
}
```
