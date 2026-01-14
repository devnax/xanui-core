'use client'
import React from "react";

const DocumentContext = React.createContext<Document | null>(null);

export const DocumentProvider: React.FC<{ document: Document; children: React.ReactNode }> = ({ document, children }) => {
   return (
      <DocumentContext.Provider value={document}>
         {children}
      </DocumentContext.Provider>
   );
}

export const useDocument = (): Document => {
   const context = React.useContext(DocumentContext);
   if (typeof window === 'undefined') {
      return null as any;
   }
   return context || document;
}