import React from "react"
import { ObjectType, ThemeOptions } from "./types"

export const ThemeFactory = new Map<string, ThemeOptions>()
export const ThemeContex = React.createContext("light")
export const getTheme = (theme: string) => ThemeFactory.get(theme)
export const useTheme = (): ThemeOptions => ThemeFactory.get(React.useContext(ThemeContex)) as any

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
