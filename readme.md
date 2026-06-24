<div align="center">

# @xanui/core

**A styling-engine-agnostic UI primitive layer for React — write CSS as props, theme with a structured color system, and ship SSR-safe styles out of the box.**

[![npm version](https://img.shields.io/npm/v/@xanui/core.svg)](https://www.npmjs.com/package/@xanui/core)
[![license](https://img.shields.io/npm/l/@xanui/core.svg)](https://github.com/devnax/xanui-core/blob/main/LICENSE)

[npm](https://www.npmjs.com/package/@xanui/core) · [GitHub](https://github.com/devnax/xanui-core)

</div>

---

## What is this?

`@xanui/core` gives you a single `<Tag>` component that can become any HTML element (or any custom component) while accepting CSS properties directly as props — `bgcolor`, `p`, `radius`, `flexBox`, breakpoint objects, hover states, and more. Styles are atomized and injected at runtime by [`oncss`](https://www.npmjs.com/package/oncss), with full SSR support via a `<ServerStyleTag>`.

On top of that primitive, the package ships a theme engine with a **structured two-tier color system** — structural colors (`surface`, `paper`, `text`, `divider`, `neutral`) plus variant colors (`brand`, `accent`, `success`, `info`, `warning`, `danger`) — a breakpoint-keyed scale system for **shadow**, **radius**, and **spacing**, a breakpoint system with cookie-backed SSR hydration, an animation engine, transition components, and a handful of practical hooks (`useInView`, `useMergeRefs`, `useColorTemplate`, etc.).

It is **not** a component library. There are no buttons, modals, or inputs. It's the styling/theming foundation you build a design system on top of.

## Why

- **Props instead of class names or CSS files.** `<Tag p={2} bgcolor="brand.primary" radius="md" />` instead of juggling `className` and stylesheets.
- **Themeable by default.** A structured color system — structural tokens for surfaces, text, and borders, plus semantic variant colors — exposed as CSS variables so theme switches are instant and CSS-only.
- **Scale-driven shadow, radius, and spacing.** Reference `"xs" | "sm" | "md" | "lg" | "xl"` anywhere a shadow, radius, or spacing-like prop is expected, and it resolves to the active theme's CSS variables.
- **Responsive without media queries.** Pass `{ xs: 12, md: 6, xl: 4 }` to almost any prop.
- **SSR-correct.** Styles render server-side via `<ServerStyleTag>` and rehydrate correctly on the client — including inside `<Iframe>` and `<Portal>` boundaries.
- **Small surface area.** One `<Tag>` primitive, one theme provider, a few hooks. No component sprawl.

## Installation

```bash
npm install @xanui/core
```

### Peer requirements

This package expects **React 19** and renders styles via the [`oncss`](https://www.npmjs.com/package/oncss) engine, `pretty-class` for class name composition, and [`hueforge`](https://www.npmjs.com/package/hueforge) for color-scale generation — all installed automatically as dependencies.

---

## Quick Start

Wrap your app once in `<AppRoot>` — it sets up the theme, breakpoint context, document context, and CSS cache for you:

```tsx
import { AppRoot, Tag, createTheme } from "@xanui/core";

const theme = createTheme({
  name: "my-theme",
  mode: "light",
  colors: {
    neutral: "Gray",
    brand: "#2563EB",
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
        bgcolor="surface.primary"
      >
        <Tag component="h1" fontSize="h2" color="brand.primary">
          Hello, Xanui
        </Tag>

        <Tag
          component="button"
          bgcolor="brand.primary"
          color="brand.contrast"
          radius="md"
          px={3}
          py={1.5}
          hover={{ bgcolor: "brand.secondary" }}
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
  color="accent.primary"
  hover={{ color: "accent.secondary" }}
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
  hover={{ bgcolor: "brand.ghost" }}
  baseClass="card"
>
  ...
</Tag>
```

### Style props (a sample)

Nearly every standard CSS property is supported directly as a prop (see `cssPropList.ts` for the full list — it covers flex/grid layout, typography, borders, transforms, transitions, animation, positioning, etc.), plus these **aliases**:

| Prop                                    | Resolves to                                                                                                                             |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `p`, `pt`, `pr`, `pb`, `pl`, `px`, `py` | `padding*` — numbers are multiplied by `8` (i.e. an 8px spacing scale); strings `"xs".."xl"` resolve to the theme's spacing scale       |
| `m`, `mt`, `mr`, `mb`, `ml`, `mx`, `my` | `margin*` — same `× 8` scale                                                                                                            |
| `bg`, `bgcolor`                         | `background` / `backgroundColor`                                                                                                        |
| `bgimage`                               | `backgroundImage` with `cover` / `no-repeat` applied automatically                                                                      |
| `radius`, `borderRadius`                | `borderRadius` — numbers × `8`; strings `"xs".."xl"` resolve to the theme's radius scale                                                |
| `shadow`, `boxShadow`                   | `boxShadow` — strings `"xs".."xl"` resolve to the theme's shadow scale, or pass a raw CSS string                                        |
| `flexBox`                               | `display: flex`                                                                                                                         |
| `flexRow` / `flexColumn`                | `flexDirection: row / column`                                                                                                           |
| `flexWraped`                            | `flexWrap: wrap`                                                                                                                        |
| `gap`                                   | `gap` — numbers × `8`; strings `"xs".."xl"` resolve to the theme's spacing scale                                                        |
| `direction`                             | `"row"` / `"column"` → `flexDirection`, otherwise sets text `direction` (e.g. for RTL)                                                  |
| `disabled`                              | When `true`, applies `pointer-events: none`, `cursor: not-allowed`, `opacity: 0.6`, and disables transitions/shadows — all `!important` |
| `spacing`                               | Negative-margin "gutter" pattern for grid-like layouts: offsets a container and pads all direct children                                |

Numeric values passed to spacing-like props are treated as multiples of `8px`. Append `!` to a string value to force `!important`, e.g. `bgcolor="brand.primary!"`.

### Theme-aware values

Several props accept theme tokens instead of raw CSS:

- **Color props** (`color`, `bgcolor`, `background`, `border*Color`, etc.) accept `ColorsRefTypes` tokens — see [Color system](#color-system) below.
- **`fontSize`, `fontWeight`, `lineHeight`** accept typography scale keys: `"xs" | "sm" | "md" | "lg" | "xl" | "h1".."h6"`.
- **`width`, `minWidth`, `maxWidth`** accept breakpoint keys (`"xs" | "sm" | "md" | "lg" | "xl"`) to snap to the theme's breakpoint pixel values.
- **`shadow` / `boxShadow`** accept `"xs" | "sm" | "md" | "lg" | "xl"` to index into the active theme's shadow scale.
- **`radius` / `borderRadius`** accept `"xs" | "sm" | "md" | "lg" | "xl"` to index into the active theme's radius scale.
- **`gap`, `padding`/`p*`, `margin`/`m*`** accept `"xs" | "sm" | "md" | "lg" | "xl"` to index into the active theme's spacing scale.

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
  name: "my-theme",          // used to scope CSS variables: .xui-my-theme-theme-root
  mode: "light",             // "light" | "dark" — picks mode-aware default shadows
  rtl: false,
  colors: {
    neutral: "Gray",         // preset name or any color code
    brand: "#2563EB",        // shorthand: just a color string
    accent: "#7C3AED",
    // surface, paper, text, divider can also be customized — see below
  },
  shadow: {
    xs: "rgba(0,0,0,.08) 0px 1px 3px",
    sm: "rgba(0,0,0,.08) 0px 4px 6px -1px",
    md: "rgba(0,0,0,.10) 0px 10px 15px -3px",
    lg: "rgba(0,0,0,.12) 0px 20px 25px -5px",
    xl: "rgba(0,0,0,.16) 0px 25px 50px -12px",
  },
  radius: {
    xs: "6px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
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

`createTheme` deep-merges your input over the built-in `defaultThemeOptions` (which already defines a `"Gray"` neutral, a full shadow/radius/spacing scale, and a typography scale from `xs`/`sm`/`md`/`lg`/`xl` through `h1`–`h6`). The mode-appropriate shadow defaults are applied automatically (`"light"` gets lighter shadows, `"dark"` gets heavier ones).

---

### Color system

The theme color system is split into two tiers: **structural colors** (for backgrounds, text, and borders) and **variant colors** (for semantic actions and statuses).

#### Structural colors

| Color     | Roles                      | Description                                                     |
| --------- | -------------------------- | --------------------------------------------------------------- |
| `neutral` | `neutral.1`–`neutral.11` | A full 11-step gray scale, auto-inverted in dark mode           |
| `surface` | `.primary` `.secondary`    | Page/app background — derived from neutral steps 50 and 100     |
| `paper`   | `.primary` `.secondary` `.ghost.primary` `.ghost.secondary` | Card/panel background — derived from neutral steps 200 and 250 |
| `text`    | `.primary` `.secondary`    | Body and secondary text colors                                  |
| `divider` | `.primary` `.secondary`    | Border/separator lines                                          |

Structural colors are derived automatically from the `neutral` palette when not explicitly provided. You can override any of them in `createTheme({ colors: { surface, paper, text, divider } })`.

#### Variant colors

| Color     | Roles                                                         |
| --------- | ------------------------------------------------------------- |
| `brand`   | `.primary` `.secondary` `.contrast` `.ghost` `.ghost.secondary` |
| `accent`  | (same roles as brand)                                         |
| `info`    | (same roles as brand)                                         |
| `success` | (same roles as brand)                                         |
| `warning` | (same roles as brand)                                         |
| `danger`  | (same roles as brand)                                         |

| Role       | Meaning                                                                        |
| ---------- | ------------------------------------------------------------------------------ |
| `.primary` | The main color tone — your primary action/status color                         |
| `.secondary` | A step darker — typically used for hover/active states                       |
| `.contrast` | A near-white tone — for text/icons placed on top of `.primary`               |
| `.ghost`   | A translucent, alpha-blended version (10% opacity) — for tinted backgrounds   |
| `.ghost.secondary` | A slightly stronger tint (20% opacity) — for hover states on ghost elements |

Built-in defaults: `brand` → `#3b82f6`, `accent` → `#f59e0b`, `info` → `#0ea5e9`, `success` → `#22c55e`, `warning` → `#eab308`, `danger` → `#ef4444`.

#### Color input

```tsx
createTheme({
  colors: {
    // Neutral: a named preset or any color code
    neutral: "Gray",          // "Slate" | "Gray" | "Zinc" | "Neutral" | "Stone"
    neutral: "#6b7280",       // or a raw hex/rgb/hsl/oklch value

    // Structural: explicit primary/secondary pairs (optional — auto-derived from neutral)
    surface: { primary: "#ffffff", secondary: "#f8f9fa" },
    paper:   { primary: "#f1f3f5", secondary: "#e9ecef" },
    text:    { primary: "#111827", secondary: "#6b7280" },
    divider: { primary: "#e5e7eb", secondary: "#d1d5db" },

    // Variant colors: a single hex string or a primary/secondary/contrast object
    brand: "#2563EB",
    accent: { primary: "#7C3AED", secondary: "#6D28D9", contrast: "#ffffff" },
  },
});
```

#### CSS variables

All theme colors are exposed as CSS custom properties scoped under `.xui-{name}-theme-root`:

```css
/* Neutral scale (indices 0–10, mapping steps 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950) */
--color-neutral-0  through  --color-neutral-10

/* Structural */
--color-surface-primary     --color-surface-secondary
--color-paper-primary       --color-paper-secondary
--color-paper-ghost-primary --color-paper-ghost-secondary
--color-text-primary        --color-text-secondary
--color-divider-primary     --color-divider-secondary

/* Variant (brand, accent, info, success, warning, danger) */
--color-brand-primary       --color-brand-secondary
--color-brand-contrast
--color-brand-ghost-primary --color-brand-ghost-secondary
/* ...same pattern for accent, info, success, warning, danger */

/* Scales */
--shadow-xs  --shadow-sm  --shadow-md  --shadow-lg  --shadow-xl
--radius-xs  --radius-sm  --radius-md  --radius-lg  --radius-xl
--spacing-xs --spacing-sm --spacing-md --spacing-lg --spacing-xl

/* Typography */
--fontsize-xs    --fontsize-sm    --fontsize-md    ...  --fontsize-h6
--fontweight-xs  --fontweight-sm  ...
--lineheight-xs  --lineheight-sm  ...

/* Breakpoints */
--bp-xs  --bp-sm  --bp-md  --bp-lg  --bp-xl
```

#### `ColorsRefTypes` — color token reference syntax

Use these string tokens anywhere a color prop is accepted:

```tsx
// Neutral steps
"neutral.1"  "neutral.2"  "neutral.3"  "neutral.4"  "neutral.5"
"neutral.6"  "neutral.7"  "neutral.8"  "neutral.9"  "neutral.10"  "neutral.11"

// Structural
"surface.primary"  "surface.secondary"
"paper.primary"    "paper.secondary"
"paper.ghost.primary"  "paper.ghost.secondary"
"text.primary"     "text.secondary"
"divider.primary"  "divider.secondary"

// Variant (brand | accent | info | success | warning | danger)
"brand.primary"    "brand.secondary"   "brand.contrast"
"brand.ghost"                          // alias for ghost.primary
"brand.ghost.secondary"
```

Usage in props:

```tsx
<Tag
  bgcolor="surface.primary"          // page background
  color="text.primary"               // body text
  borderColor="divider.primary"      // border
/>

<Tag
  bgcolor="brand.primary"            // filled button
  color="brand.contrast"             // text on filled button
  hover={{ bgcolor: "brand.secondary" }}
/>

<Tag
  bgcolor="brand.ghost"              // ghost/tinted background
  color="brand.primary"
  hover={{ bgcolor: "brand.ghost.secondary" }}
/>
```

---

### Shadow, radius & spacing scales

Every theme carries three breakpoint-keyed scales — `shadow`, `radius`, and `spacing` — each shaped as `{ xs, sm, md, lg, xl }`. They're exposed as CSS variables (`--shadow-*`, `--radius-*`, `--spacing-*`) by `ThemeCssVars`, and resolved automatically whenever a matching prop receives one of those scale keys as a string:

```tsx
<Tag
  shadow="md"      // var(--shadow-md)
  radius="lg"      // var(--radius-lg)
  p="sm"           // var(--spacing-sm)
  gap="xs"         // var(--spacing-xs)
/>
```

Override any step independently via `createTheme({ shadow, radius, spacing })` — partial overrides are deep-merged over the built-in defaults.

### `<ThemeProvider>` and `<AppRoot>`

`<ThemeProvider>` injects:

- A scoped `@global` block exposing all theme CSS variables (colors, shadow, radius, spacing, typography, breakpoints) under `.xui-{name}-theme-root`.
- (When `isRoot`) a CSS reset (box-sizing, margin/padding zero, list-style reset, anchor defaults, etc.) and scrollbar styling — skippable via `noScrollbarCss`.
- A `<Tag>` root element carrying base typography (`fontSize="md"`, system font stack), `bgcolor="surface.primary"`, `color="text.primary"`, and `direction` based on `theme.rtl`.

`<AppRoot>` is the all-in-one composition root: it wraps `<ThemeProvider isRoot>` together with `<DocumentProvider>`, `<CSSCacheProvider>`, `<AppRootProvider>`, and `<BreakpointProvider>`, and persists the active theme name and breakpoint to cookies (`xuitm`, `xuibp`) so SSR can render the correct theme/breakpoint on first paint without a flash. It also supports a `selectionColor` prop to theme the `::selection` highlight.

```tsx
<AppRoot
  theme={theme}
  defaultBreakpoint="lg"   // used for SSR before the client can measure viewport
  selectionColor="brand.primary"
  noScrollbarCss={false}
>
  {children}
</AppRoot>
```

You can customize the scrollbar appearance via the `scrollbar` prop on `<ThemeProvider>`:

```tsx
<ThemeProvider
  theme={theme}
  scrollbar={{ size: 7, thumbColor: "var(--color-neutral-5)", trackColor: "var(--color-neutral-2)" }}
>
  {children}
</ThemeProvider>
```

### `useTheme`

```tsx
import { useTheme } from "@xanui/core";

const theme = useTheme();
theme.update({ name: "dark", mode: "dark" }); // triggers onThemeUpdate on the nearest ThemeProvider/AppRoot
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
  <Tag p={2} radius="md" bgcolor="paper.primary">
    Animated content
  </Tag>
</Transition>
```

Built-in variants (`src/Transition/variants.ts`): `fade`, `fadeUp`, `fadeDown`, `fadeLeft`, `fadeRight`, `slideUp`, `slideDown`, `slideLeft`, `slideRight`, `zoom`, `zoomOver`, `grow`, `collapseVertical`, `collapseHorizontal`. You can also pass a custom callback matching `TransitionVariantCallback` for bespoke transitions.

---

## Hooks Reference

| Hook                                                    | Purpose                                                                                                                                                                                                        |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `useInView({ threshold, root, margin, once })`          | `IntersectionObserver`-backed visibility tracking. Returns `{ ref, inView }`. `margin` is multiplied by `8` to produce `rootMargin` in px; set `once` to disconnect the observer after the first intersection. |
| `useMergeRefs(...refs)`                                 | Combine multiple refs (callback or object) into one ref callback — used internally by `<Tag>` and `<Iframe>`.                                                                                                  |
| `useColorTemplate(color, type)`                         | Returns ready-made `{ main, hover }` style objects for a given theme color and visual `type`: `"fill"`, `"outline"`, `"text"`, or `"ghost"`. Uses the new color token system internally. Handy for building buttons/chips/badges consistently. |
| `useThemeComponent(name, userProps, defaultProps)`      | Merges user + default props, then runs them through a theme-registered component transform (`theme.components[name]`) if one is defined — lets a theme reshape a component's default props globally.           |
| `useDocument()`                                         | Returns the current `{ document, id }` context — relevant when rendering inside an `<Iframe>`, where the "document" isn't `window.document`.                                                                   |
| `useAppRootElement()`                                   | Returns the root DOM node of the nearest `<AppRoot>` — useful for portals that need to stay within the themed subtree.                                                                                         |
| `useCSSCache()` / `useCSSCacheId()` / `getCSSCache(id)` | Low-level access to the `oncss` style cache used for a given `<AppRoot>`/`<Iframe>` instance.                                                                                                                  |

### `useColorTemplate` in detail

`useColorTemplate(color, type)` returns a `{ main, hover }` object with style props ready to spread onto a `<Tag>`. It maps the new color token system automatically:

```tsx
import { useColorTemplate, Tag } from "@xanui/core";

function Button({ color = "brand", variant = "fill", children }) {
  const { main, hover } = useColorTemplate(color, variant);
  return (
    <Tag component="button" {...main} hover={hover} radius="md" px={3} py={1}>
      {children}
    </Tag>
  );
}

// variant="fill"    → bgcolor="{color}.primary", color="{color}.contrast", hover="{color}.secondary"
// variant="outline" → transparent bg, border in "{color}.primary", hover border "{color}.secondary"
// variant="ghost"   → bgcolor="{color}.ghost", color="{color}.primary", hover bg "{color}.ghost.secondary"
// variant="text"    → transparent bg and border, color="{color}.primary"
// color="default"   → maps to paper.primary / text.primary / divider tokens instead
```

---

## Cross-Boundary Rendering

### `<Iframe>`

Renders an isolated `<iframe>` and mounts a *nested* `<AppRoot>` inside its `contentDocument` via a portal — so themed Xanui content can render correctly inside an iframe's own document (own `<head>`, own styles, own breakpoint context), while inheriting the parent theme by default.

```tsx
<Iframe sxr={{ height: 400 }}>
  <Tag p={2} bgcolor="paper.primary">
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
  defaultThemeOptions,
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

Type-only exports include `ThemeOptions`, `ThemeOptionInput`, `ThemeOptionColors`, `ThemeOptionColorsInput`, `ThemeColorVariantValue`, `ThemeColorValue`, `ThemeColorNeutralNames`, `ColorsRefTypes`, `TypographyRefTypes`, `ThemeMode`, `ThemeComponents`, `CSSProps`, `Aliases`, `BreakpointKeys`, `TagProps`, `TagPropsRoot`, `AnimateOptions`, `UseTransitionProps`, `UseTransitionStatus`, `UseTransitionGroupItem`, `UseTransitionGroupProps`, `UseInViewOptions`, `UseColorTemplateType`, `UseColorTemplateColor`, and the `IframeProps` type.

---

## Project Status

`@xanui/core` is built and published with [`makepack`](https://www.npmjs.com/package/makepack), a CLI for bundling and publishing npm packages, styled internally with [`oncss`](https://www.npmjs.com/package/oncss), and generates its color scales with [`hueforge`](https://www.npmjs.com/package/hueforge) — all from the same author.

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