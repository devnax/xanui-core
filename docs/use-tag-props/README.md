# useTagProps

`useTagProps` powers the `Tag` component under the hood. It splits incoming props into DOM props vs. CSS props, turns the CSS props into a class name (via `css`), and returns a DOM-safe prop bag you can spread into any element.

## Signature

```ts
const { props, style, themeStyle } = useTagProps<T extends TagComponentType = 'div'>(config: TagPropsRoot<T>)
```

### Input fields

| Field        | Type           | Description                                                                                          |
| ------------ | -------------- | -------------------------------------------------------------------------------------------------------- |
| `sxr`        | `CSSProps`     | Base styles merged in before `sx`. Good for composing reusable component defaults.                        |
| `sx`         | `CSSProps`     | User-facing styles. Supports aliases (`px`, `bgcolor`, `gap`) and responsive values.                       |
| `hover`      | `CSSProps`     | Styles injected into the `&:hover` rule.                                                                   |
| `baseClass`  | `string`       | Adds a deterministic `xui-${baseClass}` class alongside the generated hash class.                          |
| `classNames` | `classNamesTypes` | Extra class fragments merged with `pretty-class`.                                                       |
| `theme`      | `ThemeOptions \| ThemeOptionInput` | Optional. When passed, a second stylesheet is generated scoping that theme's CSS variables to just this element's class (via `createTheme` + `ThemeCssVars`), letting a single `Tag` render with its own theme instance. |
| `...rest`    | `TagProps`     | Everything else. Each key is checked against a fixed CSS-prop list (`src/Tag/cssPropList.ts`); matches become style input, the remainder are treated as native DOM props. |

### Return value

| Key          | Type              | Description                                                                                          |
| ------------ | ------------------ | -------------------------------------------------------------------------------------------------------- |
| `props`      | `TagProps<T>`      | Sanitized props ready for `React.createElement`: the DOM props plus the final composed `className`.       |
| `style`      | `CSSFactoryType`   | Result of calling `css(...)` for the element's own styles (includes `classname`).                         |
| `themeStyle` | `CSSFactoryType?`  | Present only if a `theme` prop was passed — the stylesheet scoping that theme's CSS variables to `style.classname`. |

## How it works

1. Destructures `sx`, `sxr`, `style`, `hover`, `className`, `classNames`, `baseClass`, `theme` from the props; everything else is `rest`.
2. Splits `rest` into DOM props vs. CSS props by checking each key against `cssPropList`.
3. Calls `css({ ...sxr, ...cssProps, ...sx, ...style, '&:hover': hover })` to produce the element's class name.
4. If `theme` was passed, builds a second `css({ '@global': { [`.${classname}`]: ThemeCssVars(createTheme(theme)) } })` call so that instance gets its own theme variables.
5. Composes the final class name: `xui-${baseClass}` → `classNames` → `className` → the generated hash class.
6. Returns the DOM props merged with that `className`.

## Usage Example

```tsx
import { useTagProps } from 'xanui-core'

export const PrimitiveButton = (rawProps) => {
  const { props } = useTagProps({
    component: 'button',
    baseClass: 'button',
    sxr: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center' },
    sx: {
      px: 16,
      py: 10,
      radius: 'sm',
      gap: 8,
      cursor: 'pointer',
      bgcolor: 'brand.primary',
      color: 'brand.contrast',
    },
    hover: { bgcolor: 'brand.secondary' },
    ...rawProps,
  })

  return <button {...props} />
}
```

Use this hook whenever you build custom primitives that need the same prop ergonomics as `Tag` without going through the `Tag` component itself.
