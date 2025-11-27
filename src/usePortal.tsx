import React, { useEffect, useMemo } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, useTheme } from "./theme";

export function usePortal(children: React.ReactNode) {
   const [initialized, setInitialized] = React.useState(false);
   const theme = useTheme();
   const { el, root } = useMemo(() => {
      const el = document.createElement("div");
      const root = createRoot(el); // React 18 root
      return { el, root };
   }, []);

   const render = () => {
      root.render(<ThemeProvider theme={theme.name}>{children}</ThemeProvider>);
   }

   useEffect(() => {
      const container = document.querySelector(`.xui-app-root`) as HTMLDivElement;
      if (!container) {
         throw new Error("No ThemeProvider found in the application tree. Please wrap your application with ThemeProvider to use usePortal hook.");
      }
      const isContained = document.body.contains(el);

      if (initialized) {
         if (isContained) {
            render()
         }
      } else {
         if (!isContained) {
            container.appendChild(el);
         }
         render()
         setInitialized(true);
      }

   }, [children]);

   useEffect(() => {
      return () => {
         const isContained = document.body.contains(el);
         if (isContained) {
            root.unmount();
            document.body.removeChild(el);
         }
      };
   }, []);

   return {
      isMount: () => document.body.contains(el),
      mount: () => {
         const isContained = document.body.contains(el);
         if (!isContained) {
            document.body.appendChild(el);
         }
         render()
      },
      unmount: () => {
         if (document.body.contains(el)) {
            document.body.removeChild(el);
         }
         root.render(<></>);
      }
   }
}


export default usePortal;