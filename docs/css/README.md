# CSS Utilities

Xanui Core wraps [`oncss`](https://github.com/devnax/oncss) with sane defaults so you can author responsive styles with shorthands, theme references, and CSS-in-JS ergonomics.

## `css(props, options?)`

Transforms a style object into an atomic class name. Applies aliases, breakpoint lookups, and pseudo selectors automatically.

| Option                                      | Type                             | Default                                      | Description                                                                                                    |
| ------------------------------------------- | -------------------------------- | -------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `props`                                     | `CSSProps`                       | —                                            | Declarative style object. Supports aliases (`px`, `bgcolor`, `radius`, etc.), `@global`, and nested selectors. |
| `options.breakpoints`                       | `Record<BreakpointKeys, number>` | `{ xs:0, sm:600, md:900, lg:1200, xl:1536 }` | Breakpoint map used to convert responsive values.                                                              |
| `options.aliases`                           | `Aliases`                        | Built-in map                                 | Extends/overrides the alias dictionary.                                                                        |
| `options.getValue(prop, value, ctx, depth)` | `Function`                       | Internal resolver                            | Custom hook to transform values before serialization (e.g., theme lookups).                                    |
| `options.getProps(prop, value, ctx, depth)` | `Function`                       | Internal mapper                              | Hook to expand a shorthand into multiple CSS declarations.                                                     |
| `options.skipProps(prop, value, depth)`     | `Function`                       | `undefined`                                  | Return truthy to omit a prop from CSS (useful for forwarding DOM attributes).                                  |

The call returns `{ classname, css, skiped }`. You usually apply `classname` and, when using `useTagProps`, read `skiped` to forward untouched props.

## Aliases

Common quality-of-life aliases are supported out of the box:

- Spacing: `p`, `px`, `py`, `m`, `mx`, `gap`, etc.
- Layout: `flexBox`, `flexRow`, `size`, `minWidth`, `maxWidth`.
- Colors/typography: `bgcolor`, `color`, `fontSize`, `fontWeight` (accepting theme references like `brand.primary` or `h3`).

Refer to `src/css/types.ts` for the exhaustive list.

## Helper Functions

| Function                     | Description                                                                                                                                |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `getValue(prop, value, ctx)` | Internal helper that resolves theme references (`brand.primary`, typography aliases, breakpoint tokens) before `oncss` consumes the value. |
| `getProps(prop, value, ctx)` | Maps high-level props (e.g., `flexRow`, `size`) to multiple CSS declarations.                                                              |
| `adjustColor(hex, factor)`   | Lightens/darkens a hex color by multiplying each RGB channel with `factor`. Useful for hover states.                                       |
| `adjustTextContrast(color)`  | Returns either `#111111` or `#FFFFFF` based on perceived luminance to guarantee readable text.                                             |
| `alpha(color, opacity)`      | Converts a hex color to an 8-digit hex (RGBA) with the given opacity (0–1). Throws if the input is not a hex string.                       |

## Usage Examples

```tsx
import { css } from 'xanui-core'

const pill = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  px: 12,
  py: 4,
  bgcolor: 'brand.alpha',
  color: 'brand.text',
  '& svg': { flexShrink: 0 },
})

export const Pill = (props) => (
  <span className={pill.classname} {...props} />
)
```

```ts
import { adjustColor, alpha } from 'xanui-core/css'

const darker = adjustColor('#7C3AED', 0.8)
const overlay = alpha('#111111', 0.6)
```
