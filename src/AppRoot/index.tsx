"use client";
import React, { useEffect, useMemo } from 'react';
import { TagComponentType } from '../Tag/types';
import { ThemeProvider, ThemeProviderProps, themeRootClass } from '../theme';
import { BreakpointProvider } from '../breakpoint';
import { css } from '../css';
import { RenderRenderar } from './Renderar';
import ServerStyleTag from '../Tag/ServerStyleTag';

export type AppRootProps<T extends TagComponentType = "div"> = ThemeProviderProps<T> & {
   noScrollbarCss?: boolean;
}

const appRootClassName = "xui-app-root"
export const appRootElement = () => document.querySelector(`.${appRootClassName}`) as HTMLDivElement;

const AppRoot = React.forwardRef(<T extends TagComponentType = "div">({ children, noScrollbarCss, theme, ...props }: AppRootProps<T>, ref: React.Ref<any>) => {
   noScrollbarCss ??= false
   const [visibility, setVisibility] = React.useState<string>("hidden");

   const scrollbarCss: any = useMemo(() => {
      if (noScrollbarCss) return;
      const cls = (cls: string) => `${themeRootClass(theme)} ${cls}`
      let thumbSize = 8
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
         injectStyle: typeof window !== 'undefined'
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
         injectStyle: typeof window !== 'undefined'
      })
   }, [])

   useEffect(() => {

      const root = document.querySelectorAll(`.${appRootClassName}`)
      if (!root || root.length > 1) {
         throw new Error("Multiple AppRoot detected in the application tree. Please ensure that there is only one AppRoot component wrapping your application.");
      }

      setVisibility("visible");

      // move oncss style tags to head
      if (typeof window === 'undefined') return;
      const head = document.getElementsByTagName('head')[0];
      const styles = Array.from(document.querySelectorAll('body style[data-oncss]'));
      styles.forEach((style) => {
         head.appendChild(style);
      });

   }, [])

   return (
      <ThemeProvider
         ref={ref}
         theme={theme}
         {...props}
         sx={{
            ...props.sx,
            ...(visibility === "hidden" ? { visibility: "hidden" } : {})
         }}
         classNames={[appRootClassName]}
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
   )
})

export default AppRoot

