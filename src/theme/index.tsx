import { lightColorPallete, darkColorPallete } from './ThemeDefaultOptions'
import { createTheme } from "./createTheme"
import ThemeProvider from './ThemeProvider'
import createThemeSwitcher from './createThemeSwitcher'
import { getTheme, useTheme } from './core'
export type { ThemeProviderProps } from './ThemeProvider'

createTheme("light", { colors: lightColorPallete })
createTheme("dark", { colors: darkColorPallete })

export {
    ThemeProvider,
    createThemeSwitcher,
    createTheme,
    getTheme,
    useTheme
}

