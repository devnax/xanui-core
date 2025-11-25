# Transition Component

`Transition` manages enter/exit CSS transitions for a single child element. It computes measurements (width, height, bounding rect) on mount, maps them to a variant, and toggles between `from`/`to` styles based on the `open` flag.

## Props

| Prop                       | Type                                                          | Default                  | Description                                                                                        |
| -------------------------- | ------------------------------------------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------- |
| `children`                 | `ReactElement`                                                | —                        | Exactly one element. The component injects generated class names via the `classNames` prop.        |
| `open`                     | `boolean`                                                     | —                        | Controls whether the transition animates toward the `to` state (`true`) or `from` state (`false`). |
| `variant`                  | `{ from: CSSProps; to: CSSProps; } \| TransitionVariantTypes` | `'fade'`                 | Pre-defined variant name or a custom object describing the start/end styles.                       |
| `duration`                 | `number` (ms)                                                 | `400`                    | Transition duration. Applied to every animated property.                                           |
| `delay`                    | `number` (ms)                                                 | `0`                      | Transition delay.                                                                                  |
| `ease`                     | `string`                                                      | `animationEases[easing]` | CSS timing function. Overrides `easing`.                                                           |
| `easing`                   | `keyof animationEases`                                        | `'easeBounceOut'`        | Convenience alias for the common easing presets defined in `useAnimation`.                         |
| `disableInitialTransition` | `boolean`                                                     | `false`                  | When `true`, skips the first transition when mounting in the `open` state.                         |
| `onOpen` / `onOpened`      | `() => void`                                                  | `undefined`              | Fired at transition start/end when moving into the open state.                                     |
| `onClose` / `onClosed`     | `() => void`                                                  | `undefined`              | Fired at transition start/end when moving into the closed state.                                   |
| `onState`                  | `(state: TransitionState) => void`                            | `undefined`              | Receives `"open"`, `"opened"`, `"close"`, or `"closed"` whenever the internal state changes.       |

## Built-in Variants

| Name                                                 | Behavior                                                        |
| ---------------------------------------------------- | --------------------------------------------------------------- |
| `fade`                                               | Cross-fades opacity.                                            |
| `fadeUp` / `fadeDown` / `fadeLeft` / `fadeRight`     | Fades while translating 30px along the named axis.              |
| `slideUp` / `slideDown` / `slideLeft` / `slideRight` | Slides the element out of view using its measured width/height. |
| `grow` / `zoom` / `zoomOver`                         | Scales the element up or down while adjusting opacity.          |
| `collapsVerticle` / `collapsHorizental`              | Animates height or width to zero while keeping overflow hidden. |

## Usage Examples

### Basic Fade Toggle

```tsx
import { Transition, Tag } from 'xanui-core'

export const Toast = ({ open, children }) => (
  <Transition open={open} variant="fade" duration={250}>
    <Tag
      px={16}
      py={12}
      radius={8}
      shadow={3}
      bgcolor="brand.primary"
      color="brand.text"
    >
      {children}
    </Tag>
  </Transition>
)
```

### Custom Variant with Lifecycle Hooks

```tsx
const scaleY = {
  from: { transform: 'scaleY(0.4)', transformOrigin: 'top', opacity: 0 },
  to: { transform: 'scaleY(1)', opacity: 1 },
}

<Transition
  open={isOpen}
  variant={scaleY}
  duration={500}
  easing="easeInOut"
  onOpened={() => console.log('panel expanded')}
  onClosed={() => console.log('panel collapsed')}
>
  <Tag component="section" px={24} py={20} radius={10} shadow={2}>
    {children}
  </Tag>
</Transition>
```
