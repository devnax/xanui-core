"use client";
import * as React from "react"
import { ThemeOptions } from "./types"
import Tag from "../Tag"
import { TagComponentType, TagProps } from "../Tag/types"
import { ThemeContex, ThemeFactory } from "./core"
import ThemeCssVars from "./ThemeCssVars"
import { css } from "../css"
import { createDefaultThemes } from "./ThemeDefaultOptions"
import ServerStyleTag from "../Tag/ServerStyleTag"
import { useDocument } from "../Document";
import { themeRootClass } from ".";
import { useCSSCacheId } from "../css/CSSCacheProvider";

export type ThemeProviderProps<T extends TagComponentType = 'div'> = TagProps<T> & {
   theme: string;
   isRoot?: boolean;
   noScrollbarCss?: boolean;
}

createDefaultThemes()

const ThemeProvider = <T extends TagComponentType = 'div'>({ children, theme, isRoot, noScrollbarCss, ...props }: ThemeProviderProps<T>) => {
   let THEME = ThemeFactory.get(theme) as ThemeOptions
   if (!THEME) {
      console.error(`ThemeProvider: The theme '${theme}' is not defined. Please make sure to use a valid theme name.`)
      THEME = ThemeFactory.get("light") as ThemeOptions
   }
   const doc = useDocument()
   const cacheId = useCSSCacheId()

   const themeGlobalStyle: any = React.useMemo(() => {
      const root_cls = `.xui-${theme}-theme-root`
      let gkeys = Object.keys(THEME.globalStyle || {})
      let gstyles: any = {}
      gkeys.forEach((key) => {
         gstyles[`${root_cls} ${key}`] = THEME.globalStyle[key as any]
      })

      return css({
         "@global": {
            ...gstyles,
            [root_cls]: ThemeCssVars(THEME)
         }
      }, {
         injectStyle: typeof window !== 'undefined',
         container: doc?.document,
         cacheId
      })
   }, [theme, doc])

   const resetCss = React.useMemo(() => {
      if (!isRoot) return
      return css({
         "@global": {
            "*": {
               m: 0,
               p: 0,
               outline: "none",
               boxSizing: "border-box",
               verticalAlign: "baseline",
            },
            "html, body": {
               height: "100%",
               "-webkit-font-smoothing": "antialiased",
               "-moz-osx-font-smoothing": "grayscale",
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
               borderSpacing: 0,
            },
            "ol, ul": {
               listStyle: "none",
               padding: 0,
               margin: 0,
            },
            "a": {
               display: "inline-block",
               color: "inherit",
               textDecoration: "none",
               cursor: "pointer",
               "&:hover": {
                  textDecoration: "underline"
               }
            },
            "p, h1, h2, h3, h4, h5, h6": {
               overflowWrap: "break-word",
            },
         }
      }, {
         injectStyle: typeof window !== 'undefined',
         container: doc?.document,
         cacheId
      })
   }, [])

   const scrollbarCss: any = React.useMemo(() => {
      if (noScrollbarCss) return;
      const cls = (cls: string) => `${themeRootClass(theme)} ${cls}`
      let thumbSize = 6
      let thumbColor = "var(--color-text-secondary)"
      let trackColor = "transparent"

      return css({
         "@global": {
            [cls('*::-webkit-scrollbar')]: {
               width: thumbSize,
               height: thumbSize,
            },
            [cls("*::-webkit-scrollbar-thumb")]: {
               backgroundColor: thumbColor,
               borderRadius: "6px",
               opacity: 0.6,
            },
            [cls("*::-webkit-scrollbar-thumb:hover")]: {
               backgroundColor: thumbColor,
               opacity: 0.0,
            },
            [cls("*::-webkit-scrollbar-track")]: {
               backgroundColor: trackColor,
               borderRadius: "6px",
            },
         }
      }, {
         injectStyle: typeof window !== 'undefined',
         container: doc?.document,
         cacheId
      }) as any
   }, [noScrollbarCss, theme])

   return (
      <ThemeContex.Provider value={theme}>
         {
            isRoot && <>
               <ServerStyleTag factory={resetCss as any} />
               {
                  !noScrollbarCss && <ServerStyleTag factory={scrollbarCss} />
               }
            </>
         }
         <ServerStyleTag factory={themeGlobalStyle} />
         <Tag
            minHeight="100%"
            bgcolor="background.primary"
            color="text.primary"
            fontSize="text"
            fontWeight="text"
            lineHeight="text"
            fontFamily={`system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`}
            {...props}
            sxr={{
               "& a": {
                  color: "brand.primary",
               },
            }}
            baseClass={`${theme}-theme-root`}
            direction={THEME.rtl ? "rtl" : "ltr"}
         >
            {children}
         </Tag>
      </ThemeContex.Provider>
   )
}

export default ThemeProvider