import { useContext } from "react"
import { BreakpointCtx } from "./BreakpointProvider"
import { breakpoints } from "../css"
import { BreakpointKeys } from "../css/types"

const useBreakpoint = () => {
   const value = useContext(BreakpointCtx)
   const getWidth = () => typeof window !== 'undefined' ? window.innerWidth : 99999
   const is = (key: BreakpointKeys) => value === key
   const isUp = (key: BreakpointKeys) => getWidth() >= breakpoints[key]
   const isDown = (key: BreakpointKeys) => getWidth() < breakpoints[key]

   return {
      value,
      is,
      isUp,
      isDown,
      isOrUp: (key: BreakpointKeys) => is(key) || isUp(key),
      isOrDown: (key: BreakpointKeys) => is(key) || isDown(key)
   }
}

export default useBreakpoint
