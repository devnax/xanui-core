import React, { useEffect, useMemo } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, useTheme } from "../theme";

export function usePortal(children: React.ReactNode) {
   const [initialized, setInitialized] = React.useState(false);
   const theme = useTheme();
   const { el, root } = useMemo(() => {
      const el = document.createElement("div");
      const root = createRoot(el);
      return { el, root };
   }, []);

   const render = () => root.render(<ThemeProvider theme={theme.name}>{children}</ThemeProvider>)
   const container = () => {
      const container = document.querySelector(`.xui-app-root`) as HTMLDivElement;
      if (!container) {
         throw new Error("No ThemeProvider found in the application tree. Please wrap your application with ThemeProvider to use usePortal hook.");
      }
      return container;
   }
   const isContained = () => container().contains(el);
   const append = () => {
      if (!isContained()) {
         container().appendChild(el);
      }
   }

   useEffect(() => {
      if (initialized) {
         if (isContained()) {
            render()
         }
      } else {
         append()
         render()
         setInitialized(true);
      }

   }, [children]);

   useEffect(() => {
      return () => {
         root.render(null)
         el.remove();
      };
   }, []);

   return {
      isMount: () => document.body.contains(el),
      mount: () => {
         append()
         render()
      },
      unmount: () => {
         root.render(null);
         el.remove();
      }
   }
}


export default usePortal;