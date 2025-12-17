import { TagComponentType, TagProps, TagPropsRoot } from './types';
import cssPropList from './cssPropList';
import { css } from '../css';
import { classNames } from 'pretty-class';
import { CSSFactoryType } from 'oncss';

export type useTagPropsReturn<T extends TagComponentType = "div"> = {
   props: TagProps<T>,
   style: CSSFactoryType
}

const useTagProps = <T extends TagComponentType = "div">({ baseClass, classNames: clses, ...props }: TagPropsRoot<T>): useTagPropsReturn<T> => {

   if ('hover' in props) {
      (props as any)['&:hover'] = props['hover'];
      delete (props as any)['hover'];
   }

   const style = css(props, {
      skipProps: (prop, _val, dept): any => dept === 1 && !cssPropList[prop],
      injectStyle: typeof window !== 'undefined',
   })

   let skipProps = style.skiped[style.classname as any] || []
   const _props: any = {};
   for (let prop of skipProps) {
      _props[prop] = (props as any)[prop]
   }
   _props.className = classNames([
      baseClass ? "xui-" + baseClass : "",
      style.classname,
      props.className,
      ...(clses as any || []),
   ])
   return { props: _props, style };
}


export default useTagProps