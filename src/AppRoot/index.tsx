"use client";
import React, { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { TagComponentType } from '../Tag/types';
import { ThemeProvider, ThemeProviderProps } from '../theme';
import { BreakpointProvider } from '../breakpoint';
import { RenderRenderar } from './Renderar';
import { DocumentProvider } from '../Document';
import { AppRootProvider } from './AppRootProvider';
import useMergeRefs from '../hooks/useMergeRefs';
import { CSSCacheProvider } from '../css/CSSCacheProvider';

export type AppRootProps<T extends TagComponentType = "div"> = ThemeProviderProps<T> & {
   noScrollbarCss?: boolean;
   document?: Document;
   CSSCacheId?: string;
   disableRenderar?: boolean;
}

const AppRoot = React.forwardRef(<T extends TagComponentType = "div">({ children, noScrollbarCss, CSSCacheId, theme, disableRenderar, document: _document, ...props }: AppRootProps<T>, ref: React.Ref<any>) => {
   noScrollbarCss ??= false
   if (typeof window !== "undefined") {
      _document ??= document
   }
   disableRenderar ??= false
   const docid = useId()
   const csscacheId = useId()
   CSSCacheId ??= csscacheId

   const [visibility, setVisibility] = React.useState<string>("hidden");
   const rootRef = useRef(null)
   const mergeRef = useMergeRefs(rootRef, ref)

   useEffect(() => {
      setVisibility("visible");

      // move oncss style tags to head
      if (typeof _document === 'undefined') return;
      const styles = Array.from(_document.querySelectorAll('body style[data-oncss]'));
      styles.forEach((style) => {
         _document.head.appendChild(style);
      });
   }, [])

   return (
      <DocumentProvider value={_document ? { document: _document, id: docid } : undefined}>
         <CSSCacheProvider cacheId={CSSCacheId}>
            <AppRootProvider element={() => rootRef.current}>
               <ThemeProvider
                  theme={theme}
                  {...props}
                  ref={mergeRef}
                  isRoot
                  sx={{
                     ...props.sx,
                     ...(visibility === "hidden" ? { visibility: "hidden" } : {})
                  }}
               >
                  <BreakpointProvider>
                     {children}
                     {!disableRenderar && <RenderRenderar />}
                  </BreakpointProvider>
               </ThemeProvider>
            </AppRootProvider>
         </CSSCacheProvider>
      </DocumentProvider>
   )
})

export default AppRoot

