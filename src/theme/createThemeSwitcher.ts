import { createBucket } from "react-state-bucket"
import { getTheme } from "./core"

const createThemeSwitcher = (defaultTheme: string, store?: "session" | "local") => {
   const useThemeState = createBucket({ name: defaultTheme }, { store })
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