"use client";
import React, { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
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
}

const AppRoot = React.forwardRef(<T extends TagComponentType = "div">({ children, noScrollbarCss, CSSCacheId, theme, document: _document, ...props }: AppRootProps<T>, ref: React.Ref<any>) => {
   noScrollbarCss ??= false
   _document ??= document
   const docid = useId()

   const csscacheId = useId()
   CSSCacheId ??= csscacheId

   const [visibility, setVisibility] = React.useState<string>("hidden");
   const [doc, setDoc] = useState(_document ??= document)
   const rootRef = useRef(null)
   const mergeRef = useMergeRefs(rootRef, ref)
   // console.log(_document);

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
      <DocumentProvider document={doc} id={docid}>
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
                     <RenderRenderar />
                     {children}
                  </BreakpointProvider>
               </ThemeProvider>
            </AppRootProvider>
         </CSSCacheProvider>
      </DocumentProvider>
   )
})

export default AppRoot

