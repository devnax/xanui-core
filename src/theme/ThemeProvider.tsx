import * as React from "react"
import { ThemeOptions } from "./types"
import Tag from "../Tag"
import { TagComponentType, TagProps } from "../Tag/types"
import { ThemeContex, ThemeFactory } from "./core"
import ThemeCssVars from "./ThemeCssVars"
import { css } from "../css"

export type ThemeProviderProps<T extends TagComponentType = 'div'> = TagProps<T> & {
   theme: string;
}


const ThemeProvider = <T extends TagComponentType = 'div'>({ children, theme, ...props }: ThemeProviderProps<T>) => {

   const THEME = ThemeFactory.get(theme) as ThemeOptions
   if (!THEME) throw new Error(`Invalid theme name provided: ${theme}`)

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
   }, [theme])

   return (
      <ThemeContex.Provider value={theme}>
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
      </ThemeContex.Provider>
   )
}

export default ThemeProvider