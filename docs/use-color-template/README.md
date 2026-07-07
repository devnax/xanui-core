# useColorTemplate

`useColorTemplate(color, type)` returns a `{ main, hover }` pair of style objects for a semantic color and a presentation style, using theme color references (e.g. `"brand.primary"`) that resolve via the CSS variables injected by `ThemeProvider`.

## Parameters

| Parameter | Type                                                                          | Description                                                                    |
| --------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| `color`   | `'default' \| 'brand' \| 'accent' \| 'info' \| 'success' \| 'warning' \| 'danger'` | Semantic palette to target. `'default'` maps to the theme's neutral/text/paper tokens instead of a variant color. Throws if not one of these values. |
| `type`    | `'fill' \| 'outline' \| 'text' \| 'ghost'`                                       | Which visual treatment to produce. Throws if not one of these values.             |

## Return Value

```ts
{
  main: { bgcolor: string; color: string; border: number | string; borderColor: string; transition?: string },
  hover: { bgcolor: string; color: string; border: number | string; borderColor: string; transition?: string },
}
```

- `type: 'outline'` — transparent background, a 1px border in the color's `primary`/`secondary`, text colored to match.
- `type: 'fill'` — solid `primary`/`secondary` background with `contrast` text (or `paper`/`text` tokens for `'default'`).
- `type: 'text'` — transparent background and border, text-only coloring.
- `type: 'ghost'` — low-opacity `ghost.primary`/`ghost.secondary` background with `primary`/`secondary` text.

## Usage Examples

```tsx
import { Tag, useColorTemplate } from 'xanui-core'

const StatusBadge = ({ tone = 'info', children }) => {
  const { main, hover } = useColorTemplate(tone, 'outline')

  return (
    <Tag
      component="span"
      px={12}
      py={4}
      radius={999}
      border={main.border}
      borderColor={main.borderColor}
      bgcolor={main.bgcolor}
      color={main.color}
      hover={hover}
    >
      {children}
    </Tag>
  )
}
```

```tsx
const GhostButton = () => {
  const { main, hover } = useColorTemplate('brand', 'ghost')

  return (
    <Tag component="button" bgcolor={main.bgcolor} color={main.color} hover={hover}>
      Learn more
    </Tag>
  )
}
```
