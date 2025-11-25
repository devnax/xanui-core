# Theme APIs

Xanui Core ships a small set of helpers for registering, consuming, and switching themes at runtime.

## `createTheme(name, options, darkMode?)`

Registers a theme inside the global `ThemeFactory`. Throws if the name is already taken.

| Parameter  | Type               | Default                   | Description                                                                      |
| ---------- | ------------------ | ------------------------- | -------------------------------------------------------------------------------- |
| `name`     | `string`           | —                         | Unique identifier referenced by `ThemeProvider` and `createThemeSwitcher`.       |
| `options`  | `ThemeOptionInput` | `{}` merged with defaults | Theme overrides: colors, typography, global styles, interfaces, RTL flag.        |
| `darkMode` | `boolean`          | `false`                   | When `true`, seeds the palette from `darkColorPallete` before merging overrides. |

### Theme Option Fields

| Field         | Type                                      | Description                                                                                             |
| ------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `colors`      | `ThemeColorInput`                         | Override semantic color slots (`background`, `text`, `brand`, etc.). Partial objects are merged deeply. |
| `typography`  | `ThemeTypographyInputType`                | Configure `fontFamily` and the `h1`–`small` scale (size, weight, line height).                          |
| `interfaces`  | `Record<string, (props, theme) => props>` | Register interface factories consumed by `useInterface`.                                                |
| `rtl`         | `boolean`                                 | Enables right-to-left layout defaults.                                                                  |
| `globalStyle` | `GlobalCSS`                               | Map of selectors to CSS objects that will be scoped under the theme's root class.                       |

## `createThemeSwitcher(defaultTheme, store?)`

Creates a hook that manages the current theme name (persisted via `react-state-bucket`).

| Parameter      | Type                   | Default     | Description                  |
| -------------- | ---------------------- | ----------- | ---------------------------- |
| `defaultTheme` | `string`               | —           | Initial theme name.          |
| `store`        | `'session' \| 'local'` | `undefined` | Optional persistence method. |

Calling the hook returns `{ name, theme, change }`.

## `useTheme()` / `getTheme(name)`

- `useTheme()` – Reads the active `ThemeOptions` from context inside React components.
- `getTheme(name)` – Fetches a theme synchronously outside React (e.g., in utilities such as `useScrollbar`).

## Usage Example

```tsx
import {
  createTheme,
  createThemeSwitcher,
  ThemeProvider,
  useTheme,
} from 'xanui-core'

createTheme('brand', {
  colors: {
    brand: {
      primary: '#7C3AED',
      secondary: '#5B21B6',
      text: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: 'Inter',
    text: { fontSize: 16, lineHeight: 24 },
  },
})

const useThemeState = createThemeSwitcher('brand', 'local')

const ThemeToggle = () => {
  const { name, change } = useThemeState()
  const theme = useTheme()

  return (
    <button onClick={() => change(name === 'brand' ? 'dark' : 'brand')}>
      Active theme: {theme.name}
    </button>
  )
}

export const App = () => {
  const { name } = useThemeState()
  return (
    <ThemeProvider theme={name} isRootProvider>
      <ThemeToggle />
    </ThemeProvider>
  )
}
```
