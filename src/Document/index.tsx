'use client'
import React, { useContext, createContext } from "react";

export type DocumentID = string
export type DocumentContextValue = { document: Document; id: DocumentID } | undefined
const DocumentContext = createContext<DocumentContextValue>(undefined);
export const DocumentProvider: React.FC<{ children: React.ReactNode, value?: DocumentContextValue }> = ({ value, children }) => {
   return (
      <DocumentContext.Provider value={value}>
         {children}
      </DocumentContext.Provider>
   );
}

export const useDocument = () => useContext(DocumentContext)