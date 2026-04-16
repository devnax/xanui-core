"use client";
import React, { useEffect, useId, useLayoutEffect, useRef } from 'react';
import { TagComponentType } from '../Tag/types';
import { ThemeProvider, ThemeProviderProps } from '../theme';
import { BreakpointProvider } from '../breakpoint';
import { RenderRenderar } from './Renderar';
import { DocumentProvider } from '../Document';
import { AppRootProvider } from './AppRootProvider';
import useMergeRefs from '../hooks/useMergeRefs';
import { CSSCacheProvider } from '../css/CSSCacheProvider';
import { BreakpointKeys } from '../css/types';
import Cookie from '../cookie';
import { ThemeColorKeys } from '../theme/types';

export type AppRootProps<T extends TagComponentType = "div"> = ThemeProviderProps<T> & {
   noScrollbarCss?: boolean;
   document?: Document;
   CSSCacheId?: string;
   disableRenderar?: boolean;
   defaultBreakpoint?: BreakpointKeys
   selectionColor?: ThemeColorKeys
}

const AppRoot = React.forwardRef(<T extends TagComponentType = "div">({ children, defaultBreakpoint, noScrollbarCss, CSSCacheId, theme, onThemeChange, disableRenderar, selectionColor, document: _document, ...props }: AppRootProps<T>, ref: React.Ref<any>) => {

   noScrollbarCss ??= false
   selectionColor ??= "primary"
   if (typeof window !== "undefined") {
      _document ??= document
   }
   disableRenderar ??= false
   const docid = useId()
   const csscacheId = useId()
   CSSCacheId ??= csscacheId

   const [visibility, setVisibility] = React.useState<string>(!defaultBreakpoint ? "hidden" : "");
   const rootRef = useRef(null)
   const mergeRef = useMergeRefs(rootRef, ref)

   useLayoutEffect(() => {
      !defaultBreakpoint && setVisibility("");
   }, [])

   useEffect(() => {
      if (typeof _document === 'undefined') return;
      if (!Cookie.exists("xuitm") && theme.name) {
         Cookie.set("xuitm", theme.name)
      }
      const styles = Array.from(_document.querySelectorAll('body style[data-oncss]'));
      styles.forEach((style) => {
         _document.head.appendChild(style);
      });
   }, [])

   let selection: any = {}
   if (selectionColor && selectionColor !== 'surface') {
      selection = {
         "&::selection": {
            bgcolor: `${selectionColor}.main`,
            color: `${selectionColor}.contrast`
         }
      }
   }

   return (
      <DocumentProvider value={_document ? { document: _document, id: docid } : undefined}>
         <CSSCacheProvider cacheId={CSSCacheId}>
            <AppRootProvider element={() => rootRef.current}>
               <ThemeProvider
                  theme={theme}
                  onThemeChange={(t) => {
                     onThemeChange && onThemeChange(t)
                     Cookie.set("xuitm", t.name)
                  }}
                  {...props}
                  ref={mergeRef}
                  isRoot
                  sx={{
                     ...props.sx,
                     ...(visibility === "hidden" ? { visibility: "hidden" } : {}),
                     ...selection
                  }}
               >
                  <BreakpointProvider defaultKey={defaultBreakpoint ?? "xl"}>
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

