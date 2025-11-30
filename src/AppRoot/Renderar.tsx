import React, { ReactElement } from "react";

type StoredComponent = {
   component: React.FunctionComponent<any>;
   props: any;
};

const Components: StoredComponent[] = [];
let dispatch: (() => void) | null = null;

export class Renderar {
   static render(component: React.FunctionComponent, props?: any) {
      Components.push({ component, props });

      if (dispatch) {
         dispatch();
      }

      return {
         unrender: () => {
            this.unrender(component);
         }
      };
   }

   static unrender(component: React.FunctionComponent) {
      const index = Components.findIndex((c) => c.component === component);
      if (index > -1) {
         Components.splice(index, 1);
         if (dispatch) dispatch();
      }
   }
}

export const RenderRenderar = () => {
   const [, setState] = React.useState(0);

   if (!dispatch) {
      dispatch = () => {
         setState((prev) => prev + 1);
      };
   }

   return Components.map(({ component: Component, props }, index): ReactElement => {
      return <Component key={index} {...props} />;
   });
};
