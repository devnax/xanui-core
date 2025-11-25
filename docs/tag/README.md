# Tag Component

`Tag` is the primitive building block in Xanui Core. It wraps `React.createElement`, merges native props with Xanui's shorthand styling system, and returns a single DOM node or custom component with generated class names.

## Props

| Prop         | Type                                                 | Default     | Description                                                                                                                 |
| ------------ | ---------------------------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------- |
| `component`  | `keyof JSX.IntrinsicElements \| React.ComponentType` | `'div'`     | Determines the rendered element. Useful for switching between semantic tags without rewriting styles.                       |
| `children`   | `React.ReactNode`                                    | `undefined` | Node tree rendered inside the tag.                                                                                          |
| `sx`         | `CSSProps`                                           | `{}`        | Style map processed by the `css` factory. Supports aliases (e.g., `px`, `bgcolor`, `gap`) and responsive breakpoint values. |
| `sxr`        | `CSSProps`                                           | `{}`        | Same contract as `sx` but applied first. Handy for injecting interface defaults before user overrides.                      |
| `hover`      | `CSSProps`                                           | `undefined` | Styles applied to the `&:hover` pseudo selector.                                                                            |
| `baseClass`  | `string`                                             | `undefined` | Adds a deterministic class name prefix (`xui-${baseClass}`) to the element for easier skinning.                             |
| `classNames` | `classNamesTypes`                                    | `[]`        | Extra class name fragments merged via `pretty-class`.                                                                       |
| `disabled`   | `boolean`                                            | `false`     | Passed through to the resulting DOM node.                                                                                   |
| `...rest`    | Native HTML props minus `width`/`height`             | `—`         | Any remaining props become DOM attributes when not consumed by the styling system.                                          |

> **Tip:** `useTagProps` automatically strips non-CSS props before attaching them to the DOM, so you can co-locate layout instructions (`px`, `maxWidth`, `direction`) with actual attributes (`id`, `onClick`, etc.).

## Usage Examples

### Compose Layout Quickly

```tsx
import { Tag } from 'xanui-core'

export const Card = ({ title, children }) => (
  <Tag
    component="section"
    baseClass="card"
    display="flex"
    direction="column"
    gap={16}
    px={24}
    py={20}
    radius={12}
    shadow={2}
    bgcolor="background.secondary"
    color="text.primary"
    hover={{ shadow: 4, translateY: -2 }}
  >
    <Tag component="h3" fontSize="h5" fontWeight="h5">{title}</Tag>
    {children}
  </Tag>
)
```

### Responsive Props with `useBreakpointProps`

```tsx
import { Tag, useBreakpointProps } from 'xanui-core'

const stackProps = useBreakpointProps({
  direction: { xs: 'column', md: 'row' },
  gap: { xs: 16, md: 32 },
})

<Tag component="nav" {...stackProps}>
  {/* children */}
</Tag>
```
