import React, { ReactElement } from "react";

const Components: React.FunctionComponent[] = []
let dispatch: Function

export class Renderar {
   static render(component: React.FunctionComponent) {
      Components.push(component);
      if (dispatch) {
         dispatch();
      }

      return {
         unrender: () => {
            this.unrender(component);
         }
      }
   }

   static unrender(component: React.FunctionComponent) {
      const index = Components.indexOf(component);
      if (index > -1) {
         Components.splice(index, 1);
         if (dispatch) {
            dispatch();
         }
      }
   }
}

export const RenderRenderar = () => {
   const [_, setState] = React.useState<number>(0);

   if (!dispatch) {
      dispatch = () => {
         setState(prev => prev + 1);
      }
   }

   return Components.map((Component, index): ReactElement => {
      return <Component key={index} />
   });
}
