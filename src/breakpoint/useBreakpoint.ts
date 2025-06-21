import { useContext } from "react"
import { BreakpointCtx } from "./BreakpointProvider"
import isWindow from "../isWindow"
import { breakpoints } from "../css"
import { BreakpointKeys } from "../css/types"

const useBreakpoint = () => {
   const val = useContext(BreakpointCtx)
   const isWin = isWindow()
   const o = {
      value: val,
      is: (key: BreakpointKeys) => val === key,
      isDown: (key: BreakpointKeys) => {
         if (isWin) {
            return window.innerWidth > breakpoints[key]
         }
         return false
      },
      isUp: (key: BreakpointKeys) => {
         if (isWin) {
            return window.innerWidth < breakpoints[key]
         }
         return false
      },
      isOrDown: (key: BreakpointKeys) => o.is(key) || o.isDown(key),
      isOrUp: (key: BreakpointKeys) => o.is(key) || o.isUp(key)
   }
   return o
}

export default useBreakpoint
