import { useContext } from "react";
import { BreakpointCtx } from "./BreakpointProvider";
import { breakpoints } from "../css";
import { BreakpointKeys } from "../css/types";

const keys = Object.keys(breakpoints) as BreakpointKeys[];

const useBreakpoint = () => {
   const value = useContext(BreakpointCtx) as BreakpointKeys
   const index = keys.indexOf(value);

   const is = (key: BreakpointKeys) => value === key;
   const isUp = (key: BreakpointKeys) => index >= keys.indexOf(key);
   const isDown = (key: BreakpointKeys) => index < keys.indexOf(key);
   const isBetween = (start: BreakpointKeys, end: BreakpointKeys) =>
      index >= keys.indexOf(start) && index < keys.indexOf(end);
   const isOrUp = (k: BreakpointKeys) => isUp(k) || is(k);
   const isOrDown = (k: BreakpointKeys) => isDown(k) || is(k);

   return {
      value,
      is,
      isUp,
      isDown,
      isBetween,
      isOrUp,
      isOrDown
   };
};

export default useBreakpoint;