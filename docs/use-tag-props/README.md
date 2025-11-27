# useTagProps

`useTagProps` powers the `Tag` component under the hood. It normalizes Xanui's shorthand CSS props into a class name (via `css`) and returns a DOM-safe prop bag you can spread into any element.

## Signature

```ts
const { props, style } = useTagProps<T extends TagComponentType = 'div'>(config: TagPropsRoot<T>)
```

### Input fields

| Field        | Type               | Description                                                                                 |
| ------------ | ------------------ | ------------------------------------------------------------------------------------------- |
| `sxr`        | `CSSProps`         | Base styles applied before `sx`. Good for composing reusable interfaces.                    |
| `sx`         | `CSSProps`         | User-facing styles. Supports aliases (`px`, `bgcolor`, `gap`) and responsive values.        |
| `hover`      | `CSSProps`         | Styles injected into the `&:hover` rule.                                                    |
| `baseClass`  | `string`           | Adds a deterministic `xui-${baseClass}` class alongside the generated hash class.           |
| `classNames` | `ClassNameInput[]` | Extra class fragments merged with `pretty-class`.                                           |
| `...rest`    | `TagProps`         | Any other props. Native DOM props are forwarded; unknown styling props are stripped safely. |

### Return value

| Key     | Type             | Description                                                                                                                    |
| ------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `props` | `TagProps<T>`    | Sanitized props ready for `React.createElement`. Only non-CSS props (e.g., `id`, `onClick`) remain. Also includes `className`. |
| `style` | `CSSFactoryType` | Result from calling `css`. Exposes `classname` and metadata like `skiped` for debugging/advanced use cases.                    |

## How it works

1. Merges `sxr`, `sx`, `hover`, and remaining props into a CSS object.
2. Passes the object to `css` with `skipProps` so invalid CSS keys on the top-level are omitted and returned in `style.skiped`.
3. Collects the skipped props and reattaches them to `props` so they still reach the DOM (e.g., `onClick`, `aria-*`).
4. Builds the final `className` array: `xui-${baseClass}` → generated classname → user-provided classes.

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
      radius: 8,
      gap: 8,
      cursor: 'pointer',
      bgcolor: 'brand.primary',
      color: 'text.inverse',
    },
    hover: { opacity: 0.92 },
    ...rawProps,
  })

  return <button {...props} />
}
```

Use this hook whenever you build custom primitives that need the same prop ergonomics as `Tag` without fully re-rendering it.
