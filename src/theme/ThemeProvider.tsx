import * as React from "react"
import { ThemeOptions } from "./types"
import Tag from "../Tag"
import { TagComponentType, TagProps } from "../Tag/types"
import { BreakpointProvider } from "../breakpoint"
import { ThemeContex, ThemeFactory } from "./core"
import ThemeCssVars from "./ThemeCssVars"
import { css } from "../css"
import useScrollbar from "../useScrollbar"
import { createTheme } from "./createTheme"
import { darkColorPallete, lightColorPallete } from "./ThemeDefaultOptions"

export type ThemeProviderProps<T extends TagComponentType = 'div'> = TagProps<T> & {
   theme: string;
   applyScrollbarCss?: boolean;
   isRootProvider?: boolean;
   renderIsRoot?: React.ReactElement;
}

createTheme("light", { colors: lightColorPallete })
createTheme("dark", { colors: darkColorPallete })

const ThemeProvider = ({ children, theme, applyScrollbarCss, isRootProvider, renderIsRoot, ...props }: ThemeProviderProps) => {

   const THEME = ThemeFactory.get(theme) as ThemeOptions
   if (!THEME) throw new Error(`Invalid theme name provided: ${theme}`)
   applyScrollbarCss ??= true

   React.useMemo(() => {
      const root_cls = `.xui-${theme}-theme-root`
      let gkeys = Object.keys(THEME.globalStyle || {})
      let gstyles: any = {}
      gkeys.forEach((key) => {
         gstyles[`${root_cls} ${key}`] = THEME.globalStyle[key as any]
      })

      css({
         "@global": {
            ...gstyles,
            [root_cls]: ThemeCssVars(THEME)
         }
      })

      applyScrollbarCss && useScrollbar(theme, root_cls)

      css({
         "@global": {
            "*": {
               m: 0,
               p: 0,
               outline: "none",
               boxSizing: "border-box",
               verticalAlign: "baseline",
            },
            "html, body": {
               minHeight: "100%",
               "-webkit-font-smoothing": "antialiased"
            } as any,
            "img, picture, video, canvas, svg": {
               maxWidth: "100%",
               display: "block"
            },
            "input, button, textarea, select": {
               font: "inherit"
            },
            "table": {
               borderCollapse: "collapse",
               borderSpacing: 0
            },
            "ol, ul": {
               listStyle: "none"
            },
            "a": {
               display: "inline-block"
            },
            "p, h1, h2, h3, h4, h5, h6": {
               overflowWrap: "break-word",
            }
         }
      })
   }, [theme])

   return (
      <ThemeContex.Provider value={theme}>
         {
            isRootProvider ? <BreakpointProvider>
               <Tag
                  minHeight="100%"
                  bgcolor={THEME.colors.background.primary}
                  fontFamily={THEME.typography.fontFamily}
                  fontSize={THEME.typography.text.fontSize}
                  fontWeight={THEME.typography.text.fontWeight}
                  lineHeight={THEME.typography.text.lineHeight}
                  {...props}
                  baseClass={`${theme}-theme-root`}
                  direction={THEME.rtl ? "rtl" : "ltr"}
               >
                  {children}
                  {renderIsRoot}
               </Tag>
            </BreakpointProvider> : <Tag
               minHeight="100%"
               bgcolor={THEME.colors.background.primary}
               fontFamily={THEME.typography.fontFamily}
               fontSize={THEME.typography.text.fontSize}
               fontWeight={THEME.typography.text.fontWeight}
               lineHeight={THEME.typography.text.lineHeight}
               {...props}
               baseClass={`${theme}-theme-root`}
               direction={THEME.rtl ? "rtl" : "ltr"}
            >
               {children}
            </Tag>
         }
      </ThemeContex.Provider>
   )
}

export default ThemeProvider