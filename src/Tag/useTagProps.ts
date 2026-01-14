import { TagComponentType, TagProps, TagPropsRoot } from './types';
import cssPropList from './cssPropList';
import { css } from '../css';
import { classNames } from 'pretty-class';
import { CSSFactoryType } from 'oncss';
import { useMemo } from 'react';
import { useDocument } from '../Document';

export type useTagPropsReturn<T extends TagComponentType = "div"> = {
   props: TagProps<T>,
   style: CSSFactoryType
}

const useTagProps = <T extends TagComponentType = "div">(props: TagPropsRoot<T>): useTagPropsReturn<T> => {
   const cachekey = JSON.stringify(props, (key, value) => {
      return key === '_owner' || key === '_store' ? undefined : value;
   }, 2);

   const doc = useDocument();

   const parsed = useMemo(() => {
      let _props: any = {}
      let _css: any = {}

      if (props.hover && Object.keys(props.hover).length > 0) {
         _css['&:hover'] = {
            ...props.hover
         }
      }

      for (let key in props) {
         const keys = ["sx", "sxr", "style", "hover", "className", "classNames", "baseClass"];
         if (keys.includes(key)) {
            continue;
         }
         let val = (props as any)[key];
         if (!cssPropList[key]) {
            _props[key] = val
         } else {
            _css[key] = val
         }
      }

      const styles = css({ ...props.sxr, ..._css, ...props.sx, ...props.style }, {
         injectStyle: typeof doc !== 'undefined',
         container: doc,
      })

      return {
         props: _props,
         styles,
         className: classNames(
            props.baseClass ? "xui-" + props.baseClass : undefined,
            props.classNames,
            props.className,
            styles.classname
         )
      }
   }, [cachekey, doc])

   const _props: any = {};
   for (let prop in parsed.props) {
      _props[prop] = (props as any)[prop]
   }
   _props.className = parsed.className;

   return { props: _props, style: parsed.styles };
}


export default useTagProps