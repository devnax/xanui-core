"use client"
import ThemeProvider from './ThemeProvider'
import { useTheme, createTheme } from './core'
import { lightThemeOptions, darkThemeOptions } from './ThemeDefaultOptions'
export type { ThemeProviderProps } from './ThemeProvider'

export const themeRootClass = (theme: string) => `.xui-${theme}-theme-root`

export {
    ThemeProvider,
    createTheme,
    useTheme,
    lightThemeOptions,
    darkThemeOptions
}

