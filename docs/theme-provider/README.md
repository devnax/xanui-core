# ThemeProvider

`ThemeProvider` binds a named theme (registered via `createTheme`) to a subtree. It exposes the active theme through context, injects theme CSS variables, and applies baseline typography/background styles so descendants automatically render with the correct look-and-feel.

## Props

| Prop          | Type       | Default | Description                                                                                            |
| ------------- | ---------- | ------- | ------------------------------------------------------------------------------------------------------ |
| `theme`       | `string`   | —       | Theme name that must exist in `ThemeFactory`. Throws if the theme is missing.                          |
| `...tagProps` | `TagProps` | `—`     | Any prop accepted by `Tag` (e.g., `component`, `px`, `gap`, DOM attributes). They augment the wrapper. |

### Automatic styling

- Enforces `minHeight="100%"`, and pulls body typography defaults (`fontFamily`, `fontSize`, `fontWeight`, `lineHeight`) from the selected theme.
- Sets `bgcolor` to `theme.colors.background.primary` and `direction` to `rtl` when the theme is flagged RTL.
- Generates a deterministic class name (`xui-${theme}-theme-root`) used by CSS variables and helpers like `themeRootClass`.
- Pushes each selector from `theme.globalStyle` into the global stylesheet under that class and injects the computed CSS variables via `ThemeCssVars`.

## Usage Examples

### Minimal App Shell

```tsx
import { ThemeProvider } from 'xanui-core'

export const AppShell = ({ children }) => (
  <ThemeProvider theme="light" component="main">
    {children}
  </ThemeProvider>
)
```

### Nesting for Overlays

```tsx
<ThemeProvider theme="light">
  <AppContent />
  <ThemeProvider theme="brand" component="aside" px={24} py={16} radius={12} shadow={3}>
    <ControlPanel />
  </ThemeProvider>
</ThemeProvider>
```

### Pair with `AppRoot`

`AppRoot` wraps `ThemeProvider` with global resets and the `BreakpointProvider`. Prefer it at the document root, then rely on `ThemeProvider` for nested theme islands.
