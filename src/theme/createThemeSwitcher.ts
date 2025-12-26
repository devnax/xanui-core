import { createBucket, xv } from "react-state-bucket"
import { getTheme } from "./core"
import { BucketOptions } from "react-state-bucket"

export type ThemeSwitcherOption = {
   store?: BucketOptions['store'],
   onChange?: (theme: string) => void
}

const createThemeSwitcher = (defaultTheme: string, option?: ThemeSwitcherOption) => {

   const useThemeState = createBucket({ name: xv.string().default(defaultTheme) }, {
      store: option?.store || "memory",
      onChange: (_key, value) => {
         option?.onChange && option?.onChange(value)
      }
   })

   const useThemeSwitcher = () => {
      const state = useThemeState()
      return {
         name: state.name,
         theme: getTheme(state.name),
         change: (theme: string) => state.name = theme
      }
   }
   return useThemeSwitcher
}

export default createThemeSwitcher