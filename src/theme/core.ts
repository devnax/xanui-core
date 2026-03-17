import React, { useContext } from "react"
import { ObjectType, ThemeOptions } from "./types"

export type ThemeCntextProps = {
   theme: string,
   onChange: (theme: string) => void
}
export const ThemeFactory = new Map<string, ThemeOptions>()
export const ThemeContex = React.createContext<ThemeCntextProps>({
   theme: "light",
   onChange: () => { }
})
export const getTheme = (theme: string) => ThemeFactory.get(theme)

export type UseThemeOptions = ThemeOptions & { change: (theme: string) => void }
export const useTheme = (): UseThemeOptions => {
   const ctx = useContext(ThemeContex)
   const theme = ThemeFactory.get(ctx?.theme) as any
   if (!theme) {
      console.error("Theme not found, returning light theme as fallback")
      return ThemeFactory.get("light") as any
   }

   theme.change = (theme: string) => {
      ctx.onChange(theme)
   }
   return theme as UseThemeOptions
}

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
