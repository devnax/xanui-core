# useColorTemplate

`useColorTemplate(color, type)` reads the active theme and returns template-friendly style blocks (background, text color, border, hover states) for a specific semantic color and presentation style.

## Parameters

| Parameter | Type                                                                               | Default | Description                                                                   |
| --------- | ---------------------------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------- |
| `color`   | `'default' \| 'brand' \| 'accent' \| 'info' \| 'success' \| 'warning' \| 'danger'` | —       | Semantic palette to target. `'default'` maps to the theme's background token. |
| `type`    | `'fill' \| 'outline' \| 'text' \| 'alpha'`                                         | —       | Template shape describing which fields to return.                             |

## Return Value

The template object defined by `createColor`, typically shaped as:

```ts
{
  bgcolor: string,
  color: string,
  border?: number,
  borderColor?: string,
  hover: { bgcolor: string; color: string }
}
```

## Usage Examples

```tsx
import { Tag, useColorTemplate } from 'xanui-core'

const StatusBadge = ({ tone = 'info', children }) => {
  const template = useColorTemplate(tone, 'outline')

  return (
    <Tag
      component="span"
      px={12}
      py={4}
      radius={999}
      border={template.border}
      borderColor={template.borderColor}
      bgcolor={template.bgcolor}
      color={template.color}
      hover={template.hover}
    >
      {children}
    </Tag>
  )
}
```

```tsx
const GhostButton = () => {
  const alpha = useColorTemplate('brand', 'alpha')

  return (
    <button
      style={{
        backgroundColor: alpha.bgcolor,
        color: alpha.color,
      }}
    >
      Learn more
    </button>
  )
}
```
