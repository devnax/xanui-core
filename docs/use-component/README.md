# useThemeComponent

> Exported as `useThemeComponent`. This doc lives under `use-interface` because it lets component authors expose a themeable "interface" for their component.

`useThemeComponent(name, userProps, defaultProps)` merges a component's default props with user-provided props, then — if the active theme registered a factory under `name` in `theme.components` — passes the merged props through that factory for final adjustment.

## Parameters

| Parameter      | Type     | Default | Description                                                                |
| -------------- | -------- | ------- | --------------------------------------------------------------------------- |
| `name`         | `string` | —       | Key looked up in `theme.components[name]`.                                 |
| `userProps`    | `P`      | —       | Props provided by the consumer. Take precedence over `defaultProps`.        |
| `defaultProps` | `P`      | —       | Baseline props defined inside the component.                               |

## Return Value

- If `theme.components[name]` exists: the factory's return value, `theme.components[name]({ ...defaultProps, ...userProps }, theme)`.
- Otherwise: `[{ ...defaultProps, ...userProps }, theme]` — a `[mergedProps, theme]` tuple.

Because the "themed" branch returns whatever the factory returns (not necessarily a tuple), factories registered in a theme are expected to return the same `[props, theme]` shape (or components should destructure accordingly) — check your own factory's return contract.

## Usage Example

```tsx
import { useThemeComponent, Tag, useTheme } from 'xanui-core'

export const Alert = (props) => {
  const theme = useTheme()
  const [merged] = useThemeComponent('alert', props, {
    px: 16,
    py: 12,
    radius: 'md',
    bgcolor: 'info.primary',
    color: 'info.contrast',
  })

  return <Tag component="div" {...merged} />
}
```

### Registering a Component Factory in a Theme

```ts
import { createTheme } from 'xanui-core'

const theme = createTheme({
  name: 'dashboard',
  components: {
    alert: (defaultProps, theme) => {
      if ((defaultProps as any).variant === 'warning') {
        return [
          {
            ...defaultProps,
            bgcolor: 'warning.primary',
            color: 'warning.contrast',
          },
          theme,
        ]
      }
      return [defaultProps, theme]
    },
  },
})
```
