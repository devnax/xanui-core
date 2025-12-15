import { ThemeOptions, ThemeOptionInput } from "./types"
import { darkColorPallete, lightThemeOptions } from './ThemeDefaultOptions'
import { mergeObject, ThemeFactory } from "./core"
import createColor from "./createColor"
import { breakpoints } from "../css"

export const createTheme = (name: string, options: ThemeOptionInput, darkMode?: boolean): ThemeOptions => {
   if (ThemeFactory.has(name)) {
      console.error(`createTheme: The theme '${name}' is already defined. Please choose a different name for the theme.`)
      return ThemeFactory.get(name) as ThemeOptions
   }

   let theme: any = mergeObject(lightThemeOptions, {
      ...(darkMode ? darkColorPallete : {}),
      ...options,
      name,
      breakpoints: breakpoints
   })

   theme = mergeObject(theme, {
      colors: {
         background: createColor(theme, "background"),
         brand: createColor(theme, "brand"),
         accent: createColor(theme, "accent"),
         info: createColor(theme, "info"),
         success: createColor(theme, "success"),
         warning: createColor(theme, "warning"),
         danger: createColor(theme, "danger")
      }
   })

   ThemeFactory.set(name, theme)

   return theme as ThemeOptions
}
