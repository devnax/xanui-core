import React from "react";
import { ONCSS_CACHE } from 'oncss'

const CSSCacheContext = React.createContext<string | null>(null);

export const CSSCacheProvider: React.FC<{ cacheId: string | null; children: React.ReactNode }> = ({ cacheId, children }) => {
   return (
      <CSSCacheContext.Provider value={cacheId}>
         {children}
      </CSSCacheContext.Provider>
   );
}

export const useCSSCacheId = () => {
   return React.useContext(CSSCacheContext) as string
}

export const useCSSCache = () => {
   const cacheId = React.useContext(CSSCacheContext);
   if (typeof window === 'undefined') {
      return null as any;
   }
   const caches = ONCSS_CACHE.caches()

   return {
      cacheId,
      cache: caches.get(cacheId!)
   }
}

export const getCSSCache = (cacheId: string) => {
   const caches = ONCSS_CACHE.caches()
   return caches.get(cacheId)
}