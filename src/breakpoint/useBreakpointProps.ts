import React, { isValidElement } from "react"
import useBreakpoint from "./useBreakpoint"
import { BreakpointKeys } from "../css/types"

export type useBreakpointPropsType<P> = P | {
   [key in BreakpointKeys]?: P
}

const useBreakpoinProps = <P extends object>(props: useBreakpointPropsType<P>): useBreakpointPropsType<P> => {
   const bpoint = useBreakpoint()
   const stringifiedElement = JSON.stringify(props, (key, value) => {
      if (key === '_owner' || key === '_store') {
         return undefined; // Skip circular references
      }
      return value;
   }, 2);

   let format: any = React.useMemo(() => {

      const _format: any = {
         xs: {},
         sm: {},
         md: {},
         lg: {},
         xl: {}
      }
      for (let prop in props) {
         let val = (props as any)[prop]
         if (!isValidElement(val) && typeof val === 'object') {
            for (let breakpoin in val) {
               _format[breakpoin][prop] = (props as any)[prop][breakpoin]
            }
         } else {
            _format.xs[prop] = (props as any)[prop]
         }
      }

      return _format
   }, [stringifiedElement, bpoint.value])

   return React.useMemo(() => {
      let _props = format.xs || {};
      for (let key of ['sm', 'md', 'lg', 'xl']) {
         if (bpoint.isOrDown(key as any)) {
            _props = { ..._props, ...format[key] };
         }
         if (bpoint.is(key as any)) {
            break;
         }
      }
      return _props;
   }, [format, bpoint.value]);
}



export default useBreakpoinProps