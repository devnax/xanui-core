# Animation

Xanui-core ships a small imperative animation engine (`animate`) plus a set of `Easing` presets and three React hooks built on top of it: `useTransition`, `useTransitionGroup`, and `useInView`. All of these are exported directly from `xanui-core`.

Unlike CSS-in-JS keyframe helpers, `animate` interpolates **plain numeric values** (not CSS strings) frame by frame via `requestAnimationFrame`, and calls your `onUpdate` callback with the current value on every frame so you can apply it however you like (inline styles, a ref, a CSS variable, etc.).

## `animate(options)`

```ts
import { animate, Easing } from 'xanui-core'
import type { AnimateOptions } from 'xanui-core'
```

`animate` accepts a single `AnimateOptions<T>` object, where `T` is a record of numeric values (e.g. `{ scale: number; opacity: number }`).

| Option        | Type                                                                    | Default          | Description                                                                                                     |
| ------------- | ------------------------------------------------------------------------ | ---------------- | ----------------------------------------------------------------------------------------------------------------- |
| `from`        | `T \| (() => T)`                                                        | —                 | Starting numeric values (or a function that returns them).                                                       |
| `to`          | `T \| (() => T)`                                                        | —                 | Ending numeric values (or a function that returns them).                                                        |
| `duration`    | `number` (ms)                                                             | `400`             | Length of the animation.                                                                                          |
| `delay`       | `number` (ms)                                                             | `0`               | Delay before the animation starts.                                                                                |
| `easing`      | `(t: number) => number \| Partial<Record<keyof T, (t: number) => number>>` | `Easing.default`  | A single easing function applied to every key, or a per-key map of easing functions.                             |
| `onUpdate`    | `(value: T, progress: number) => void`                                    | —                 | Called on every frame (including the first frame at `progress = 0` and the last at `progress = 1`) with the interpolated values. |
| `onDone`      | `(value: T) => void`                                                      | —                 | Called once the animation (and any repeats) has finished.                                                        |
| `breakpoints` | `Partial<Record<keyof T, Array<{ value: number; callback: () => void }>>>` | —                 | Per-key thresholds. When the interpolated value for that key crosses `value` during the animation, `callback` fires once. |
| `repeat`      | `number`                                                                  | `0`               | Number of additional times to repeat the animation after the first run.                                          |
| `repeatBack`  | `boolean`                                                                 | `false`           | When `true`, each repeat reverses direction (ping-pong) instead of restarting from `from`.                       |

`animate` returns a cancel function: calling it clears the pending `requestAnimationFrame`/`setTimeout` and stops the animation.

```tsx
import { animate, Easing } from 'xanui-core'

const cancel = animate({
  from: { scale: 1, opacity: 0.8 },
  to: { scale: 1.05, opacity: 1 },
  duration: 900,
  easing: Easing.standard,
  onUpdate: (value) => {
    el.style.transform = `scale(${value.scale})`
    el.style.opacity = String(value.opacity)
  },
  onDone: () => console.log('done'),
})

// later, to cancel mid-flight:
cancel()
```

### Per-key easing and breakpoints

```tsx
animate({
  from: { x: 0, y: 0 },
  to: { x: 300, y: 100 },
  duration: 600,
  easing: { x: Easing.smooth, y: Easing.easeOutBounce },
  breakpoints: {
    x: [{ value: 150, callback: () => console.log('halfway across') }],
  },
  onUpdate: (value) => {
    box.style.transform = `translate(${value.x}px, ${value.y}px)`
  },
})
```

## `Easing`

`Easing` is an object of ready-made timing functions, each with the signature `(t: number) => number`:

| Name             | Description                                   |
| ---------------- | ---------------------------------------------- |
| `default`        | Cubic ease-out (`1 - (1 - t) ** 3`); used when no `easing` option is given. |
| `standard`       | Cubic-bezier `(0.4, 0, 0.2, 1)`.                |
| `fast`           | Cubic-bezier `(0.2, 0, 0, 1)`.                  |
| `smooth`         | Cubic-bezier `(0.25, 0.46, 0.45, 0.94)`.        |
| `linear`         | Cubic-bezier `(0, 0, 1, 1)` (no easing).        |
| `bounceBezier`   | Cubic-bezier `(0.34, 1.5, 0.64, 1)` (overshoot). |
| `cubicInOut`     | Symmetric cubic ease-in-out.                    |
| `easeOutBounce`  | Bounce-out (ball-drop) easing.                  |
| `spring`         | Damped-oscillation/spring-like curve.           |

## `useTransition`

`useTransition<T>(props: UseTransitionProps<T>)` wraps `animate` with enter/exit state management for a single value.

`UseTransitionProps<T>` = `AnimateOptions<T>` plus:

| Option          | Type                          | Default    | Description                                             |
| --------------- | ------------------------------ | ---------- | -------------------------------------------------------- |
| `initialStatus` | `'entered' \| 'exited'`        | `'exited'` | Whether the transition starts already "entered" or "exited". |
| `onEnter`       | `() => void`                   | —          | Called synchronously when `enter()` starts.               |
| `onEntered`     | `() => void`                   | —          | Called when the enter animation completes.                |
| `onExit`        | `() => void`                   | —          | Called synchronously when `exit()` starts.                |
| `onExited`      | `() => void`                   | —          | Called when the exit animation completes.                 |

Return value:

| Field       | Type                                                  | Description                                                    |
| ----------- | ------------------------------------------------------ | ----------------------------------------------------------------- |
| `isEntered` | `boolean`                                               | `true` once `enter()` has been requested (open state).            |
| `status`    | `'entering' \| 'entered' \| 'exiting' \| 'exited'`      | Current transition status.                                        |
| `state`     | `React.RefObject<T>`                                    | Ref holding the latest interpolated value.                        |
| `enter`     | `(withAnimation?: boolean) => void`                     | Transitions to the `to` value. Pass `false` to skip the animation. |
| `exit`      | `(withAnimation?: boolean) => void`                     | Transitions to the `from` value. Pass `false` to skip the animation. |
| `toggle`    | `(withAnimation?: boolean) => void`                     | Toggles between `enter`/`exit`.                                    |
| `isReady`   | `boolean`                                                | `true` once the initial value has been resolved (after mount).    |

```tsx
import { useTransition } from 'xanui-core'

const Collapse = ({ open, children }: { open: boolean; children: React.ReactNode }) => {
  const { state, enter, exit, status } = useTransition({
    from: { height: 0, opacity: 0 },
    to: { height: 200, opacity: 1 },
    duration: 250,
    onUpdate: (value) => {
      el.current!.style.height = `${value.height}px`
      el.current!.style.opacity = String(value.opacity)
    },
  })

  useEffect(() => {
    open ? enter() : exit()
  }, [open])

  return <div ref={el} data-status={status}>{children}</div>
}
```

## `useTransitionGroup`

`useTransitionGroup<T>(options: UseTransitionGroupProps<T>)` runs staggered enter/exit animations across a list of keyed items.

| Option          | Type                                                     | Default | Description                                                              |
| --------------- | ----------------------------------------------------------- | ------- | ---------------------------------------------------------------------------- |
| `items`         | `Array<{ key: string \| number; from: T; to: T }>`         | —       | The items to animate.                                                        |
| `duration`      | `number`                                                     | `400`   | Duration of each item's animation.                                           |
| `stagger`       | `number`                                                     | `100`   | Delay in ms added per item index.                                            |
| `mountOnEnter`  | `boolean`                                                    | —       | When `true`, items start unmounted and are mounted right before entering.    |
| `unmountOnExit` | `boolean`                                                    | —       | When `true`, items are unmounted once their exit animation finishes.        |
| `onUpdate`      | `(value: T, key: string \| number, progress: number) => void` | —       | Called on every frame for every animating item.                              |
| `onEnter`       | `(key: string \| number) => void`                            | —       | Called when an item starts entering.                                        |
| `onEntered`     | `(key: string \| number) => void`                            | —       | Called when an item finishes entering.                                      |
| `onExit`        | `(key: string \| number) => void`                            | —       | Called when an item starts exiting.                                          |
| `onExited`      | `(key: string \| number) => void`                            | —       | Called when an item finishes exiting.                                       |

Returns `{ statuses, mounted, enter, exit, toggle }`, where `statuses` and `mounted` are records keyed by item key (`statuses[key]` is a `UseTransitionStatus`, `mounted[key]` is a `boolean`), and `enter`/`exit`/`toggle` (each `() => void`) run the staggered animation across all items.

```tsx
import { useTransitionGroup } from 'xanui-core'

const items = list.map((item, i) => ({ key: item.id, from: { y: 20, opacity: 0 }, to: { y: 0, opacity: 1 } }))

const { statuses, mounted, enter } = useTransitionGroup({
  items,
  stagger: 60,
  mountOnEnter: true,
  onUpdate: (value, key) => applyStyle(key, value),
})

useEffect(() => { enter() }, [])
```

## `useInView`

`useInView<T extends HTMLElement>(options?: UseInViewOptions)` tracks whether an element is intersecting its scroll container using `IntersectionObserver`.

| Option      | Type              | Default | Description                                                                 |
| ----------- | ----------------- | ------- | ------------------------------------------------------------------------------- |
| `threshold` | `number`          | `0.1`   | Intersection ratio required to be considered "in view".                        |
| `root`      | `Element \| null` | `null`  | The scroll container to observe against (`null` = viewport).                   |
| `margin`    | `number`          | `0`     | Added as `rootMargin: `${margin * 8}px`` (an 8px-per-unit spacing scale value). |
| `once`      | `boolean`         | `false` | When `true`, stops observing after the element becomes visible once.           |

Returns `{ ref, inView }`, where `ref` must be attached to the element you want to observe and `inView` is a `boolean`.

```tsx
import { useInView } from 'xanui-core'

const Reveal = ({ children }: { children: React.ReactNode }) => {
  const { ref, inView } = useInView({ threshold: 0.3, once: true })

  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transition: 'opacity 400ms' }}>
      {children}
    </div>
  )
}
```
