"use client"
import { createTheme } from "./createTheme"
import ThemeProvider from './ThemeProvider'
import { getTheme, useTheme } from './core'
import { lightThemeOptions, darkThemeOptions } from './ThemeDefaultOptions'
export type { ThemeProviderProps } from './ThemeProvider'

export const themeRootClass = (theme: string) => `.xui-${theme}-theme-root`

export {
    ThemeProvider,
    createTheme,
    getTheme,
    useTheme,
    lightThemeOptions,
    darkThemeOptions
}

