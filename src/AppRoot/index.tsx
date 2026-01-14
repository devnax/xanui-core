"use client";
import React, { useEffect, useMemo, useRef } from 'react';
import { TagComponentType } from '../Tag/types';
import { ThemeProvider, ThemeProviderProps, themeRootClass } from '../theme';
import { BreakpointProvider } from '../breakpoint';
import { css } from '../css';
import { RenderRenderar } from './Renderar';
import ServerStyleTag from '../Tag/ServerStyleTag';
import { DocumentProvider } from '../Document';
import { AppRootProvider } from './context';
import useMergeRefs from '../hooks/useMergeRefs';

export type AppRootProps<T extends TagComponentType = "div"> = ThemeProviderProps<T> & {
   noScrollbarCss?: boolean;
   document?: Document;
}

export const APP_ROOT_CLASSNAME = "xui-app-root"

const AppRoot = React.forwardRef(<T extends TagComponentType = "div">({ children, noScrollbarCss, theme, document: _document, ...props }: AppRootProps<T>, ref: React.Ref<any>) => {
   noScrollbarCss ??= false
   _document ??= document

   const [visibility, setVisibility] = React.useState<string>("hidden");
   const rootRef = useRef(null)
   const mergeRef = useMergeRefs(rootRef, ref)

   const scrollbarCss: any = useMemo(() => {
      if (noScrollbarCss) return;
      const cls = (cls: string) => `${themeRootClass(theme)} ${cls}`
      let thumbSize = 6
      let thumbColor = "var(--color-text-secondary)"
      let trackColor = "transparent"

      return css({
         "@global": {
            [cls('*::-webkit-scrollbar')]: {
               width: thumbSize,
               height: thumbSize,
            },
            [cls("*::-webkit-scrollbar-thumb")]: {
               backgroundColor: thumbColor,
               borderRadius: "6px",
               opacity: 0.6,
            },
            [cls("*::-webkit-scrollbar-thumb:hover")]: {
               backgroundColor: thumbColor,
               opacity: 0.0,
            },
            [cls("*::-webkit-scrollbar-track")]: {
               backgroundColor: trackColor,
               borderRadius: "6px",
            },
         }
      }, {
         injectStyle: typeof window !== 'undefined',
         container: _document,
      }) as any
   }, [noScrollbarCss, theme])

   const globalStyle = useMemo(() => {
      return css({
         "@global": {
            "*": {
               m: 0,
               p: 0,
               outline: "none",
               boxSizing: "border-box",
               verticalAlign: "baseline",
            },
            "html, body": {
               minHeight: "100%",
               "-webkit-font-smoothing": "antialiased",
               "-moz-osx-font-smoothing": "grayscale",
            } as any,
            "img, picture, video, canvas, svg": {
               maxWidth: "100%",
               display: "block"
            },
            "input, button, textarea, select": {
               font: "inherit"
            },
            "table": {
               borderCollapse: "collapse",
               borderSpacing: 0,
            },
            "ol, ul": {
               listStyle: "none",
               padding: 0,
               margin: 0,
            },
            "a": {
               display: "inline-block",
               color: "inherit",
               textDecoration: "none",
               cursor: "pointer",
               "&:hover": {
                  textDecoration: "underline"
               }
            },
            "p, h1, h2, h3, h4, h5, h6": {
               overflowWrap: "break-word",
            },
         }
      }, {
         injectStyle: typeof window !== 'undefined',
         container: _document,
      })
   }, [])

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
      <DocumentProvider document={_document}>
         <AppRootProvider element={rootRef.current}>
            <ThemeProvider
               ref={mergeRef}
               theme={theme}
               {...props}
               sx={{
                  ...props.sx,
                  ...(visibility === "hidden" ? { visibility: "hidden" } : {})
               }}
               classNames={[APP_ROOT_CLASSNAME]}
            >
               <ServerStyleTag factory={globalStyle} />
               {
                  scrollbarCss && <ServerStyleTag factory={scrollbarCss} />
               }
               <BreakpointProvider>
                  {children}
                  <RenderRenderar />
               </BreakpointProvider>
            </ThemeProvider>
         </AppRootProvider>
      </DocumentProvider>
   )
})

export default AppRoot

