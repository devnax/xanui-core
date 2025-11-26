import { createBucket } from "react-state-bucket"
import { getTheme } from "./core"

export type ThemeSwitcherOption = {
   store: "memory" | "session" | "local",
   onChange: (theme: string) => void
}

const createThemeSwitcher = (defaultTheme: string, option?: ThemeSwitcherOption) => {

   const useThemeState = createBucket({ name: defaultTheme }, {
      store: option?.store || "memory",
      onChange: (key, value) => {
         option?.onChange(value)
      }
   })

   const useThemeSwitcher = () => {
      const state = useThemeState()
      return {
         name: state.get("name"),
         theme: getTheme(state.get("name")),
         change: (theme: string) => state.set("name", theme)
      }
   }
   return useThemeSwitcher
}


export default createThemeSwitcher