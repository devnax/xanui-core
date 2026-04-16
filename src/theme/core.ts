"use client"
import React, { useContext } from "react"
import { ObjectType, ThemeOptions, ThemeOptionInput } from "./types"
import { breakpoints } from "../css"
import { darkThemeOptions, lightThemeOptions } from "./ThemeDefaultOptions"
import { createPalette } from "./oklch"

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


export const createTheme = (options: ThemeOptionInput): ThemeOptions => {
   let mode = options?.mode ?? "light"
   const defaultOptions = mode === 'dark' ? darkThemeOptions : lightThemeOptions

   for (let key in options?.colors) {
      const color = (options as any)?.colors[key] as any
      if (typeof color === "string") {
         (options as any).colors[key] = createPalette(color)
      } else {
         const main = color.main
         if (main) {
            const pallate = createPalette(main);
            (options as any).colors[key] = {
               ...pallate,
               ...(options as any).colors[key],
               main: pallate.main
            }
         }
      }
   }

   let theme: any = mergeObject(defaultOptions, {
      name: mode === "dark" ? "default-dark" : "default-light",
      ...options,
      breakpoints: breakpoints
   })

   return theme as ThemeOptions
}

export type ThemeCntextProps = {
   theme: ThemeOptions,
   onChange: (theme: ThemeOptions) => void
}

export const ThemeContex = React.createContext<ThemeCntextProps>({
   theme: createTheme({
      name: "default-light"
   }),
   onChange(theme) { },
})

export const useTheme = () => {
   const ctx = useContext(ThemeContex)
   const theme = ctx.theme
   theme.change = (theme: ThemeOptionInput) => ctx.onChange(createTheme(theme))
   return theme
}

