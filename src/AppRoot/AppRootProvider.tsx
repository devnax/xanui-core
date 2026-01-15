import React from "react";

const AppRootContext = React.createContext<(() => HTMLElement | null) | null>(null);

export const AppRootProvider: React.FC<{ element: () => HTMLElement | null; children: React.ReactNode }> = ({ element, children }) => {
   return (
      <AppRootContext.Provider value={element}>
         {children}
      </AppRootContext.Provider>
   );
}

export const useAppRootElement = (): HTMLElement => {
   const context = React.useContext(AppRootContext);
   if (typeof window === 'undefined') {
      return null as any;
   }

   return context!() as HTMLElement
}
