"use client";
import { useCallback } from "react";

function useMergeRefs<T>(
   ...refs: Array<React.Ref<T> | undefined>
) {
   return useCallback((value: T | null) => {
      for (const ref of refs) {
         if (!ref) continue;
         if (typeof ref === "function") {
            ref(value);
         } else {
            (ref as React.MutableRefObject<T | null>).current = value;
         }
      }
   }, refs);
}

export default useMergeRefs;