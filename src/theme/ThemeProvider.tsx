import * as React from "react"
import { ThemeOptions } from "./types"
import Tag from "../Tag"
import { TagComponentType, TagProps } from "../Tag/types"
import { ThemeContex, ThemeFactory } from "./core"
import ThemeCssVars from "./ThemeCssVars"
import { css } from "../css"
import { createDefaultThemes } from "./ThemeDefaultOptions"
import ServerStyleTag from "../Tag/ServerStyleTag"

export type ThemeProviderProps<T extends TagComponentType = 'div'> = TagProps<T> & {
   theme: string;
}

createDefaultThemes()

const ThemeProvider = <T extends TagComponentType = 'div'>({ children, theme, ...props }: ThemeProviderProps<T>) => {
   let THEME = ThemeFactory.get(theme) as ThemeOptions
   if (!THEME) {
      console.error(`ThemeProvider: The theme '${theme}' is not defined. Please make sure to use a valid theme name.`)
      THEME = ThemeFactory.get("light") as ThemeOptions
   }

   const globalStyle: any = React.useMemo(() => {
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
         injectStyle: typeof window !== 'undefined'
      })
   }, [theme])

   return (
      <ThemeContex.Provider value={theme}>
         <ServerStyleTag factory={globalStyle} />
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