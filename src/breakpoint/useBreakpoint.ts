import { useContext } from "react";
import { BreakpointCtx } from "./BreakpointProvider";
import { breakpoints } from "../css";
import { BreakpointKeys } from "../css/types";

const keys = Object.keys(breakpoints) as BreakpointKeys[];

const useBreakpoint = () => {
   const value = useContext(BreakpointCtx);
   const index = keys.indexOf(value);

   const is = (key: BreakpointKeys) => value === key;
   const isUp = (key: BreakpointKeys) => index >= keys.indexOf(key);
   const isDown = (key: BreakpointKeys) => index < keys.indexOf(key);
   const isBetween = (start: BreakpointKeys, end: BreakpointKeys) =>
      index >= keys.indexOf(start) && index < keys.indexOf(end);

   return {
      value,
      is,
      isUp,
      isDown,
      isBetween
   };
};

export default useBreakpoint;