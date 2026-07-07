# Transition

`Transition` manages enter/exit animations for a single child element, driven by named "variants" (or a custom callback) that read the element's measured `DOMRect` and drive inline styles frame-by-frame. It's a thin declarative wrapper around the `useTransition` hook. A separate `useTransitionGroup` hook handles staggered animations for lists of keyed items.

## `<Transition>`

### Props

| Prop                | Type                                                     | Default   | Description                                                                                                                    |
| ------------------- | --------------------------------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `children`          | `ReactElement`                                            | —         | Exactly one React element. `Transition` clones it and attaches its own `ref` (merged with any ref the child already has).     |
| `open`              | `boolean`                                                  | —         | Required. `true` animates toward the variant's `to` state, `false` animates back toward `from`.                              |
| `variant`           | `keyof typeof variants \| TransitionVariantCallback`      | `"fade"`  | A built-in variant name (see table below) or a callback `(el: HTMLElement, rect: DOMRect) => { from, to, onUpdate, onEntered?, onExited? }`. |
| `duration`          | `number` (ms)                                              | `450`     | Transition duration, forwarded to the internal `animate()` call.                                                              |
| `delay`             | `number` (ms)                                              | —         | Transition delay.                                                                                                              |
| `easing`            | `keyof Easing`                                             | `"default"` | Name of one of the built-in easing functions (see `Easing` below).                                                          |
| `initialTransition` | `boolean`                                                  | `true`    | When `false`, the very first mount jumps straight to its state instead of animating (subsequent `open` changes still animate). |
| `exitOnUnmount`     | `boolean`                                                  | `false`   | When `true`, `Transition` renders nothing (`undefined`) once the exit animation finishes (`status === "exited"`), effectively unmounting the child. |
| `onEnter`           | `() => void`                                               | —         | Fired when an enter animation starts.                                                                                          |
| `onEntered`         | `() => void`                                               | —         | Fired when an enter animation finishes.                                                                                        |
| `onExit`            | `() => void`                                               | —         | Fired when an exit animation starts.                                                                                           |
| `onExited`          | `() => void`                                               | —         | Fired when an exit animation finishes.                                                                                         |
| `onUpdate`          | `(value: Record<string, number>, progress: number) => void` | —       | Fired on every animation frame with the current interpolated values and `0..1` progress.                                     |
| `onDone`            | `() => void`                                               | —         | Fired once the animation completes, regardless of direction.                                                                   |

Notes:
- If `children` isn't exactly one valid React element, `Transition` throws.
- Passing a different `variant` remounts the internal transition state machine (it's used as the React `key`).

### Built-in variants

Defined in `src/Transition/variants.ts`. Each one computes `from`/`to` values and an `onUpdate` that writes directly to `el.style`:

| Name                                                       | Behavior                                                                                     |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| `fade`                                                     | Cross-fades `opacity` between `0` and `1`.                                                    |
| `fadeUp` / `fadeDown` / `fadeLeft` / `fadeRight`           | Fades opacity `0 -> 1` while translating 40px along the named axis and scaling from `0.98` to `1`. |
| `slideUp` / `slideDown` / `slideLeft` / `slideRight`       | Translates the element 40px along the named axis (no opacity/scale change).                   |
| `zoom` / `zoomOver`                                        | Scales from `0.8` (`zoom`) or `1.2` (`zoomOver`) to `1` while fading in.                       |
| `grow`                                                     | Scales `scaleX`/`scaleY` from `0.8`/`0.6` to `1`/`1` while fading in.                          |
| `collapseVertical` / `collapseHorizontal`                  | Animates `max-height`/`width` from `0` to the element's measured size (removes the inline `max-height` once entered). |

You can also pass a custom `TransitionVariantCallback`:

```tsx
const scaleY = (el: HTMLElement, rect: DOMRect) => ({
  from: { scale: 0.4, opacity: 0 },
  to: { scale: 1, opacity: 1 },
  onUpdate: ({ scale, opacity }: any) => {
    el.style.transform = `scaleY(${scale})`
    el.style.transformOrigin = 'top'
    el.style.opacity = String(opacity)
  },
})
```

### Usage

```tsx
import { Transition, Tag } from 'xanui-core'

export const Toast = ({ open, children }) => (
  <Transition open={open} variant="fade" duration={250}>
    <Tag
      px={16}
      py={12}
      radius={8}
      shadow="md"
      bgcolor="brand.primary"
      color="brand.contrast"
    >
      {children}
    </Tag>
  </Transition>
)
```

```tsx
<Transition
  open={isOpen}
  variant="fadeUp"
  duration={300}
  easing="smooth"
  onEntered={() => console.log('panel expanded')}
  onExited={() => console.log('panel collapsed')}
>
  <Tag component="section" px={24} py={20} radius={10} shadow="sm">
    {children}
  </Tag>
</Transition>
```

## `useTransition`

The hook `Transition` is built on. Runs a single enter/exit animation over an arbitrary set of numeric values.

```ts
import { useTransition, Easing } from 'xanui-core'

const trans = useTransition({
  from: { opacity: 0 },
  to: { opacity: 1 },
  duration: 300,
  easing: Easing.smooth,
  onUpdate: (value) => { el.style.opacity = String(value.opacity) },
  onEntered: () => console.log('fully visible'),
})

trans.enter()        // animate toward `to`
trans.exit()          // animate toward `from`
trans.toggle()        // flip direction
trans.enter(false)    // jump instantly, no animation
trans.status          // "entering" | "entered" | "exiting" | "exited"
trans.isEntered        // boolean
trans.state            // ref holding the current interpolated value
trans.isReady          // whether `from`/`to` have been resolved (post-mount)
```

### `UseTransitionProps<T>`

Extends `AnimateOptions<T>` (see `animate` below) with:

| Prop            | Type                        | Default    | Description                                            |
| --------------- | ----------------------------- | ---------- | -------------------------------------------------------- |
| `initialStatus` | `"entered" \| "exited"`      | `"exited"` | Starting status before any `enter()`/`exit()` call.      |
| `onEnter`       | `() => void`                  | —          | Fired when `enter()` starts an animation.                |
| `onEntered`     | `() => void`                  | —          | Fired when the enter animation completes.                |
| `onExit`        | `() => void`                  | —          | Fired when `exit()` starts an animation.                  |
| `onExited`      | `() => void`                  | —          | Fired when the exit animation completes.                  |

## `useTransitionGroup`

Staggered enter/exit animation for a list of keyed items, with optional mount-on-enter / unmount-on-exit support.

```ts
import { useTransitionGroup } from 'xanui-core'

const group = useTransitionGroup({
  items: list.map((item) => ({ key: item.id, from: { y: 20, opacity: 0 }, to: { y: 0, opacity: 1 } })),
  stagger: 80,
  duration: 300,
  mountOnEnter: true,
  unmountOnExit: true,
  onUpdate: (value, key, progress) => { /* apply per-item styles */ },
})

group.enter()
group.exit()
group.toggle()
group.statuses[item.key]  // "entering" | "entered" | "exiting" | "exited"
group.mounted[item.key]    // boolean, useful with mountOnEnter/unmountOnExit
```

### `UseTransitionGroupProps<T>`

| Prop            | Type                                              | Default | Description                                                              |
| --------------- | ---------------------------------------------------- | ------- | --------------------------------------------------------------------------- |
| `items`         | `{ key: string \| number; from: T; to: T }[]`       | —       | Required. The set of items to animate.                                    |
| `duration`      | `number` (ms)                                        | `400`   | Per-item animation duration.                                              |
| `stagger`       | `number` (ms)                                        | `100`   | Delay applied per item index (`index * stagger`).                        |
| `mountOnEnter`  | `boolean`                                            | —       | If `true`, items start `"exited"`/unmounted and only mount once `enter()` runs. |
| `unmountOnExit` | `boolean`                                            | —       | If `true`, items are marked unmounted once their exit animation finishes.  |
| `onUpdate`      | `(value: T, key, progress: number) => void`          | —       | Fired per frame, per item.                                                |
| `onEnter` / `onEntered` / `onExit` / `onExited` | `(key: string \| number) => void` | —       | Per-item lifecycle callbacks.                                             |

## `animate` / `Easing`

Both `useTransition` and `useTransitionGroup` are built on the low-level `animate()` function, also exported directly:

```ts
import { animate, Easing } from 'xanui-core'

const cancel = animate({
  from: { x: 0 },
  to: { x: 100 },
  duration: 300,
  easing: Easing.smooth,
  onUpdate: (value) => { el.style.transform = `translateX(${value.x}px)` },
  onDone: () => console.log('done'),
})

cancel() // stop the animation early
```

Built-in `Easing` functions: `default` (cubic ease-out), `standard`, `fast`, `smooth`, `linear`, `bounceBezier` (cubic-bezier curves), plus `cubicInOut`, `easeOutBounce`, and `spring`.

`AnimateOptions<T>` also supports `repeat` (number of extra cycles), `repeatBack` (ping-pong direction on repeat), and `breakpoints` (per-key value thresholds that fire a `callback()` once when crossed during the animation).
