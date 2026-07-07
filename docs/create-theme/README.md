# Theme APIs

Xanui Core ships a small set of helpers for creating and consuming themes: `createTheme` builds a `ThemeOptions` object, and `useTheme` reads the active theme from context.

## `createTheme(options)`

Builds a full `ThemeOptions` object by deep-merging `options` over `defaultThemeOptions` and generating a color palette from `options.colors`. It does **not** register a global theme registry — the returned object is just data you pass to `ThemeProvider`.

| Parameter | Type              | Default | Description                                                                 |
| --------- | ----------------- | ------- | ---------------------------------------------------------------------------- |
| `options` | `ThemeOptionInput` | —       | Theme overrides: `name`, `mode`, `colors`, `typography`, `components`, `rtl`, `globalStyle`, `shadow`, `radius`, `spacing`. |

If `options.mode` is omitted it defaults to `"light"`. If `options.name` is omitted it defaults to `options.mode`.

### `ThemeOptionInput` fields

| Field         | Type                                                 | Description                                                                                              |
| ------------- | ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `name`        | `string`                                              | Identifier for the theme, used to derive the root class `xui-${name}-theme-root`.                          |
| `mode`        | `"light" \| "dark"`                                  | Controls how the neutral color scale is generated and defaults to `"light"`.                               |
| `colors`      | `ThemeOptionColorsInput`                              | Override semantic color slots (`neutral`, `surface`, `paper`, `text`, `divider`, `brand`, `accent`, `info`, `success`, `warning`, `danger`). See below. |
| `typography`  | `Record<TypographyRefTypes, ThemeTypographyItem>`     | Overrides the `xs`–`xl` and `h1`–`h6` scale (`fontSize`, `lineHeight`, `fontWeight`).                       |
| `components`  | `Record<string, (defaultProps, theme) => props>`      | Register component factories consumed by `useThemeComponent`.                                              |
| `rtl`         | `boolean`                                             | Enables right-to-left layout. Defaults to `false`.                                                          |
| `globalStyle` | `GlobalCSS`                                           | Map of selectors to CSS objects, scoped under the theme's root class by `ThemeProvider`.                    |
| `shadow`      | `{ xs, sm, md, lg, xl, xxl }`                         | Overrides the default box-shadow scale.                                                                    |
| `radius`      | `{ xs, sm, md, lg, xl, xxl }`                         | Overrides the default border-radius scale.                                                                 |
| `spacing`     | `{ xs, sm, md, lg, xl, xxl }`                         | Overrides the default spacing scale.                                                                       |

### Color generation

`createTheme` runs `colors` through `createPalette`, which:

- Expands `colors.neutral` (a named scale — `"Slate" | "Gray" | "Zinc" | "Neutral" | "Stone"` — or a hex/rgb/hsl/oklch color) into a 19-step scale (`50`…`950`) using `hueforge`. In `dark` mode the scale is reversed.
- Derives `surface`, `paper`, `text`, and `divider` from that neutral scale unless explicitly overridden.
- Expands each variant color (`brand`, `accent`, `info`, `success`, `warning`, `danger`) — given as a single hex/rgb/hsl/oklch string, or defaulted from a built-in palette — into `{ primary, secondary, contrast, ghost: { primary, secondary } }`.

The final `theme.colors` shape is `ThemeOptionColors` (see `src/theme/types.ts`), and is what `ThemeCssVars` turns into CSS custom properties (`--color-neutral-500`, `--color-brand-primary`, etc.) for `ThemeProvider` to inject.

## `useTheme()`

Reads the active `ThemeOptions` from `ThemeContext` (populated by `ThemeProvider`). The returned object also has an `update` method bound to the provider's `onThemeUpdate` callback, so components can push theme changes back up:

```ts
const theme = useTheme()
theme.update({ ...theme, mode: 'dark' })
```

## Usage Example

```tsx
import { createTheme, ThemeProvider, useTheme } from 'xanui-core'

const lightTheme = createTheme({
  name: 'brand',
  mode: 'light',
  colors: {
    neutral: 'Gray',
    brand: '#7C3AED',
    accent: '#f59e0b',
  },
  typography: {
    md: { fontSize: 16, lineHeight: 1.5, fontWeight: 400 },
  },
})

const ThemeLabel = () => {
  const theme = useTheme()
  return <span>Active theme: {theme.name}</span>
}

export const App = () => (
  <ThemeProvider theme={lightTheme} isRoot>
    <ThemeLabel />
  </ThemeProvider>
)
```

There is no built-in theme registry or persisted theme-switcher hook — to toggle between themes at runtime, hold the current `ThemeOptions` (e.g. light vs. dark, built with two `createTheme` calls) in your own state and pass whichever one is active to `ThemeProvider`'s `theme` prop.
