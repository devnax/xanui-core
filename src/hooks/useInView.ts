"use client"
import { useEffect, useRef, useState } from "react";

export type UseInViewOptions = {
   threshold?: number;
   root?: Element | null;
   margin?: number;
   once?: boolean;
};

function useInView<T extends HTMLElement = HTMLElement>(options: UseInViewOptions = {}) {
   const {
      threshold = 0.1,
      root = null,
      margin = 0,
      once = false
   } = options;

   const ref = useRef<T | null>(null);
   const [inView, setInView] = useState(false);

   useEffect(() => {
      const element = ref.current;
      if (!element) return;

      const observer = new IntersectionObserver(([entry]) => {
         const isVisible = entry.isIntersecting;

         setInView(isVisible);

         if (isVisible && once) {
            observer.disconnect();
         }
      },
         {
            threshold,
            root,
            rootMargin: `${margin * 8}px`
         }
      );

      observer.observe(element);

      return () => observer.disconnect();
   }, [threshold, root, margin, once]);

   return { ref, inView };
}

export default useInView