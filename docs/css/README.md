# CSS Utilities

Xanui Core wraps [`oncss`](https://github.com/devnax/oncss) with sane defaults so you can author responsive styles with shorthands, theme references, and CSS-in-JS ergonomics.

## `css(props, options?)`

Transforms a style object into an atomic class name. Applies aliases, breakpoint lookups, and theme-token resolution automatically.

| Option                                       | Type                              | Default                                                     | Description                                                                                                    |
| --------------------------------------------- | ---------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `props`                                       | `CSSProps`                         | —                                                             | Declarative style object. Supports aliases (`px`, `bgcolor`, `radius`, etc.), `@global`, and nested selectors.    |
| `options.breakpoints`                         | `Record<BreakpointKeys, number>`   | `{ xs: 0, sm: 640, md: 768, lg: 1024, xl: 1280 }`             | Breakpoint map used to convert responsive values. Xanui always merges in its own map, so this option is mainly for internal use. |
| `options.aliases`                             | `Aliases`                          | Built-in map (see below)                                      | Extends/overrides the alias dictionary.                                                                            |
| `options.getValue(prop, value, ctx, depth)`   | `Function`                         | Internal resolver                                              | Custom hook to transform values before serialization; falls back to the built-in `getValue` when it returns falsy. |
| `options.getProps(prop, value, ctx, depth)`   | `Function`                         | Internal mapper                                                | Hook to expand a shorthand into multiple CSS declarations; falls back to the built-in `getProps`.                  |
| `options.injectStyle`, `container`, `cacheId` | —                                   | —                                                               | Passed straight through to `oncss`; used by `Tag`/`useTagProps` to control SSR injection and cache scoping.        |

The call returns an `oncss` `CSSFactoryType` object exposing `classname` (the generated class) among other metadata.

## Aliases

Built-in aliases (`src/css/aliases.ts`), all consumable directly as props on `Tag`:

- **Spacing**: `p`, `pt`, `pr`, `pb`, `pl`, `px`, `py`, `m`, `mt`, `mr`, `mb`, `ml`, `mx`, `my`, `gap`, `radius`/`borderRadius` — numeric values are multiplied by `8` (so `px={2}` → `16px`); string values (including spacing/radius scale keys like `"md"`) pass through as-is or get looked up as a CSS variable.
- **Color**: `bgcolor`, `bg`, `bgimage`, `color`, `borderColor` — accept a raw CSS color or a theme reference such as `"brand.primary"`, `"neutral.500"`, `"paper.ghost.primary"` (see `ColorsRefTypes` in `src/theme/types.ts`), resolved to `var(--color-...)` custom properties.
- **Layout**: `flexBox`, `flexRow`, `flexColumn`, `flexWraped`, `direction` (`"row" | "column"` maps to `flexDirection`; other values map to the CSS `direction` property), `size`, `width`/`minWidth`/`maxWidth` (accept breakpoint keys, resolved to `var(--bp-...)`).
- **Typography**: `fontSize`, `fontWeight`, `lineHeight` accept a typography scale key (`"xs"`…`"xl"`, `"h1"`…`"h6"`) resolved to `var(--fontsize-...)`/`var(--fontweight-...)`/`var(--lineheight-...)`.
- **Shadow**: `shadow` accepts a scale key (`"xs"`…`"xxl"`) resolved to `var(--shadow-...)`.
- **Border**: `border`, `borderLeft`, `borderRight`, `borderTop`, `borderBottom` accept `true`/`false`/a number (rendered as `${n}px solid var(--color-divider-primary)`) or a raw CSS border string.
- **Other**: `disabled` (via `getProps`) applies disabled-state styling (`pointerEvents: none`, dimmed `opacity`, etc.); `spacing` (via `getProps`, numeric only) produces a negative-margin/gap layout used for child spacing.

Any value can be suffixed with `!` to force `!important` (e.g. `px: '16!'`).

Refer to `src/css/types.ts` for the exhaustive `Aliases` type and `src/css/aliases.ts` / `src/css/getValue.ts` / `src/css/getProps.ts` for the implementation.

## Helper Functions

| Function                          | Description                                                                                                    |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `getValue(prop, value, ctx)`         | Resolves theme/typography/spacing/breakpoint token strings to CSS variable references before `oncss` consumes the value. |
| `getProps(prop, value, ctx)`         | Expands `disabled` and `spacing` into multiple CSS declarations.                                                |
| `breakpoints`                        | The default breakpoint map: `{ xs: 0, sm: 640, md: 768, lg: 1024, xl: 1280 }`.                                  |

## Usage Examples

```tsx
import { css } from 'xanui-core'

const pill = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  px: 12,
  py: 4,
  bgcolor: 'brand.ghost.primary',
  color: 'brand.primary',
  '& svg': { flexShrink: 0 },
})

export const Pill = (props) => (
  <span className={pill.classname} {...props} />
)
```
