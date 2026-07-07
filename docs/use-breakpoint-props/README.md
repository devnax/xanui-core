# useBreakpointProps

`useBreakpointProps(props)` lets you describe individual props as per-breakpoint maps and resolves them to a single flat props object for the current breakpoint. It reads the active breakpoint via `useBreakpoint()`, so it must be used under a `BreakpointProvider` (e.g. inside `<AppRoot>`).

## Parameters

| Parameter | Type        | Description                                                                                                                          |
| --------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `props`   | `P extends object` | An object whose properties are either plain values (passed through unchanged) or objects keyed by breakpoint (`xs`/`sm`/`md`/`lg`/`xl`), e.g. `{ xs: value, md: value }`. |

## Behavior

1. For each top-level property in `props`, the hook checks whether its value is a plain object (not a React element) with at least one key from `xs`, `sm`, `md`, `lg`, `xl`. If so, that property is treated as responsive.
2. Responsive properties are merged mobile-first: starting from the `xs` bucket, each subsequent breakpoint (`sm`, `md`, `lg`, `xl`) is merged in only while the current breakpoint is the same as or larger than it; merging stops once a bucket larger than the current breakpoint is reached.
3. Non-responsive properties are returned unchanged.
4. The result is `{ ...props, ...resolvedResponsiveProps }` — resolved values override the original per-breakpoint maps for the same keys.
5. The set of "responsive" prop names is memoized against a JSON-stringified snapshot of `props` (excluding React internals like `_owner`/`_store`), so it's only recomputed when the input actually changes.
6. If none of the properties are responsive, the original `props` object is returned as-is.

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

Properties that aren't keyed by breakpoint are left untouched, so you can freely mix responsive and non-responsive props in the same call:

```tsx
const props = useBreakpointProps({
  color: 'brand.text', // passed through as-is
  fontSize: { xs: 14, md: 16, xl: 18 }, // resolved per breakpoint
})
```

The breakpoint scale (`xs`, `sm`, `md`, `lg`, `xl`) corresponds to the pixel values defined in `css`'s `breakpoints` map: `{ xs: 0, sm: 640, md: 768, lg: 1024, xl: 1280 }`.
