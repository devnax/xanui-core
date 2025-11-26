# createThemeSwitcher

`createThemeSwitcher(defaultTheme, options?)` builds a React hook that keeps the active theme name in sync with `ThemeProvider`. It internally uses `react-state-bucket` so you can persist the selection across reloads or share it between tabs.

## API

```ts
const useThemeSwitcher = createThemeSwitcher(
  defaultTheme: string,
  options?: {
    store?: 'memory' | 'session' | 'local'
    onChange?: (themeName: string) => void
  }
)
```

### Parameters

| Name               | Type                               | Default     | Description                                                               |
| ------------------ | ---------------------------------- | ----------- | ------------------------------------------------------------------------- |
| `defaultTheme`     | `string`                           | —           | Name of an existing theme registered via `createTheme`.                   |
| `options`          | `ThemeSwitcherOption` (optional)   | `{}`        | Configure persistence layer or react to theme changes.                    |
| `options.store`    | `'memory' \| 'session' \| 'local'` | `'memory'`  | Storage bucket used by `react-state-bucket`. Use `'memory'` to avoid I/O. |
| `options.onChange` | `(theme: string) => void`          | `undefined` | Called any time the user switches themes, after the new name is saved.    |

### Return Value

Calling `useThemeSwitcher()` gives you an object with the current theme data and a setter:

| Field    | Type                      | Description                                                  |
| -------- | ------------------------- | ------------------------------------------------------------ |
| `name`   | `string`                  | Currently selected theme name.                               |
| `theme`  | `ThemeOptions`            | Full theme object resolved via `getTheme(name)`.             |
| `change` | `(theme: string) => void` | Persists the new theme name and triggers `options.onChange`. |

## Usage Examples

### Basic Theme Toggle

```tsx
import { ThemeProvider, createThemeSwitcher } from 'xanui-core'

const useThemeSwitcher = createThemeSwitcher('light')

const ThemeToggle = () => {
  const { name, change } = useThemeSwitcher()

  return (
    <button onClick={() => change(name === 'light' ? 'dark' : 'light')}>
      Active theme: {name}
    </button>
  )
}

export const App = () => {
  const { name } = useThemeSwitcher()

  return (
    <ThemeProvider theme={name} isRootProvider>
      <ThemeToggle />
    </ThemeProvider>
  )
}
```

### Persisting Between Sessions

```tsx
const useThemeSwitcher = createThemeSwitcher('light', {
  store: 'local',
  onChange: (next) => console.log('Theme switched to', next),
})
```

- `store: 'local'` writes the theme name to `localStorage`, so a reload keeps the same theme.
- The optional `onChange` callback is useful for analytics, syncing native shells, or kicking off side effects (e.g., updating `<meta name="theme-color">`).
