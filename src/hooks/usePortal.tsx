"use client";
import React, { useEffect, useMemo } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, useTheme } from "../theme";
import { useAppRootElement } from "../AppRoot/context";

export type UsePortalOptions = {
   container?: HTMLElement;
   autoMount?: boolean;
}

function usePortal(children: React.ReactNode, options?: UsePortalOptions) {
   options = options || {};
   if (options.autoMount === undefined) {
      options.autoMount = true;
   }
   const [mounted, setMounted] = React.useState(options.autoMount);
   const theme = useTheme();
   const appRoot = useAppRootElement();
   const { el, root } = useMemo(() => {
      const el = document.createElement("div");
      const root = createRoot(el);
      return { el, root };
   }, [options.autoMount]);

   const container = () => {
      const container = options?.container || appRoot
      if (!container) throw new Error(`Container not found for portal. Please ensure that AppRoot is present in the application tree.`);
      return container;
   }

   const mount = () => {
      const cont = container();
      if (!cont.contains(el)) {
         cont.appendChild(el);
      }
      root.render(<ThemeProvider theme={theme.name}>{children}</ThemeProvider>)
   }

   const unmount = () => {
      root.render(null)
      el.remove();
   }


   useEffect(() => {
      if (mounted) {
         mount()
      } else {
         unmount()
      }
   }, [mounted]);

   useEffect(() => {
      if (mounted) {
         mount()
      }
   }, [children]);

   useEffect(() => {
      return () => {
         unmount()
      };
   }, []);

   return {
      isMount: () => mounted,
      mount: () => setMounted(true),
      unmount: () => setMounted(false)
   }
}


export default usePortal;