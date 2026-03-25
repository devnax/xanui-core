"use client"
import React, { useContext } from "react"
import { ObjectType, ThemeOptions, ThemeOptionInput, ThemeOptionsColor } from "./types"
import { alpha, breakpoints } from "../css"
import { darkThemeOptions, lightThemeOptions } from "./ThemeDefaultOptions"

export const mergeObject = (a: ObjectType, b: ObjectType) => {
   a = { ...a }
   b = { ...b }
   for (const key in b) {
      const v = (b as any)[key]
      if (typeof v === 'object' && !Array.isArray(v) && !React.isValidElement(v)) {
         a[key] = mergeObject(a[key], b[key])
      } else {
         a[key] = v
      }
   }
   return a
}


export const createTheme = (name: string, options: ThemeOptionInput, mode: "light" | "dark" = "light"): ThemeOptions => {
   const defaultOptions = mode === 'light' ? lightThemeOptions : darkThemeOptions
   let theme: any = mergeObject(defaultOptions, {
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

   return theme as ThemeOptions
}

export type ThemeCntextProps = {
   theme: ThemeOptions,
   onChange: (theme: ThemeOptions) => void
}

export const ThemeContex = React.createContext<ThemeCntextProps>({
   theme: createTheme("light", {}),
   onChange(theme) { },
})

export const useTheme = () => {
   const ctx = useContext(ThemeContex)
   const theme = ctx.theme
   theme.change = (theme: ThemeOptions) => ctx.onChange(theme)
   return theme
}

