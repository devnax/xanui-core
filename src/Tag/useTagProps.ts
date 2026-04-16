"use client"
import { useMemo } from "react";
import { TagComponentType, TagProps, TagPropsRoot } from "./types";
import cssPropList from "./cssPropList";
import { css } from "../css";
import { classNames } from "pretty-class";
import { CSSFactoryType } from "oncss";
import { useDocument } from "../Document";
import { useCSSCacheId } from "../css/CSSCacheProvider";
import ThemeCssVars from "../theme/ThemeCssVars";
import { createTheme } from "../theme";

export type useTagPropsReturn<T extends TagComponentType = "div"> = {
   props: TagProps<T>;
   style: CSSFactoryType;
   themeStyle?: CSSFactoryType;
};

const useTagProps = <T extends TagComponentType = "div">(props: TagPropsRoot<T>): useTagPropsReturn<T> => {
   const doc = useDocument();
   const cacheId = useCSSCacheId();

   // Extract known styling-related props
   const {
      sx,
      sxr,
      style,
      hover,
      className,
      classNames: clsNames,
      baseClass,
      theme,
      ...rest
   } = props;

   /**
    * Split DOM props vs CSS props
    */
   const { domProps, cssProps } = useMemo(() => {
      const _dom: any = {};
      const _css: any = {};

      for (const key in rest) {
         const val = (rest as any)[key];
         if (cssPropList[key]) {
            _css[key] = val;
         } else {
            _dom[key] = val;
         }
      }

      return { domProps: _dom, cssProps: _css };
   }, [rest]);

   /**
    * Generate styles
    */
   const { styles, themeStyle } = useMemo(() => {
      const hoverStyles =
         hover && Object.keys(hover).length > 0
            ? { "&:hover": hover }
            : undefined;

      const cls = css(
         {
            ...sxr,
            ...cssProps,
            ...sx,
            ...style,
            ...hoverStyles,
         },
         {
            injectStyle: typeof window !== "undefined",
            container: doc?.document,
            cacheId,
         }
      );

      let themeStyle
      if (theme) {
         themeStyle = css({
            "@global": {
               [`.${cls.classname}`]: ThemeCssVars(createTheme(theme) as any)
            }
         },
            {
               injectStyle: typeof window !== "undefined",
               container: doc?.document,
               cacheId,
            }
         );
      }

      return { styles: cls, themeStyle }
   }, [sx, sxr, style, hover, cssProps, doc, cacheId, theme]);


   /**
    * Compose className
    */
   const finalClassName = useMemo(() => {
      return classNames(
         baseClass ? "xui-" + baseClass : undefined,
         clsNames,
         className,
         styles.classname
      );
   }, [baseClass, clsNames, className, styles.classname]);

   /**
    * Final props
    */
   const finalProps = useMemo(() => {
      return {
         ...domProps,
         className: finalClassName,
      };
   }, [domProps, finalClassName]);

   return {
      props: finalProps,
      style: styles,
      themeStyle
   };
};

export default useTagProps;