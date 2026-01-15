import React, { ReactElement, useMemo } from "react";
import { DocumentID, useDocument } from "../Document";

type StoredComponent = {
   component: React.FunctionComponent<any>;
   props: any;
};

const State = new Map<DocumentID, StoredComponent[]>()
const Dispatch = new Map<DocumentID, Function>()

export class Renderar {
   static doc: any
   static render(component: React.FunctionComponent, props?: any) {
      const docid = Renderar.doc.id
      let components = State.get(docid) || []
      components.push({ component, props })
      State.set(Renderar.doc.id, components)
      const dispatch = Dispatch.get(docid)
      if (dispatch) {
         dispatch()
      }

      return {
         unrender: () => {
            this.unrender(component);
         },
         updateProps: (newProps: any) => {
            this.updateProps(component, newProps);
         }
      };
   }

   static unrender(component: React.FunctionComponent) {
      const docid = Renderar.doc.id
      let components = State.get(docid) || []

      const index = components.findIndex((c) => c.component === component);
      if (index > -1) {
         components.splice(index, 1);
         const dispatch = Dispatch.get(docid)
         if (dispatch) {
            dispatch()
         }
      }
   }

   static updateProps(component: React.FunctionComponent, props: any) {
      const docid = Renderar.doc.id
      let components = State.get(docid) || []

      const storedComponent = components.find((c) => c.component === component);
      if (storedComponent) {
         storedComponent.props = { ...storedComponent.props, ...props };
      }
      const dispatch = Dispatch.get(docid)
      if (dispatch) {
         dispatch()
      }
   }
}

export const RenderRenderar = () => {
   const [, setState] = React.useState(0);
   const doc = useDocument()

   useMemo(() => {
      const render = Renderar.render
      const unrender = Renderar.unrender
      const updateProps = Renderar.updateProps
      Renderar.render = ((component: React.FunctionComponent, props?: any) => {
         Renderar.doc = doc
         render(component, props)
         Renderar.doc = null
      }) as any

      Renderar.unrender = ((component: React.FunctionComponent) => {
         Renderar.doc = doc
         unrender(component)
         Renderar.doc = null
      }) as any

      Renderar.updateProps = ((component: React.FunctionComponent, props: any) => {
         Renderar.doc = doc
         updateProps(component, props)
         Renderar.doc = null
      }) as any

   }, [doc.id])

   if (!Dispatch.has(doc.id)) {
      Dispatch.set(doc.id, () => {
         setState((prev) => prev + 1);
      })
   }
   const components = State.get(doc.id) || []

   return components.map(({ component: Component, props }, index): ReactElement => {
      return <Component key={index} {...props} />;
   });
}
