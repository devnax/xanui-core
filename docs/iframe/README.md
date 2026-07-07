# Iframe

`Iframe` renders an isolated `<iframe>` and, once it has loaded, mounts a *nested* `AppRoot` inside the iframe's own `contentDocument` via a portal. This lets themed Xanui content (its own CSS reset, theme variables, breakpoint context, CSS cache) render correctly inside the iframe's document, while inheriting the parent's active theme by default.

## Props

`Iframe` accepts every prop `Tag` accepts for an `<iframe>` element (minus `component`, which is fixed to `"iframe"`), plus:

| Prop         | Type            | Default                          | Description                                                                                     |
| ------------ | ----------------- | ----------------------------------- | --------------------------------------------------------------------------------------------------- |
| `theme`      | `ThemeOptions`     | the parent's active theme (`useTheme()`) | Theme passed to the nested `AppRoot` mounted inside the iframe. Defaults to whatever theme is active where `Iframe` is rendered. |
| `CSSCacheId` | `string`           | auto-generated                      | Forwarded to the nested `AppRoot`'s `CSSCacheId`, scoping the iframe's `oncss` style cache separately from the host page's. |
| `children`   | `React.ReactNode`  | —                                    | Rendered inside the iframe's `<body>`, under the nested `AppRoot`.                                  |

## Behavior

- Renders a `Tag component="iframe"` with a blank `srcDoc` (`<!DOCTYPE html><html><head></head><body></body></html>`) and default `sxr` of `{ border: 'none', width: '100%', height: '100%', p: 0, m: 0 }` (overridable via `sxr`).
- Once the iframe fires its `load` event, its `contentDocument` is captured in state.
- `children` are then portaled (via `react-dom`'s `createPortal`) into the iframe's `<body>`, wrapped in an `IframeContext.Provider` (exposing that document/window internally) and a nested `AppRoot` — rendered with `disableRenderar` (the iframe reuses the host page's `Renderar` output rather than mounting its own) and `document={iframe.contentDocument}` so `useDocument()`/CSS injection target the iframe's document instead of the host page's.
- Nothing renders inside the iframe until it has loaded (`contentDocument` is only set after the `load` event).

## Usage

```tsx
import { Iframe, Tag } from 'xanui-core'

const PreviewFrame = () => (
  <Iframe sxr={{ height: 400 }}>
    <Tag p={16} bgcolor="paper.primary">
      Rendered inside the iframe's own document, with its own theme CSS variables.
    </Tag>
  </Iframe>
)
```

### Isolating the style cache

```tsx
<Iframe CSSCacheId="preview-frame">
  <EditorPreview />
</Iframe>
```

### Overriding the theme inside the iframe

```tsx
import { Iframe, createTheme } from 'xanui-core'

const darkTheme = createTheme({ name: 'dark', mode: 'dark' })

<Iframe theme={darkTheme}>
  <PreviewContent />
</Iframe>
```
