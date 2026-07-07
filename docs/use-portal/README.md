# Portal

> Note: the source at `src/Portal/index.tsx` exports a `Portal` **component**, not a `usePortal` hook. There is no `usePortal` export anywhere in the package (`src/index.ts` only re-exports `Portal` and its `PortalProps` type). This page documents the real `Portal` component.

`Portal` is an SSR-safe wrapper around `react-dom`'s `createPortal`. It renders its `children` into a DOM node outside of the current component's position in the tree — handy for modals, toasts, tooltips, and anything else that needs to escape the current stacking context.

## Props

| Prop        | Type                      | Default                       | Description                                                                                                    |
| ----------- | ------------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| `children`  | `ReactNode`               | —                              | Content to render into the portal target.                                                                      |
| `container` | `HTMLElement \| string`   | auto-created `<div>`           | Where to portal into. Pass an `HTMLElement` directly, or a CSS selector string that will be looked up via `document.querySelector`. If omitted (or the selector doesn't resolve to an element), `Portal` creates a new `<div data-portal="...">` with a random id and appends it to `document.body`. |

## Behavior

- **SSR-safe**: while `document` is undefined (server rendering), `Portal` renders `null` instead of throwing.
- The target node is resolved once via `useMemo`, re-evaluated only when `container` changes.
- When no `container` is provided, a fresh `<div>` is created and appended to `document.body` on every recomputation (i.e., whenever the `container` prop identity changes) — it is not removed automatically when the component unmounts.

## Usage

```tsx
import { Portal } from 'xanui-core'

const Overlay = ({ children }) => (
  <Portal container="#modal-root">
    <div style={{ position: 'fixed', inset: 0 }}>
      {children}
    </div>
  </Portal>
)
```

### Auto-created container

```tsx
import { Portal } from 'xanui-core'

const Toast = ({ message }) => (
  <Portal>
    <div role="status">{message}</div>
  </Portal>
)
```

`Portal` itself knows nothing about theming — it is a plain DOM portal. Theme CSS variables are scoped (via a CSS class) to the element `AppRoot`/`ThemeProvider` renders, so content rendered through `Portal` only inherits them if the portal target is a descendant of that themed element. This is why the recommended `AppRoot` usage renders `component="body"`: with the theme root *being* `<body>`, an auto-created portal `<div>` (which `Portal` appends to `document.body`) ends up as a descendant of the themed root and inherits the CSS variables. If `AppRoot` is mounted further down the tree instead, a `Portal` targeting `document.body` (or any container outside that subtree) will not inherit theme CSS variables.
