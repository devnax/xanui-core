import { createTheme } from "./createTheme"
import ThemeProvider from './ThemeProvider'
import createThemeSwitcher from './createThemeSwitcher'
import { getTheme, useTheme } from './core'
import { lightThemeOptions, darkThemeOptions } from './ThemeDefaultOptions'
export type { ThemeProviderProps } from './ThemeProvider'
export type { ThemeSwitcherOption } from './createThemeSwitcher'

export const themeRootClass = (theme: string) => `.xui-${theme}-theme-root`

export {
    ThemeProvider,
    createThemeSwitcher,
    createTheme,
    getTheme,
    useTheme,
    lightThemeOptions,
    darkThemeOptions
}

