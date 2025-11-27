# AppRoot

`AppRoot` is the quickest way to bootstrap a Xanui-powered application. It wraps `ThemeProvider`, injects same global CSS resets, mounts the `BreakpointProvider`, and optionally wires in themed scrollbar styles.

## Signature

```tsx
<AppRoot theme="light" noScrollbarCss? component="body">{children}</AppRoot>
```

### Props

`AppRoot` extends `ThemeProviderProps`, so every prop accepted by `ThemeProvider`/`Tag` works here (`component`, spacing props, DOM attributes, etc.). Additional props:

| Prop             | Type      | Default | Description                                                                                     |
| ---------------- | --------- | ------- | ----------------------------------------------------------------------------------------------- |
| `noScrollbarCss` | `boolean` | `false` | When `false`, calls `useScrollbar` so scrollbars adopt the active theme. Set to `true` to skip. |

### Built-in behavior

- Registers the stock `light` and `dark` themes on import so sandboxes work without manual setup.
- Applies a complete global reset (box sizing, typography smoothing, media defaults, form controls, lists, tables).
- Moves any `<style data-oncss>` tags rendered inside `body` into `head` so SSR hydration stays consistent.
- Wraps children with `BreakpointProvider` so responsive hooks are available immediately.

## Usage

### Application entry

```tsx
import { AppRoot, createThemeSwitcher } from 'xanui-core'

const useThemeState = createThemeSwitcher('light')

export const Root = () => {
  const { name, change } = useThemeState()

  return (
    <AppRoot component="body" theme={name}>
      <button onClick={() => change(name === 'light' ? 'dark' : 'light')}>
        Toggle theme
      </button>
      {/* rest of your app */}
    </AppRoot>
  )
}
```

### Disabling scrollbar styles

```tsx
<AppRoot theme="brand" noScrollbarCss>
  <Dashboard />
</AppRoot>
```

Use `AppRoot` at the very top of your React tree (e.g., around the contents of `document.body`). For nested theme islands or styling overrides, fall back to `ThemeProvider`.
