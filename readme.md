# Xanui Core

Xanui Core is a lightweight styling and theming toolkit for React. It bundles a constraint-based CSS generator, a TypeScript-friendly `<Tag>` primitive, responsive helpers, and an opinionated theme engine so that design tokens, animations, and layout logic stay consistent across your application.

## Highlights

- Build any element with `<Tag>` and the ergonomic `sx`/alias props while still passing native attributes.
- Author design tokens once via `createTheme`, ship them with `ThemeProvider`, and switch them at runtime with `createThemeSwitcher`.
- Drive responsive layouts using `BreakpointProvider`, `useBreakpoint`, and `useBreakpointProps` without bespoke media queries.
- Compose micro-animations through `useAnimation`, ready-made `Transition` variants, and reusable CSS utilities.
- Support SSR portals by rehydrating critical styles with `RenderServerStyles`.

## Installation

```bash
npm install @xanui/core
```

## Quick Start

```tsx
import { ThemeProvider, Tag, createTheme, createThemeSwitcher } from '@xanui/core'

// Register a custom theme once at startup
createTheme('brand', {
	colors: {
		brand: { primary: '#7C3AED', secondary: '#5B21B6' },
	},
})

const useThemeSwitcher = createThemeSwitcher('brand', ThemeSwitcherOption)

export const App = () => {
	const { name, change } = useThemeSwitcher()

	return (
		<ThemeProvider theme={name} isRootProvider>
			<Tag
				component="main"
				px={24}
				py={32}
				bgcolor="background"
				color="text.primary"
				gap={24}
			>
				<Tag component="h1" fontSize="h2">
					Xanui Core
				</Tag>

				<button onClick={() => change(name === 'brand' ? 'dark' : 'brand')}>
					Toggle Theme
				</button>
			</Tag>
		</ThemeProvider>
	)
}
```

## Core Concepts

- **Design Tokens** – `createTheme` merges your overrides with defaults and exposes typed references like `brand.primary` or typography presets.
- **Adaptive Layout** – Wrap your app with `BreakpointProvider` (automatically included by `ThemeProvider` when `isRootProvider` is `true`) to consume breakpoint helpers throughout the tree.
- **Composable Styles** – `css`, `getValue`, and `getProps` transform alias props, breakpoints, and pseudo selectors into atomic class names. Use them directly for utilities such as scrollbars or keyframes.
- **Animation Primitives** – `useAnimation` builds scoped keyframes on the fly; `Transition` controls mount/unmount sequences with variants such as `fade`, `slideDown`, or `collapseVertical`.

## Server-Side Rendering

When rendering on the server, collect the emitted styles:

```tsx
import RenderServerStyles from '@xanui/core/RenderServerStyles'

export const Document = () => (
	<html>
		<head>
			<RenderServerStyles />
		</head>
		<body>{/* app */}</body>
	</html>
)
```

## Documentation

Detailed API docs (props tables, option summaries, and usage examples) live inside the `docs/` directory. Each API/component has its own `README.md` for fast reference:

- `docs/tag/README.md`
- `docs/theme-provider/README.md`
- `docs/transition/README.md`
- `docs/use-animation/README.md`
- `docs/use-color-template/README.md`
- `docs/use-interface/README.md`
- `docs/use-breakpoint/README.md`
- `docs/use-breakpoint-props/README.md`
- `docs/use-scrollbar/README.md`
- `docs/render-server-styles/README.md`
- `docs/css/README.md`
- `docs/create-theme/README.md`

## Contributing

1. Fork and clone the repo.
2. Run `npm install`.
3. Use `npm run build` to verify type safety.
4. Submit a pull request that focuses on one improvement at a time.

---

Need another integration example or a new preset? Open an issue so we can keep the primitives lean and discoverable.
