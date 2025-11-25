# useBreakpointProps

`useBreakpointProps(props)` lets you describe responsive props inline. It accepts either a plain object (`xs` baseline) or an object whose values are keyed by breakpoints. The hook resolves the correct shape for the current viewport every time the breakpoint changes.

## Parameters

| Parameter | Type                                 | Description                                                                                         |
| --------- | ------------------------------------ | --------------------------------------------------------------------------------------------------- |
| `props`   | `P \| { [K in BreakpointKeys]?: P }` | Set of props to evaluate. Each prop can be a plain value (applied to `xs`) or a per-breakpoint map. |

## Behavior

1. The hook normalizes the input into `{ xs, sm, md, lg, xl }` buckets.
2. It merges buckets up to (and including) the current breakpoint.
3. The merged object is memoized until either the input changes or the breakpoint updates.

## Usage Examples

```tsx
import { Tag, useBreakpointProps } from 'xanui-core'

const ResponsiveStack = (props) => {
  const stack = useBreakpointProps({
    direction: { xs: 'column', md: 'row' },
    gap: { xs: 16, md: 32 },
    alignItems: { xs: 'stretch', lg: 'center' },
  })

  return <Tag display="flex" {...stack} {...props} />
}
```

```tsx
const gridProps = useBreakpointProps({
  gridTemplateColumns: {
    xs: '1fr',
    md: 'repeat(2, minmax(0, 1fr))',
    xl: 'repeat(4, minmax(0, 1fr))',
  },
})

<Tag display="grid" {...gridProps}>/* items */</Tag>
```
