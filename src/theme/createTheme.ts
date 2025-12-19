import { ThemeOptions, ThemeOptionInput, ThemeOptionsColor } from "./types"
import { mergeObject, ThemeFactory } from "./core"
import { alpha, breakpoints } from "../css"
import { lightThemeOptions } from "./ThemeDefaultOptions"

export const createTheme = (name: string, options: ThemeOptionInput): ThemeOptions => {
   if (ThemeFactory.has(name)) {
      console.error(`createTheme: The theme '${name}' is already defined. Please choose a different name for the theme.`)
      return ThemeFactory.get(name) as ThemeOptions
   }

   let theme: any = mergeObject(lightThemeOptions, {
      ...options,
      name,
      breakpoints: breakpoints
   })

   // add alpha colors
   for (let color in theme.colors) {
      const c = theme.colors[color] as ThemeOptionsColor
      const is_common = color === 'divider' || color === 'background' || color === 'text'
      c.soft = {
         primary: is_common ? alpha(c.primary, 0.60) : alpha(c.primary, 0.08),
         secondary: is_common ? alpha(c.primary, 0.90) : alpha(c.primary, 0.12)
      }
   }

   ThemeFactory.set(name, theme)

   return theme as ThemeOptions
}
