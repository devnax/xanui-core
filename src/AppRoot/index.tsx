
import React, { useEffect, useMemo } from 'react';
import { TagComponentType } from '../Tag/types';
import { createTheme, ThemeProvider, ThemeProviderProps, themeRootClass } from '../theme';
import { BreakpointProvider } from '../breakpoint';
import useScrollbar from '../hooks/useScrollbar';
import { css } from '../css';
import { darkColorPallete, lightColorPallete } from '../theme/ThemeDefaultOptions';

createTheme("light", { colors: lightColorPallete })
createTheme("dark", { colors: darkColorPallete })

export type AppRootProps<T extends TagComponentType = "div"> = ThemeProviderProps<T> & {
   noScrollbarCss?: boolean;
}

const AppRoot = React.forwardRef(<T extends TagComponentType = "div">({ children, noScrollbarCss, theme, ...props }: AppRootProps<T>, ref: React.Ref<any>) => {
   noScrollbarCss ??= false

   useMemo(() => {
      if (noScrollbarCss) return;
      useScrollbar({
         themeName: theme,
         root_cls: themeRootClass(theme)
      })
   }, [noScrollbarCss, theme])

   useMemo(() => {
      css({
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
               "-webkit-font-smoothing": "antialiased"
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
               borderSpacing: 0
            },
            "ol, ul": {
               listStyle: "none"
            },
            "a": {
               display: "inline-block"
            },
            "p, h1, h2, h3, h4, h5, h6": {
               overflowWrap: "break-word",
            }
         }
      })
   }, [])

   useEffect(() => {

      const root = document.querySelectorAll(`.xui-app-root`)
      if (!root || root.length > 1) {
         throw new Error("Multiple AppRoot detected in the application tree. Please ensure that there is only one AppRoot component wrapping your application.");
      }


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
         classNames={[`xui-app-root`]}
      >
         <BreakpointProvider>
            {children}
         </BreakpointProvider>
      </ThemeProvider>
   )
})

export default AppRoot

