import { isValidElement, useMemo } from "react"
import useBreakpoint from "./useBreakpoint"
import { BreakpointKeys } from "../css/types"

export type useBreakpointPropsType<P> = P | {
   [key in BreakpointKeys]?: P
}

const useBreakpointProps = <P extends object>(props: useBreakpointPropsType<P>): useBreakpointPropsType<P> => {
   const bpoint = useBreakpoint()
   const cachekey = JSON.stringify(props, (key, value) => {
      return key === '_owner' || key === '_store' ? undefined : value;
   }, 2);

   const bprops = useMemo(() => {
      let bprops: any = []
      let bkeys = ['xs', 'sm', 'md', 'lg', 'xl']

      for (let prop in props) {
         let val = (props as any)[prop]
         if (!isValidElement(val) && typeof val === 'object' && val !== null && Object.keys(val).some(k => bkeys.includes(k))) {
            bprops.push(prop)
         }
      }
      return bprops
   }, [cachekey]);


   if (bprops.length === 0) return props;

   const format: any = {
      xs: {},
      sm: {},
      md: {},
      lg: {},
      xl: {}
   }

   for (let prop of bprops) {
      let val = (props as any)[prop]
      for (let bp in val) {
         format[bp][prop] = val[bp]
      }
   }

   let _props = format.xs || {};
   for (let key of ['sm', 'md', 'lg', 'xl']) {
      if (bpoint.isDown(key as any)) break;
      if (bpoint.isOrUp(key as any)) {
         _props = { ..._props, ...format[key] };
      }
   }
   return _props;
}



export default useBreakpointProps