import { lightColorPallete, darkColorPallete } from './ThemeDefaultOptions'
import { createTheme } from "./createTheme"
import ThemeProvider from './ThemeProvider'
import createThemeSwitcher from './createThemeSwitcher'
import { getTheme, useTheme } from './core'

export {
    ThemeProvider,
    createThemeSwitcher,
    getTheme,
    useTheme
}

createTheme("light", { colors: lightColorPallete })
createTheme("dark", { colors: darkColorPallete })

