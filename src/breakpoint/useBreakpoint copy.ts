import { useContext } from "react";
import { BreakpointCtx } from "./BreakpointProvider";
import { breakpoints } from "../css";
import { BreakpointKeys } from "../css/types";

const useBreakpoint = () => {
   const { key: value, width } = useContext(BreakpointCtx);

   const is = (k: BreakpointKeys) => value === k;
   const isUp = (k: BreakpointKeys) => width >= breakpoints[k];
   const isDown = (k: BreakpointKeys) => width < breakpoints[k];
   const isOrUp = (k: BreakpointKeys) => isUp(k) || is(k);
   const isOrDown = (k: BreakpointKeys) => isDown(k) || is(k);
   const isBetween = (start: BreakpointKeys, end: BreakpointKeys) =>
      width >= breakpoints[start] && width < breakpoints[end];

   return {
      value,   // current breakpoint key
      width,   // current width
      is,
      isUp,
      isDown,
      isOrUp,
      isOrDown,
      isBetween
   };
};

export default useBreakpoint;