import { useContext } from "react"
import { BreakpointCtx } from "./BreakpointProvider"
import { breakpoints } from "../css"
import { BreakpointKeys } from "../css/types"
import { useDocument } from "../Document"

const useBreakpoint = () => {
   const value = useContext(BreakpointCtx)
   const doc = useDocument()
   const getWidth = () => {
      if (!doc) return 99999
      return doc.document.documentElement.clientWidth
   }

   const is = (key: BreakpointKeys) => value === key
   const isUp = (key: BreakpointKeys) => {
      return !is(key) && getWidth() > breakpoints[key]
   }
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
