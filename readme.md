<div align="center">

# @xanui/core

**A styling-engine-agnostic UI primitive layer for React — write CSS as props, theme with OKLCH, and ship SSR-safe styles out of the box.**

[![npm version](https://img.shields.io/npm/v/@xanui/core.svg)](https://www.npmjs.com/package/@xanui/core)
[![license](https://img.shields.io/npm/l/@xanui/core.svg)](https://github.com/devnax/xanui-core/blob/main/LICENSE)

[npm](https://www.npmjs.com/package/@xanui/core) · [GitHub](https://github.com/devnax/xanui-core)

</div>

---

## What is this?

`@xanui/core` gives you a single `<Tag>` component that can become any HTML element (or any custom component) while accepting CSS properties directly as props — `bgcolor`, `p`, `radius`, `flexBox`, breakpoint objects, hover states, and more. Styles are atomized and injected at runtime by [`oncss`](https://www.npmjs.com/package/oncss), with full SSR support via a `<ServerStyleTag>`.

On top of that primitive, the package ships a theme engine built on **OKLCH color science** (so every color role — `surface`, `subtle`, `elevated`, `emphasis`, `contrast`, `muted`, `ghost`, `divider` — is derived automatically from a single base color), a breakpoint system with cookie-backed SSR hydration, an animation engine, transition components, and a handful of practical hooks (`useInView`, `useMergeRefs`, `useColorTemplate`, etc.).

It is **not** a component library. There are no buttons, modals, or inputs. It's the styling/theming foundation you build a design system on top of.

## Why

- **Props instead of class names or CSS files.** `<Tag p={2} bgcolor="primary" radius={8} />` instead of juggling `className` and stylesheets.
- **Themeable by default.** Every color you define expands into a 9-shade role system, exposed as CSS variables (`var(--color-primary-base)`, etc.) so theme switches are instant and CSS-only.
- **Responsive without media queries.** Pass `{ xs: 12, md: 6, xl: 4 }` to almost any prop.
- **SSR-correct.** Styles render server-side via `<ServerStyleTag>` and rehydrate correctly on the client — including inside `<Iframe>` and `<Portal>` boundaries.
- **Small surface area.** One `<Tag>` primitive, one theme provider, a few hooks. No component sprawl.

## Installation

```bash
npm install @xanui/core
```

### Peer requirements

This package expects **React 19** and renders styles via the [`oncss`](https://www.npmjs.com/package/oncss) engine and `pretty-class` for class name composition — both are installed automatically as dependencies.

---

## Quick Start

Wrap your app once in `<AppRoot>` — it sets up the theme, breakpoint context, document context, and CSS cache for you:

```tsx
import { AppRoot, Tag, createTheme } from "@xanui/core";

const theme = createTheme({
  mode: "light",
  colors: {
    primary: "#2563EB",
    accent: "#7C3AED",
  },
});

export default function App() {
  return (
    <AppRoot theme={theme}>
      <Tag
        component="main"
        p={3}
        flexBox
        flexColumn
        gap={2}
        bgcolor="default.surface"
      >
        <Tag component="h1" fontSize="h2" color="primary">
          Hello, Xanui
        </Tag>

        <Tag
          component="button"
          bgcolor="primary"
          color="primary.contrast"
          radius={8}
          px={3}
          py={1.5}
          hover={{ bgcolor: "primary.surface" }}
        >
          Click me
        </Tag>
      </Tag>
    </AppRoot>
  );
}
```

That's it — no separate CSS import, no `className`. `<AppRoot>` injects a CSS reset, scrollbar styling, theme CSS variables, and a breakpoint provider automatically.

---

## The `<Tag>` Primitive

`<Tag>` renders any element (default `"div"`) or custom component via the `component` prop, while letting you pass CSS values, theme-aware aliases, and breakpoint objects directly as props.

```tsx
import { Tag } from "@xanui/core";

<Tag
  component="a"
  href="/docs"
  display="flex"
  alignItems="center"
  gap={1}
  p={{ xs: 1, md: 2 }}     // responsive padding
  color="accent"
  hover={{ color: "accent.surface" }}
>
  Read the docs
</Tag>
```

### How prop resolution works

Internally, `useTagProps` splits incoming props into:

1. **DOM props** — anything not recognized as a style prop (`href`, `onClick`, `id`, `aria-*`, etc.) — passed straight to the underlying element.
2. **CSS props** — anything in the style prop list (see below) — collected and run through `oncss`'s `css()` function, which returns an atomic `className`.
3. **`sx` / `sxr`** — escape hatches for arbitrary CSS objects (including nested selectors like `"& > *"` or `"&:hover"`). `sxr` is merged first (lower priority), `sx` last (highest priority, after `style`-prop CSS).
4. **`hover`** — a CSS object automatically wrapped into `&:hover`.
5. **`theme`** — when passed to a `<Tag>`, generates scoped CSS variables (via `ThemeCssVars`) under that tag's own class, letting you override theme tokens for a sub-tree without a full `<ThemeProvider>`.
6. **`baseClass`** — prefixes a class as `xui-{baseClass}` for stable, theme-targetable hooks.
7. **`classNames` / `className`** — merged in via `pretty-class`.

```tsx
<Tag
  p={2}
  sxr={{ "& > *": { marginBottom: 8 } }}   // base styles, lowest priority
  sx={{ boxShadow: 2 }}                     // overrides, highest priority
  hover={{ bgcolor: "primary.subtle" }}
  baseClass="card"
>
  ...
</Tag>
```

### Style props (a sample)

Nearly every standard CSS property is supported directly as a prop (see `cssPropList.ts` for the full list — it covers flex/grid layout, typography, borders, transforms, transitions, animation, positioning, etc.), plus these **aliases**:

| Prop | Resolves to |
|---|---|
| `p`, `pt`, `pr`, `pb`, `pl`, `px`, `py` | `padding*` — numbers are multiplied by `8` (i.e. an 8px spacing scale) |
| `m`, `mt`, `mr`, `mb`, `ml`, `mx`, `my` | `margin*` — same `× 8` scale |
| `bg`, `bgcolor` | `background` / `backgroundColor` |
| `bgimage` | `backgroundImage` with `cover` / `no-repeat` applied automatically |
| `radius`, `borderRadius` | `borderRadius` (numbers × 8) |
| `shadow` | `boxShadow` — pass a number (`0`–`24`) to use the theme's elevation scale, or a raw CSS string |
| `flexBox` | `display: flex` |
| `flexRow` / `flexColumn` | `flexDirection: row / column` |
| `flexWraped` | `flexWrap: wrap` |
| `gap` | `gap` (numbers × 8) |
| `direction` | `"row"` / `"column"` → `flexDirection`, otherwise sets text `direction` (e.g. for RTL) |
| `disabled` | When `true`, applies `pointer-events: none`, `cursor: not-allowed`, `opacity: 0.6`, and disables transitions/shadows — all `!important` |
| `spacing` | Negative-margin "gutter" pattern for grid-like layouts: offsets a container and pads all direct children |

Numeric values passed to spacing-like props are treated as multiples of `8px`. Append `!` to a string value to force `!important`, e.g. `bgcolor="primary!"`.

### Theme-aware values

Several props accept theme tokens instead of raw CSS:

- **Color props** (`color`, `bgcolor`, `background`, `border*Color`, etc.) accept `"primary"`, `"primary.base"`, `"primary.surface"`, `"primary.subtle"`, `"primary.elevated"`, `"primary.emphasis"`, `"primary.contrast"`, `"primary.muted"`, `"primary.divider"`, or `"primary.ghost"` — resolved to CSS variables like `var(--color-primary-surface)`.
- **`fontSize`, `fontWeight`, `lineHeight`** accept typography scale keys: `"xs" | "sm" | "md" | "lg" | "xl" | "h1".."h6"`.
- **`width`, `minWidth`, `maxWidth`** accept breakpoint keys (`"xs" | "sm" | "md" | "lg" | "xl"`) to snap to the theme's breakpoint pixel values.
- **`shadow` / `boxShadow`** accept a number to index into the active theme's shadow scale (light and dark themes each ship their own 24-step elevation scale).

### Responsive (breakpoint) props

Any prop can be made responsive by passing an object keyed by breakpoint:

```tsx
<Tag
  width={{ xs: "100%", md: "50%", xl: "33%" }}
  flexDirection={{ xs: "column", md: "row" }}
  p={{ xs: 1, lg: 4 }}
/>
```

This is resolved by `useBreakpointProps`, which merges values from the current breakpoint **and all breakpoints below it that were defined** (a "mobile-first," cascading match) — so you don't need to specify every key at every size.

---

## Theming

### `createTheme`

```tsx
import { createTheme } from "@xanui/core";

const theme = createTheme({
  mode: "dark",          // "light" | "dark" — picks the right default base palette
  rtl: false,
  colors: {
    primary: "#2563EB",                       // shorthand: just a color string
    accent: { base: "#7C3AED", muted: "#A78BFA" }, // or override individual roles
  },
  typography: {
    md: { fontSize: 16, lineHeight: 1.5, fontWeight: 400 },
    // ...
  },
  components: {
    // theme-level prop transforms, see useThemeComponent below
  },
});
```

`createTheme` deep-merges your input over the built-in `lightThemeOptions` / `darkThemeOptions` defaults (which already define `default`, `primary`, `accent`, `success`, `info`, `warning`, and `danger` color roles, plus a full typography scale from `xs`/`sm`/`md`/`lg`/`xl` through `h1`–`h6`).

### Color roles via OKLCH

Every color you provide — whether a single hex/rgb/hsl/oklch string or a partial override object — is expanded into a complete role set using perceptually-uniform OKLCH math:

| Role | Meaning |
|---|---|
| `base` | Your original color |
| `surface` | Slightly shifted, for subtle backgrounds |
| `subtle` | A softer variant, further from `base` |
| `elevated` | Shifted toward dark/light for raised surfaces |
| `emphasis` | Strongest shift, for high-contrast surfaces |
| `contrast` | A readable foreground color against `base` |
| `muted` | A desaturated, lower-emphasis tone |
| `ghost` | A translucent version (alpha-blended), for tinted backgrounds |
| `divider` | A subtle separator tone derived from `base` |

These resolve to CSS custom properties at runtime (`--color-{name}-{role}`), generated by `ThemeCssVars` and scoped under a `.xui-{theme-name}-theme-root` class by `<ThemeProvider>` — so switching themes is just swapping the variable values, no re-render of consumer styles required.

### `<ThemeProvider>` and `<AppRoot>`

`<ThemeProvider>` injects:

- A scoped `@global` block exposing all theme CSS variables.
- (When `isRoot`) a CSS reset (box-sizing, margin/padding zero, list-style reset, anchor defaults, etc.) and scrollbar styling — both skippable via `noScrollbarCss`.
- A `<Tag>` root element carrying base typography (`fontSize="md"`, system font stack) and `direction` based on `theme.rtl`.

`<AppRoot>` is the all-in-one composition root: it wraps `<ThemeProvider isRoot>` together with `<DocumentProvider>`, `<CSSCacheProvider>`, `<AppRootProvider>`, and `<BreakpointProvider>`, and persists the active theme name and breakpoint to cookies (`xuitm`, `xuibp`) so SSR can render the correct theme/breakpoint on first paint without a flash. It also supports a `selectionColor` prop to theme the `::selection` highlight.

```tsx
<AppRoot
  theme={theme}
  defaultBreakpoint="lg"   // used for SSR before the client can measure viewport
  selectionColor="primary"
  noScrollbarCss={false}
>
  {children}
</AppRoot>
```

### `useTheme`

```tsx
import { useTheme } from "@xanui/core";

const theme = useTheme();
theme.update({ mode: "dark" }); // triggers onThemeUpdate on the nearest ThemeProvider/AppRoot
```

---

## Responsive Breakpoints

Default breakpoints (pixels): `xs: 0`, `sm: 640`, `md: 768`, `lg: 1024`, `xl: 1280`.

### `<BreakpointProvider>`

Included automatically by `<AppRoot>`. Listens to `matchMedia` queries for each breakpoint range, updates context on change, and writes the current breakpoint to a cookie (`xuibp`) so the next server render can start with the right value.

### `useBreakpoint`

```tsx
import { useBreakpoint } from "@xanui/core";

const bp = useBreakpoint();
bp.value;                 // current breakpoint key, e.g. "md"
bp.is("md");               // exact match
bp.isUp("md");              // strictly above "md"
bp.isDown("md");            // strictly below "md"
bp.isOrUp("md");            // "md" or above
bp.isOrDown("md");          // "md" or below
bp.isBetween("sm", "lg");   // sm <= current < lg
```

### `useBreakpointProps`

Powers responsive props on `<Tag>`, but you can use it directly for your own components — pass any props object and it resolves breakpoint-object values down to a flat props object for the current viewport.

---

## Animation

### `animate`

A dependency-free, `requestAnimationFrame`-based tweening engine — animate any set of numeric values with per-key easing and mid-animation breakpoint callbacks.

```tsx
import animate, { Easing } from "@xanui/core";

const cancel = animate({
  from: { x: 0, opacity: 0 },
  to: { x: 100, opacity: 1 },
  duration: 400,
  easing: Easing.standard,        // or a per-key map: { x: Easing.fast, opacity: Easing.default }
  onUpdate: (value, progress) => {
    el.style.transform = `translateX(${value.x}px)`;
    el.style.opacity = String(value.opacity);
  },
  onDone: (value) => console.log("done", value),
  repeat: 2,            // repeat N additional cycles
  repeatBack: true,      // ping-pong on repeat
  breakpoints: {
    x: [{ value: 50, callback: () => console.log("crossed x=50") }],
  },
});

cancel(); // stop the animation early
```

Built-in `Easing` functions: `default` (cubic ease-out), `standard`, `fast`, `smooth`, `linear`, `bounceBezier` (cubic-bezier curves), plus `cubicInOut`, `easeOutBounce`, and `spring`.

### `useTransition`

A single enter/exit state machine on top of `animate`, exposing `status` (`"entering" | "entered" | "exiting" | "exited"`):

```tsx
import { useTransition, Easing } from "@xanui/core";

const trans = useTransition({
  from: { opacity: 0 },
  to: { opacity: 1 },
  duration: 300,
  easing: Easing.smooth,
  onUpdate: (value) => (el.style.opacity = String(value.opacity)),
  onEntered: () => console.log("fully visible"),
});

trans.enter();           // animate to "to"
trans.exit();             // animate to "from"
trans.toggle();
trans.enter(false);       // jump instantly, no animation
trans.status;             // current phase
trans.isEntered;          // boolean
```

### `useTransitionGroup`

Staggered enter/exit for a list of keyed items, with mount/unmount support:

```tsx
import { useTransitionGroup } from "@xanui/core";

const group = useTransitionGroup({
  items: list.map((item, i) => ({ key: item.id, from: { y: 20, opacity: 0 }, to: { y: 0, opacity: 1 } })),
  stagger: 80,
  duration: 300,
  mountOnEnter: true,
  unmountOnExit: true,
  onUpdate: (value, key, progress) => { /* apply per-item styles */ },
});

group.enter();
group.exit();
group.statuses[item.key];  // "entering" | "entered" | "exiting" | "exited"
group.mounted[item.key];    // boolean, useful with mountOnEnter/unmountOnExit
```

### `<Transition>`

A declarative mount/exit wrapper around `useTransition`, driving a single child element through named variants:

```tsx
import { Transition } from "@xanui/core";

<Transition open={isOpen} variant="fadeUp" duration={300} easing="smooth">
  <Tag p={2} bgcolor="default.elevated">
    Animated content
  </Tag>
</Transition>
```

Built-in variants (`src/Transition/variants.ts`): `fade`, `fadeUp`, `fadeDown`, `fadeLeft`, `fadeRight`, `slideUp`, `slideDown`, `slideLeft`, `slideRight`, `zoom`, `zoomOver`, `grow`, `collapseVertical`, `collapseHorizontal`. You can also pass a custom callback matching `TransitionVariantCallback` for bespoke transitions.

---

## Hooks Reference

| Hook | Purpose |
|---|---|
| `useInView({ threshold, root, margin, once })` | `IntersectionObserver`-backed visibility tracking. Returns `{ ref, inView }`. `margin` is multiplied by `8` to produce `rootMargin` in px; set `once` to disconnect the observer after the first intersection. |
| `useMergeRefs(...refs)` | Combine multiple refs (callback or object) into one ref callback — used internally by `<Tag>` and `<Iframe>`. |
| `useColorTemplate(color, type)` | Returns ready-made `{ main, hover }` style objects for a given theme color and visual `type`: `"fill"`, `"outline"`, `"text"`, or `"ghost"`. Handy for building buttons/chips/badges consistently. |
| `useThemeComponent(name, userProps, defaultProps)` | Merges user + default props, then runs them through a theme-registered component transform (`theme.components[name]`) if one is defined — lets a theme reshape a component's default props globally. |
| `useDocument()` | Returns the current `{ document, id }` context — relevant when rendering inside an `<Iframe>`, where the "document" isn't `window.document`. |
| `useAppRootElement()` | Returns the root DOM node of the nearest `<AppRoot>` — useful for portals that need to stay within the themed subtree. |
| `useCSSCache()` / `useCSSCacheId()` / `getCSSCache(id)` | Low-level access to the `oncss` style cache used for a given `<AppRoot>`/`<Iframe>` instance. |

---

## Cross-Boundary Rendering

### `<Iframe>`

Renders an isolated `<iframe>` and mounts a *nested* `<AppRoot>` inside its `contentDocument` via a portal — so themed Xanui content can render correctly inside an iframe's own document (own `<head>`, own styles, own breakpoint context), while inheriting the parent theme by default.

```tsx
<Iframe sxr={{ height: 400 }}>
  <Tag p={2} bgcolor="default.surface">
    Rendered inside the iframe's own document
  </Tag>
</Iframe>
```

### `<Portal>`

An SSR-safe portal: renders children into a given `container` (an `HTMLElement` or CSS selector string), or auto-creates a uniquely-tagged `<div>` appended to `document.body` if none is provided.

```tsx
<Portal container="#modal-root">
  <Tag position="fixed" top={0} left={0}>Overlay</Tag>
</Portal>
```

### `Renderar`

An imperative, render-anywhere registry — useful for rendering components (e.g. toasts, modals) from outside the React tree (event handlers, utility functions) without prop-drilling a portal target. `<AppRoot>` mounts `<RenderRenderar />` automatically unless `disableRenderar` is set.

```tsx
import { Renderar } from "@xanui/core";

const handle = Renderar.render(MyToast, { message: "Saved!" });
handle.updateProps({ message: "Updated!" });
handle.unrender();
```

---

## SSR

Every piece of generated CSS (`<Tag>` styles, theme variables, reset, scrollbar styling) is rendered server-side through `<ServerStyleTag>`, which emits a real `<style>` tag with `precedence`/`href` attributes during SSR and renders nothing on the client (since styles are then injected directly by `oncss`). `<AppRoot>` also moves any `<style data-oncss>` tags that end up in `<body>` into `<head>` on mount, and persists the active theme name and breakpoint to cookies so the next server render matches what the client already has, avoiding flashes of incorrect theme/layout.

---

## API Surface

```ts
import {
  // Core primitive
  Tag,
  useTagProps,

  // App / context setup
  AppRoot,
  Portal,
  Iframe,
  Renderar,
  useDocument,
  useAppRootElement,

  // Theming
  ThemeProvider,
  createTheme,
  useTheme,
  lightThemeOptions,
  darkThemeOptions,
  useThemeComponent,

  // Breakpoints
  useBreakpoint,
  useBreakpointProps,

  // CSS engine
  css,
  getValue,
  getProps,
  useCSSCache,
  useCSSCacheId,
  getCSSCache,

  // Animation
  animate,
  Easing,
  Transition,
  useTransition,
  useTransitionGroup,

  // Hooks
  useInView,
  useMergeRefs,
  useColorTemplate,
} from "@xanui/core";
```

Type-only exports include `ThemeOptions`, `ThemeOptionInput`, `ThemeColorKeys`, `ColorsRefTypes`, `TypographyRefTypes`, `CSSProps`, `Aliases`, `BreakpointKeys`, `TagProps`, `TagPropsRoot`, `AnimateOptions`, `UseTransitionProps`, `UseTransitionStatus`, `UseTransitionGroupItem`, `UseTransitionGroupProps`, `UseInViewOptions`, and the `IframeProps` type.

---

## Project Status

`@xanui/core` is built and published with [`makepack`](https://www.npmjs.com/package/makepack), a CLI for bundling and publishing npm packages, and styled internally with [`oncss`](https://www.npmjs.com/package/oncss) — both from the same author.

## Contributing

1. Fork and clone the [repository](https://github.com/devnax/xanui-core).
2. `npm install`
3. Make your change, focused on a single concern.
4. Open a pull request.

## License

See [LICENSE](https://github.com/devnax/xanui-core/blob/main/LICENSE) in the repository.

## Author

Built by [Devnax (Naxrul Ahmed)](https://github.com/devnax) — Full-Stack Software Engineer.

- GitHub: [github.com/devnax](https://github.com/devnax)
- npm: [npmjs.com/~devnax](https://www.npmjs.com/~devnax)
