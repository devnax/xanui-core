import * as React from "react"
import { ThemeOptions } from "./types"
import Tag from "../Tag"
import { TagComponentType, TagProps } from "../Tag/types"
import { BreakpointProvider } from "../breakpoint"
import { ThemeContex, ThemeFactory } from "./core"
import ThemeCssVars from "./ThemeCssVars"
import { css } from "../css"

export type ThemeProviderProps<T extends TagComponentType = 'div'> = TagProps<T> & {
   theme: string;
   resetCss?: boolean;
   scrollbarCss?: boolean;
   renderIsRoot?: React.ReactElement;
}

const providers: string[] = []

const ThemeProvider = ({ children, theme, resetCss, scrollbarCss, renderIsRoot, ...props }: ThemeProviderProps) => {
   const id = React.useId()
   const THEME = ThemeFactory.get(theme) as ThemeOptions
   if (!THEME) throw new Error(`Invalid theme name provided: ${theme}`)
   resetCss ??= true
   scrollbarCss ??= true

   React.useMemo(() => {
      if (!!Object.keys(THEME.globalStyle).length) {
         css({
            "@global": THEME.globalStyle
         })
      }

      css({
         "@global": {
            [`.xui-${theme}-theme-root`]: ThemeCssVars(THEME)
         }
      })

      if (scrollbarCss && typeof document !== 'undefined') {
         let thumbSize = 10
         let thumbColor = THEME.colors.divider
         let trackColor = THEME.colors.background.secondary
         css({
            "@global": {
               "*": {
                  scrollbarWidth: "thin",
                  scrollbarColor: `${thumbColor} ${trackColor}`,
               },
               "::-webkit-scrollbar": {
                  width: thumbSize,
                  height: thumbSize,
               },
               "::-webkit-scrollbar-thumb": {
                  backgroundColor: thumbColor,
                  borderRadius: "5px",
                  border: "2px solid #f4f4f4",
               },
               "::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: thumbColor,
               },
               "::-webkit-scrollbar-track": {
                  backgroundColor: trackColor,
                  borderRadius: "5px",
               },
            }
         })
      }

      resetCss && css({
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

   React.useMemo(() => {
      providers.push(id)
   }, [])

   React.useEffect(() => {
      return () => {
         providers.splice(providers.indexOf(id), 1)
      }
   }, [])

   const isRoot = id === providers[0]

   let content = (
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
      </Tag>
   )

   return (
      <ThemeContex.Provider value={theme}>
         {
            isRoot ? <BreakpointProvider>
               {content}
               {renderIsRoot}
            </BreakpointProvider> : content
         }
      </ThemeContex.Provider>
   )
}


export default ThemeProvider