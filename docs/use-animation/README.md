# useAnimation

`useAnimation` builds scoped `@keyframes` and returns the generated class name so you can attach complex animations to any element without manual stylesheet management.

## Options

| Option     | Type                   | Default           | Description                                                                                                    |
| ---------- | ---------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------- |
| `from`     | `CSSProps`             | —                 | CSS snapshot used as the starting frame in the generated keyframes.                                            |
| `to`       | `CSSProps`             | —                 | CSS snapshot used as the ending frame.                                                                         |
| `duration` | `number` (ms)          | `600`             | Length of the animation.                                                                                       |
| `delay`    | `number` (ms)          | `0`               | Start delay.                                                                                                   |
| `ease`     | `keyof animationEases` | `'easeBounceOut'` | Timing function name. Available presets: `easeInOut`, `easeOut`, `easeIn`, `sharp`, `linear`, `easeBounceOut`. |

## Return Value

A single string representing the generated class name. Apply it to any element's `className` (or `classNames` when using `<Tag>`).

## Usage Examples

```tsx
import { Tag, useAnimation } from 'xanui-core'

export const Pulse = () => {
  const cls = useAnimation({
    from: { transform: 'scale(1)', opacity: 0.8 },
    to: { transform: 'scale(1.05)', opacity: 1 },
    duration: 900,
    ease: 'easeInOut',
  })

  return (
    <Tag
      component="button"
      className={cls}
      px={20}
      py={12}
      radius={8}
      bgcolor="brand.primary"
      color="brand.text"
    >
      Notify me
    </Tag>
  )
}
```

### Attach to Native Nodes

```tsx
const Wiggle = () => {
  const cls = useAnimation({
    from: { rotate: '-2deg' },
    to: { rotate: '2deg' },
    duration: 300,
  })

  return <div className={cls}>⚡</div>
}
```
