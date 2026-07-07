# useMergeRefs

`useMergeRefs(...refs)` combines multiple refs — callback refs, object refs (`useRef` results), or `undefined` — into a single callback ref, so one DOM node can update several ref sources at once. Used internally by `Tag` (to combine a forwarded `ref` with its own internal ref) and `Iframe` (to combine the forwarded `ref` with its internal `iframeRef`).

## Signature

```ts
const ref = useMergeRefs<T>(...refs: Array<React.Ref<T> | undefined>)
```

| Parameter | Type                                    | Description                                                                 |
| --------- | ------------------------------------------ | -------------------------------------------------------------------------------- |
| `...refs` | `Array<React.Ref<T> \| undefined>`         | Any number of callback refs, object refs, or `undefined`/falsy values to skip.    |

Returns a single memoized callback ref (`useCallback`, re-created only if the `refs` array's identity changes). When the DOM node mounts or unmounts, that value is forwarded to every ref in the list: called directly if it's a function, or assigned to `.current` if it's an object ref.

## Usage Example

```tsx
import { useMergeRefs } from 'xanui-core'
import { forwardRef, useRef } from 'react'

const Box = forwardRef<HTMLDivElement>((props, forwardedRef) => {
  const localRef = useRef<HTMLDivElement>(null)
  const ref = useMergeRefs(localRef, forwardedRef)

  return <div ref={ref} {...props} />
})
```

Because the internal effect just iterates the refs array, passing `undefined` (e.g. a forwarded `ref` that wasn't provided by the caller) is safe and simply skipped.
