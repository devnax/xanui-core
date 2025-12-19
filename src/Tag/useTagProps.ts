import { TagComponentType, TagProps, TagPropsRoot } from './types';
import cssPropList from './cssPropList';
import { css } from '../css';
import { classNames } from 'pretty-class';
import { CSSFactoryType } from 'oncss';

export type useTagPropsReturn<T extends TagComponentType = "div"> = {
   props: TagProps<T>,
   style: CSSFactoryType
}

const useTagProps = <T extends TagComponentType = "div">({ baseClass, classNames: clses, sx, sxr, style, hover, ...props }: TagPropsRoot<T>): useTagPropsReturn<T> => {
   const _css: any = {
      ...(sxr || {}),
      ...props,
      ...(sx || {}),
      ...(style || {}),
   }

   if (hover) {
      _css['&:hover'] = { ...(_css['&:hover'] || {}), ...hover }
   }

   const styles = css(_css, {
      skipProps: (prop, _val, dept): any => dept === 1 && !cssPropList[prop],
      injectStyle: typeof window !== 'undefined',
   })

   let skipProps = styles.skiped[styles.classname as any] || []
   const _props: any = {};
   for (let prop of skipProps) {
      _props[prop] = (props as any)[prop]
   }
   _props.className = classNames([
      baseClass ? "xui-" + baseClass : "",
      styles.classname,
      props.className,
      ...(clses as any || []),
   ])
   return { props: _props, style: styles };
}


export default useTagProps