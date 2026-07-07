# Tag Component

`Tag` is the primitive building block in Xanui Core. It wraps `React.createElement`, merges native props with Xanui's shorthand styling system (via `useTagProps`), and returns a single DOM node or custom component with a generated class name. On the server it also renders a `ServerStyleTag` so the collected CSS is emitted with the markup.

## Props

`Tag` accepts native HTML props for the rendered element (minus `width`/`height`, which are reserved for the CSS aliases) plus every field in `Aliases`/`TagCSSProperties` (`src/Tag/types.ts`), plus:

| Prop         | Type                                                    | Default     | Description                                                                                                                 |
| ------------ | -------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `component`  | `keyof JSX.IntrinsicElements \| React.ComponentType`     | `'div'`     | Determines the rendered element. Useful for switching between semantic tags without rewriting styles.                          |
| `children`   | `React.ReactNode`                                        | `undefined` | Node tree rendered inside the tag.                                                                                              |
| `sx`         | `CSSProps`                                               | `{}`        | Style map processed by the `css` factory. Supports aliases (e.g., `px`, `bgcolor`, `gap`) and responsive breakpoint values.      |
| `sxr`        | `CSSProps`                                               | `{}`        | Same contract as `sx` but merged before it. Handy for injecting component-default styles before user overrides.                 |
| `hover`      | `CSSProps`                                               | `undefined` | Styles applied to the `&:hover` selector.                                                                                       |
| `baseClass`  | `string`                                                 | `undefined` | Adds a deterministic class name (`xui-${baseClass}`) to the element for easier skinning.                                        |
| `classNames` | `classNamesTypes`                                        | `undefined` | Extra class name fragments merged via `pretty-class`.                                                                           |
| `disabled`   | `boolean`                                                | `false`     | Applies disabled-state CSS (dimmed opacity, `pointer-events: none`, etc.) in addition to being passed through as a DOM attribute. |
| `...rest`    | Native HTML props not recognized as a CSS alias           | `—`         | Forwarded straight to the DOM element (e.g., `id`, `onClick`, `aria-*`).                                                        |

> **Note:** `Tag` decides which props are CSS vs. DOM by checking each key against a fixed list (`src/Tag/cssPropList.ts`) rather than by inspecting values, so any prop name in that list is always treated as a style even if you didn't intend it as one.

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
    radius="md"
    shadow="md"
    bgcolor="paper.primary"
    color="text.primary"
    hover={{ shadow: 'lg' }}
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
