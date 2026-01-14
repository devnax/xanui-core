'use client'
import React, { createContext, useEffect, useRef, useState } from "react";
import { useTheme } from "../theme";
import Tag from "../Tag";
import { createPortal } from "react-dom";
import AppRoot from "../AppRoot";
import { TagPropsRoot } from "../Tag/types";
import useMergeRefs from "../hooks/useMergeRefs";

const IframeContext = createContext<{ document: Document | null; window: Window | null; }>({
   document: null,
   window: null,
});


export type IframeProps = Omit<TagPropsRoot<"iframe">, "component"> & {
   theme?: string;
   CSSCacheId?: string;
}

const Iframe = ({ children, sxr, theme, CSSCacheId, ...props }: IframeProps, ref: React.Ref<HTMLIFrameElement>) => {
   const [doc, setDoc] = useState<Document | null>(null);
   const iframeRef = useRef<HTMLIFrameElement>(null);
   const _ref = useMergeRefs(iframeRef, ref)
   const parentTheme = useTheme()
   theme ??= parentTheme.name

   useEffect(() => {
      if (!iframeRef.current) return;
      const iframe = iframeRef.current;
      const onLoad = () => setDoc(iframe.contentDocument);
      iframe.addEventListener("load", onLoad);
      return () => iframe.removeEventListener("load", onLoad);
   }, []);

   return (
      <>
         <Tag
            {...props}
            component={"iframe"}
            sxr={{
               border: 'none',
               width: "100%",
               height: "100%",
               p: 0,
               m: 0,
               ...sxr
            }}
            ref={_ref}
            srcDoc={"<!DOCTYPE html><html><head></head><body></body></html>"}
         />
         {doc &&
            createPortal(
               <IframeContext.Provider
                  value={{
                     document: doc,
                     window: doc.defaultView,
                  }}
               >
                  <AppRoot theme={theme} document={doc as Document} CSSCacheId={CSSCacheId}>
                     {children}
                  </AppRoot>
               </IframeContext.Provider>,
               doc.body
            )}
      </>
   );
}

export default React.forwardRef(Iframe)