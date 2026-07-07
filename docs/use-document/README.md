# useDocument

`useDocument()` reads the current `DocumentContextValue` — `{ document: Document; id: DocumentID } | undefined` — from context. It exists so that code rendered by `Tag`, `ThemeProvider`, and other Xanui internals can inject CSS into the correct `document` instead of always assuming `window.document`, which matters once content is rendered inside an `Iframe`.

## Signature

```ts
const ctx = useDocument()
// ctx === undefined, or:
// { document: Document, id: string }
```

There is no prop or hook to set this context directly — it's populated internally by `AppRoot`'s `DocumentProvider`, seeded from `AppRoot`'s own `document` prop (which defaults to `window.document` on the client). `Iframe` renders a nested `AppRoot` with `document={iframe.contentDocument}`, so components under an `Iframe` automatically resolve to the iframe's document instead of the host page's.

## Return Value

| Field      | Type       | Description                                                                                  |
| ---------- | ---------- | ---------------------------------------------------------------------------------------------- |
| `document` | `Document` | The document CSS/DOM operations should target.                                                  |
| `id`       | `string`   | A unique id (from `useId()`) identifying this document context instance — used internally alongside `CSSCacheId` to scope caches per root. |

If no `AppRoot` (or nested `Iframe`/`AppRoot`) is above the caller, `useDocument()` returns `undefined` — internal consumers like `Tag`/`ThemeProvider` fall back to injecting into the global document in that case.

## Usage Example

```tsx
import { useDocument } from 'xanui-core'

const PortalToOwnDocument = ({ children }) => {
  const ctx = useDocument()
  const doc = ctx?.document ?? document

  return doc.body ? ReactDOM.createPortal(children, doc.body) : null
}
```

Most application code won't need `useDocument` directly — it's primarily useful when writing custom low-level components that need to be `Iframe`-aware, similarly to how `Tag` and `ThemeProvider` use it to target the right document when injecting styles.
