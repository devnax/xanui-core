import { useContext } from "react"
import { BreakpointCtx } from "./BreakpointProvider"
import isWindow from "../isWindow"
import { breakpoints } from "../css"
import { BreakpointKeys } from "../css/types"

const useBreakpoint = () => {
   const val = useContext(BreakpointCtx)
   const isWin = isWindow()
   const bp = {
      value: val,
      is: (key: BreakpointKeys) => val === key,
      isDown: (key: BreakpointKeys) => isWin && window.innerWidth < breakpoints[key],
      isUp: (key: BreakpointKeys) => isWin && window.innerWidth > breakpoints[key],
      isOrDown: (key: BreakpointKeys) => bp.is(key) || bp.isDown(key),
      isOrUp: (key: BreakpointKeys) => bp.is(key) || bp.isUp(key)
   }
   return bp
}

export default useBreakpoint
