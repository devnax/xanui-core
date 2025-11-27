# usePortal

`usePortal(children)` mounts arbitrary React nodes into a detached DOM node and keeps them themed automatically. It is handy for modals, toasts, and other UI that should escape the current stacking context.

## Requirements

- Must be called inside a React component rendered beneath a `ThemeProvider` (or `AppRoot`).
- Expects an element with the `.xui-app-root` class to exist in `document`. `AppRoot` already renders one.
- Client-side only. The hook touches `document`, `window`, and `react-dom/client`.

## Return value

```ts
const portal = usePortal(<MyModal />)
```

| Method      | Description                                                                              |
| ----------- | ---------------------------------------------------------------------------------------- |
| `isMount()` | `true` if the portal element is currently attached to `document.body`.                   |
| `mount()`   | Appends the portal element to `body` (if not already) and renders the latest `children`. |
| `unmount()` | Removes the element from `body` and clears the React root.                               |

The hook also renders immediately on first use and keeps the portal updated whenever `children` changes.

## Theming behavior

Whenever the portal renders, it wraps `children` in a `ThemeProvider` seeded with the theme from `useTheme()`. That means modals and overlays automatically inherit the right typography, colors, and CSS variables without extra providers.

## Example

```tsx
import { usePortal } from 'xanui-core'

const ModalHost = ({ isOpen, onClose }) => {
  const portal = usePortal(
    <div role="dialog" sx={{ position: 'fixed', inset: 0, backdropFilter: 'blur(4px)' }}>
      <section sx={{ margin: '10% auto', p: 24, radius: 12, bgcolor: 'background.primary' }}>
        <header>Title</header>
        <button onClick={onClose}>Close</button>
      </section>
    </div>
  )

  React.useEffect(() => {
    if (isOpen) portal.mount()
    else portal.unmount()
  }, [isOpen])

  return null
}
```

For most apps, render `ModalHost` somewhere under `AppRoot` and toggle `isOpen`. Portaled content stays synchronized with theme switches automatically.
