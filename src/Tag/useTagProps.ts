import { TagComponentType, TagProps, TagPropsRoot } from './types';
import cssPropList from './cssPropList';
import { css } from '../css';
import { classNames } from 'pretty-class';
import { CSSFactoryType } from 'oncss';
import { useMemo } from 'react';

export type useTagPropsReturn<T extends TagComponentType = "div"> = {
   props: TagProps<T>,
   style: CSSFactoryType
}

const useTagProps = <T extends TagComponentType = "div">(props: TagPropsRoot<T>): useTagPropsReturn<T> => {

   const parsed = useMemo(() => {
      let _props: any = {}
      let _css: any = {}
      let clss = []
      for (let key in props) {
         let val = (props as any)[key];
         if (key === "className") {
            clss.push(val)
         } else if (key === 'baseClass') {
            clss.push("xui-" + val)
         } else if (key === 'classNames') {
            clss.push(...val)
         } else if (key === "sx" || key === "sxr" || key === "style") {
            _css = {
               ..._css,
               ...val
            }
         } else if (key === "hover") {
            _css['&:hover'] = { ...(_css['&:hover'] || {}), ...val }
         } else if (!cssPropList[key]) {
            _props[key] = val
         } else {
            _css[key] = val
         }
      }
      const styles = css(_css, {
         injectStyle: typeof window !== 'undefined',
      })

      clss.push(styles.classname)
      return {
         props: _props,
         styles,
         className: classNames(clss)
      }
   }, [JSON.stringify(props)])

   const _props: any = {};
   for (let prop in parsed.props) {
      _props[prop] = (props as any)[prop]
   }
   _props.className = parsed.className;

   return { props: _props, style: parsed.styles };
}


export default useTagProps