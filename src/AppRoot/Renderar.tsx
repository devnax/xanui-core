// Renderar.tsx
import React, { useState } from "react";

type StoredComponent = {
   component: React.FC<any>;
   props: any;
};

const Components: StoredComponent[] = [];
let dispatch: (() => void) | null = null;

export class Renderar {
   static render(component: React.FC, props?: any) {
      Components.push({ component, props });
      if (dispatch) dispatch();
      return {
         unrender: () => this.unrender(component),
         updateProps: (newProps: any) => this.updateProps(component, newProps),
      };
   }

   static unrender(component: React.FC) {
      const index = Components.findIndex((c) => c.component === component);
      if (index > -1) {
         Components.splice(index, 1);
         if (dispatch) dispatch();
      }
   }

   static updateProps(component: React.FC, props: any) {
      const stored = Components.find((c) => c.component === component);
      if (stored) stored.props = { ...stored.props, ...props };
      if (dispatch) dispatch();
   }
}

export const RenderRenderar = () => {
   const [, setState] = useState(0);
   dispatch = () => setState((prev) => prev + 1);

   return (
      <>
         {Components.map(({ component: Component, props }, i) => (
            <Component key={i} {...props} />
         ))}
      </>
   );
};