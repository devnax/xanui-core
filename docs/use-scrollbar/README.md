# Scrollbar Styling

> Note: there is no `useScrollbar` hook (or any export by that name) in the package. Themed scrollbar CSS is injected automatically by `ThemeProvider`/`AppRoot` — it's controlled entirely by the `scrollbar` and `noScrollbarCss` props documented below.

## How it works

When `ThemeProvider` renders as the root (`isRoot`, which `AppRoot` always sets), it computes a global stylesheet targeting `::-webkit-scrollbar` and related pseudo-elements, scoped to the current theme's root class (`.xui-{theme.name}-theme-root`), and renders it via the same internal `ServerStyleTag` mechanism used for the rest of the theme's global CSS (see the server-styles docs). Unless `noScrollbarCss` is set, this happens on every render of `ThemeProvider`/`AppRoot`.

## Props (on `ThemeProvider` and `AppRoot`)

| Prop              | Type                                                          | Default                              | Description                                                                 |
| ----------------- | ---------------------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------- |
| `noScrollbarCss`  | `boolean`                                                        | `false`                                 | When `true`, skips generating/injecting the scrollbar stylesheet entirely.  |
| `scrollbar`       | `{ size?: number; thumbColor?: string; trackColor?: string }`   | `{}`                                     | Customizes the generated scrollbar CSS. Only used when `noScrollbarCss` is `false`. |

### `scrollbar` sub-fields

| Field        | Type     | Default                        | Description                                                     |
| ------------ | -------- | --------------------------------- | -------------------------------------------------------------------- |
| `size`       | `number` | `7`                                | Scrollbar width/height in pixels (`::-webkit-scrollbar`).       |
| `thumbColor` | `string` | `"var(--color-neutral-600)"`      | Color of the scrollbar thumb, including its hover state.        |
| `trackColor` | `string` | `"var(--color-neutral-200)"`      | Color of the scrollbar track.                                    |

The generated rules only cover the WebKit-style pseudo-elements (`::-webkit-scrollbar`, `::-webkit-scrollbar-thumb`, `::-webkit-scrollbar-thumb:hover`, `::-webkit-scrollbar-track`) with a fixed `6px` border radius on the thumb/track — there is no `scrollbar-width`/`scrollbar-color` (Firefox standard properties) rule generated.

## Usage

### Default (scrollbar styling included automatically)

```tsx
import { AppRoot } from 'xanui-core'

<AppRoot theme={theme}>
  {children}
</AppRoot>
```

### Disabling scrollbar styling

```tsx
<AppRoot theme={theme} noScrollbarCss>
  {children}
</AppRoot>
```

### Customizing colors and size

```tsx
<AppRoot
  theme={theme}
  scrollbar={{ size: 10, thumbColor: '#94a3b8', trackColor: '#1e293b' }}
>
  {children}
</AppRoot>
```

The same `scrollbar` / `noScrollbarCss` props work identically on `ThemeProvider` directly, if you're using it without `AppRoot`:

```tsx
import { ThemeProvider } from 'xanui-core'

<ThemeProvider theme={theme} isRoot scrollbar={{ size: 8 }}>
  {children}
</ThemeProvider>
```
