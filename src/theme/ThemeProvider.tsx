import * as React from "react"
import { ThemeOptions } from "./types"
import Tag from "../Tag"
import { TagComponentType, TagProps } from "../Tag/types"
import { ThemeContex, ThemeFactory } from "./core"
import ThemeCssVars from "./ThemeCssVars"
import { css } from "../css"
import { createTheme } from "./createTheme"
import { darkThemeOptions, lightThemeOptions } from "./ThemeDefaultOptions"

export type ThemeProviderProps<T extends TagComponentType = 'div'> = TagProps<T> & {
   theme: string;
}

createTheme("light", lightThemeOptions)
createTheme("dark", darkThemeOptions)

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
         {
            typeof window === 'undefined' && <style
               precedence={globalStyle.classname}
               href={globalStyle.classname}
               dangerouslySetInnerHTML={{ __html: globalStyle.css }}
            />
         }
         <Tag
            minHeight="100%"
            bgcolor={THEME.colors.common.primary}
            color={THEME.colors.common.text.primary}
            fontSize={THEME.typography.text.fontSize}
            fontWeight={THEME.typography.text.fontWeight}
            lineHeight={THEME.typography.text.lineHeight}
            {...props}
            sxr={{
               "& a": {
                  color: THEME.colors.brand.primary || 'inherit',
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