"use client";

import React, { ReactNode, useMemo } from "react";
import { createPortal } from "react-dom";

export type PortalProps = {
   children: ReactNode;
   container?: HTMLElement | string; // HTMLElement or querySelector string
}

/**
 * SSR-safe Portal component
 * - container: HTMLElement or querySelector string
 * - if not provided, creates a unique div automatically
 */
const Portal: React.FC<PortalProps> = ({ children, container }) => {
   const portalNode = useMemo<HTMLElement | null>(() => {
      if (typeof document === "undefined") return null; // SSR

      // Use container if provided
      if (container instanceof HTMLElement) return container;
      if (typeof container === "string") {
         const element = document.querySelector<HTMLElement>(container);
         if (element) return element;
      }

      // Auto-create a unique div
      const element = document.createElement("div");
      element.dataset.portal = Math.random().toString(36).substring(2, 9); // unique id
      document.body.appendChild(element);

      return element;
   }, [container]);

   if (!portalNode) return null;

   return createPortal(children, portalNode);
};

export default Portal;