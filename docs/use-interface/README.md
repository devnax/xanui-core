# useInterface

`useInterface(name, userProps, defaultProps)` allows component authors to expose overridable interfaces from the active theme. Themes can register interface factories that receive current defaults and return merged props.

## Parameters

| Parameter      | Type     | Default | Description                                                                |
| -------------- | -------- | ------- | -------------------------------------------------------------------------- |
| `name`         | `string` | —       | Interface key registered in the theme (`theme.interfaces[name]`).          |
| `userProps`    | `P`      | `{}`    | Props provided by the consumer. They take precedence over everything else. |
| `defaultProps` | `P`      | `{}`    | Baseline props defined inside the component.                               |

## Return Value

`[mergedProps, theme]` – the merged props (after the interface factory and user overrides) plus the resolved `ThemeOptions` instance.

## Usage Example

```tsx
import { useInterface, Tag } from 'xanui-core'

// inside a component
export const Alert = (props) => {
  const [merged, theme] = useInterface('alert', props, {
    px: 16,
    py: 12,
    radius: 12,
    bgcolor: theme.colors.info.primary,
    color: theme.colors.info.template.text.color,
  })

  return <Tag component="div" {...merged} />
}
```

### Registering an Interface in a Theme

```ts
createTheme('dashboard', {
  interfaces: {
    alert: (defaults, theme) => {
      if (defaults.variant === 'warning') {
        return {
          ...defaults,
          bgcolor: theme.colors.warning.primary,
          color: theme.colors.warning.text,
        }
      }
      return defaults
    },
  },
})
```
