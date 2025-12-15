import { ThemeOptions, ThemeOptionInput } from "./types"
import { mergeObject, ThemeFactory } from "./core"
import { breakpoints } from "../css"
import { darkThemeOptions, lightThemeOptions } from "./ThemeDefaultOptions"

export const createTheme = (name: string, options: ThemeOptionInput, darkMode?: boolean): ThemeOptions => {
   if (ThemeFactory.has(name)) {
      console.error(`createTheme: The theme '${name}' is already defined. Please choose a different name for the theme.`)
      return ThemeFactory.get(name) as ThemeOptions
   }

   let theme: any = mergeObject(darkMode ? darkThemeOptions : lightThemeOptions, {
      ...options,
      name,
      breakpoints: breakpoints
   })

   ThemeFactory.set(name, theme)

   return theme as ThemeOptions
}
