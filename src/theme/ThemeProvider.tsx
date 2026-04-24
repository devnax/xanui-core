"use client";
import * as React from "react"
import { ThemeOptionInput, ThemeOptions } from "./types"
import Tag from "../Tag"
import { TagComponentType, TagProps } from "../Tag/types"
import { createTheme, ThemeContex } from "./core"
import ThemeCssVars from "./ThemeCssVars"
import { css } from "../css"
import ServerStyleTag from "../Tag/ServerStyleTag"
import { useDocument } from "../Document";
import { themeRootClass } from ".";
import { useCSSCacheId } from "../css/CSSCacheProvider";

export type ThemeProviderProps<T extends TagComponentType = 'div'> = TagProps<T> & {
   theme: ThemeOptionInput;
   onThemeChange?: (theme: ThemeOptions) => void
   isRoot?: boolean;
   noScrollbarCss?: boolean;
   scrollbar?: {
      size?: number;
      thumbColor?: string;
      trackColor?: string;
   }
}

const ThemeProvider = <T extends TagComponentType = 'div'>({ children, theme: THEME, scrollbar, onThemeChange, isRoot, noScrollbarCss, ...props }: ThemeProviderProps<T>) => {
   const doc = useDocument()
   const cacheId = useCSSCacheId()

   const theme = React.useMemo(() => createTheme(THEME), [THEME])

   const themeGlobalStyle: any = React.useMemo(() => {
      const root_cls = `.xui-${theme.name}-theme-root`
      let gkeys = Object.keys(theme.globalStyle || {})
      let gstyles: any = {}
      gkeys.forEach((key) => {
         gstyles[`${root_cls} ${key}`] = theme.globalStyle[key as any]
      })

      return css({
         "@global": {
            ...gstyles,
            [root_cls]: ThemeCssVars(theme)
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
      const cls = (cls: string) => `${themeRootClass(theme.name)} ${cls}`
      let thumbSize = scrollbar?.size ?? 7
      let thumbColor = scrollbar?.thumbColor ?? "var(--color-surface-muted)"
      let trackColor = scrollbar?.trackColor ?? "var(--color-surface-divider)"

      return css({
         "@global": {
            [cls('*::-webkit-scrollbar')]: {
               width: thumbSize,
               height: thumbSize,
            },
            [cls("*::-webkit-scrollbar-thumb")]: {
               backgroundColor: thumbColor,
               borderRadius: "6px",
            },
            [cls("*::-webkit-scrollbar-thumb:hover")]: {
               backgroundColor: thumbColor,
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
      <ThemeContex.Provider
         value={{
            theme,
            onChange: (t) => {
               onThemeChange && onThemeChange(t)
            }
         }}
      >
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
            bgcolor="surface.main"
            color="surface.contrast"
            fontSize="text"
            fontWeight="text"
            lineHeight="text"
            fontFamily={`system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`}
            {...props}
            sxr={{
               "& a": {
                  color: "primary.main",
               },
            }}
            baseClass={`${theme.name}-theme-root`}
            direction={theme.rtl ? "rtl" : "ltr"}
         >
            {children}
         </Tag>
      </ThemeContex.Provider>
   )
}

export default ThemeProvider