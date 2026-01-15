"use client";
import React, { useEffect, useMemo } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, useTheme } from "../theme";
import { useAppRootElement } from "../AppRoot/AppRootProvider";
import { useDocument } from "../Document";
import AppRoot from "../AppRoot";
import { useCSSCacheId } from "../css/CSSCacheProvider";

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
   const doc = useDocument()
   const appRoot = useAppRootElement();
   const cacheId = useCSSCacheId()

   const { el, root } = useMemo(() => {
      const el = doc.document.createElement("div");
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
      root.render(<AppRoot disableRenderar theme={theme.name} CSSCacheId={cacheId} document={doc.document}>{children}</AppRoot>)
   }

   const unmount = () => {
      root.render(null)
      el.remove();
   }

   useEffect(() => {
      (mounted && appRoot) ? mount() : unmount()
   }, [mounted, appRoot]);

   useEffect(() => {
      if (mounted && appRoot) mount()
   }, [children, appRoot]);

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