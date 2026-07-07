# ThemeProvider

`ThemeProvider` binds a `ThemeOptions` object (built with `createTheme`) to a subtree. It exposes the theme through context, injects the theme's CSS variables, optionally resets browser defaults and styles the scrollbar, and renders a `Tag` wrapper carrying baseline typography/background styles so descendants render with the correct look-and-feel.

## Props

`ThemeProvider` accepts every prop `Tag` accepts (it forwards the rest to an internal `Tag`), plus:

| Prop             | Type                                                          | Default     | Description                                                                                     |
| ---------------- | -------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------- |
| `theme`          | `ThemeOptions`                                                  | —           | Theme object returned by `createTheme`. Required.                                                |
| `onThemeUpdate`  | `(theme: ThemeOptions) => void`                                 | `undefined` | Called when a descendant invokes `useTheme().update(...)`.                                       |
| `isRoot`         | `boolean`                                                       | `false`     | When `true`, also injects a global CSS reset (`box-sizing`, list/anchor/table resets, etc.) and the scrollbar styling. Set this once at the top of the app. |
| `noScrollbarCss` | `boolean`                                                       | `false`     | When `isRoot` is `true`, skip injecting the custom scrollbar CSS.                                |
| `scrollbar`      | `{ size?: number; thumbColor?: string; trackColor?: string }`   | `{ size: 7, thumbColor: 'var(--color-neutral-600)', trackColor: 'var(--color-neutral-200)' }` | Customizes the `::-webkit-scrollbar` styling injected when `isRoot` is true. |

### Automatic styling

- Renders a `Tag` with `minHeight="100%"`, `bgcolor="neutral.100"`, `color="text.primary"`, and the default typography (`fontSize="md"`, `fontWeight="md"`, `lineHeight="md"`, a system font stack) — any of these can be overridden by passing the corresponding prop.
- Sets `direction` to `"rtl"` when `theme.rtl` is `true`, otherwise `"ltr"`.
- Assigns `baseClass={`${theme.name}-theme-root`}`, producing the deterministic class `xui-${theme.name}-theme-root` (also available via the `themeRootClass(name)` helper exported from `xanui-core`).
- Pushes each selector in `theme.globalStyle` into the global stylesheet scoped under that root class, and injects the theme's CSS variables (colors, typography, shadow/radius/spacing scales, breakpoints) computed by `ThemeCssVars`.

## Usage Examples

### Minimal App Shell

```tsx
import { ThemeProvider, createTheme } from 'xanui-core'

const theme = createTheme({ name: 'light', mode: 'light' })

export const AppShell = ({ children }) => (
  <ThemeProvider theme={theme} isRoot component="main">
    {children}
  </ThemeProvider>
)
```

### Nesting for Overlays

```tsx
const light = createTheme({ name: 'light', mode: 'light' })
const brand = createTheme({ name: 'brand', mode: 'light', colors: { brand: '#7C3AED' } })

<ThemeProvider theme={light} isRoot>
  <AppContent />
  <ThemeProvider theme={brand} component="aside" px={24} py={16} radius="md" shadow="md">
    <ControlPanel />
  </ThemeProvider>
</ThemeProvider>
```

### Pair with `AppRoot`

`AppRoot` composes global providers (document/portal context, breakpoints, CSS cache) around your app. Use it at the document root and nest `ThemeProvider` (with `isRoot`) directly under it to establish the theme.
