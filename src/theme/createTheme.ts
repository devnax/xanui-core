import { ThemeOptions, ThemeOptionInput } from "./types"
import defaultThemeOption, { darkColorPallete } from './ThemeDefaultOptions'
import { mergeObject, ThemeFactory } from "./core"
import createColor from "./createColor"
import { breakpoints } from "../css"

export const createTheme = (name: string, options: ThemeOptionInput, darkMode?: boolean): ThemeOptions => {
   // const cssopt = css_options()
   if (!ThemeFactory.has(name)) {
      let theme: any = mergeObject(defaultThemeOption, {
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
   } else {
      throw new Error(`theme "${name}" already exists!`);
   }

   return ThemeFactory.get(name) as ThemeOptions
}
