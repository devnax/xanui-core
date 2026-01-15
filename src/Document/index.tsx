'use client'
import React, { useContext, createContext } from "react";


export type DocumentID = string
export type DocumentContextValue = { document: Document; id: DocumentID }
const DocumentContext = createContext<DocumentContextValue | null>(null);

export const DocumentProvider: React.FC<{ children: React.ReactNode } & DocumentContextValue> = ({ document, id, children }) => {
   return (
      <DocumentContext.Provider value={{ document, id }}>
         {children}
      </DocumentContext.Provider>
   );
}

export const useDocument = (): DocumentContextValue => {
   const context = useContext(DocumentContext);
   if (typeof window === 'undefined') {
      return null as any;
   }
   return context as DocumentContextValue
}