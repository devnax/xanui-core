import { ThemeOptions, ThemeOptionInput } from "./types"
import { mergeObject, ThemeFactory } from "./core"
import { breakpoints } from "../css"
import { lightThemeOptions } from "./ThemeDefaultOptions"
import createColorScale from "./createColorScale"

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

   // create color scales if needed
   for (let key in theme.colors) {
      const color = theme.colors[key]
      if (typeof color === "string") {
         theme.colors[key] = createColorScale(color)
         delete theme.colors[key].mode
      } else {
         const c = createColorScale(color.base)
         delete (c as any).mode
         theme.colors[key] = {
            ...c,
            ...theme.colors[key],
         }
      }
   }

   const c = createColorScale(theme.colors.common.base)
   theme.isDark = c.mode === "black"

   ThemeFactory.set(name, theme)

   return theme as ThemeOptions
}
