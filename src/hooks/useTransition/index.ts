import { useState, useEffect, useId } from 'react';
import { animationEases } from '../useAnimation';
import { css } from '../../css';
import { formatCSSProp } from 'oncss';
import { CSSProps } from '../../css/types';
import * as variants from './variants'

export type UseTransitionVariantTypes = keyof typeof variants
export type UseTransitionState = "open" | "opened" | "close" | "closed"

export type UseTransitionVariant = (rect: DOMRect) => ({ from: CSSProps, to: CSSProps })

export type UseTransitionProps = {
   open: boolean;
   variant: UseTransitionVariant | UseTransitionVariantTypes;
   ease?: string;
   easing?: keyof typeof animationEases;
   duration?: number;
   delay?: number;
   disableInitialTransition?: boolean;
   exitOnUnmount?: boolean;
   onOpen?: () => void;
   onOpened?: () => void;
   onClose?: () => void;
   onClosed?: () => void;
   onState?: (state: UseTransitionState) => void;
}


const style = (obj?: any) => {
   return css(obj || {}, { selector: "#" }).classname;
}

const getVariant = (rect: DOMRect | null, variant: UseTransitionProps['variant']) => {
   let fn = typeof variant === 'string' ? variants[variant] : variant
   if (!fn) throw new Error(`Transition variant "${variant}" not found.`)
   return fn(rect as DOMRect);
}

const useTransition = ({ open, ...props }: UseTransitionProps) => {
   let {
      disableInitialTransition = false,
      variant = "fade",
      duration = 400,
      delay,
      ease,
      easing,
      exitOnUnmount = false,
      onOpen,
      onOpened,
      onClose,
      onClosed,
      onState
   } = props
   let _ease = ease || (animationEases as any)[easing as any] || animationEases.bounce
   const id = "xui-transition-" + useId()
   const [state, setState] = useState({
      initial: false,
      classname: style({ visibility: "hidden" }),
      variant: variant,
      rect: null as DOMRect | null,
      stage: open ? "open" : "closed",
      unmounted: false,
   })

   const getEle = () => document.querySelector(`[data-transition="${id}"]`) as HTMLElement;
   const getBoundary = () => state.rect || getEle()?.getBoundingClientRect() || new DOMRect(0, 0, 0, 0);

   useEffect(() => {
      if (exitOnUnmount && state.stage === 'closed') {
         if (!open) {
            setState(s => ({
               ...s,
               initial: false,
               classname: "",
               unmounted: true,
               variant: variant,
            }))
         } else {
            setState(s => ({
               ...s,
               variant: variant,
               classname: style({ visibility: "hidden" }),
               stage: "open",
            }))
         }
      }
   }, [open, state.stage, exitOnUnmount, variant])

   // initial effect
   useEffect(() => {
      const ele = getEle()
      if (!ele) return
      if (exitOnUnmount && state.stage === 'closed') return

      const rect = getBoundary();
      let { from } = getVariant(rect, state.variant)
      if (open && !state.initial) {
         setState(s => ({
            ...s,
            classname: (!disableInitialTransition || state.unmounted) ? style(from) : "",
            initial: true,
            rect: rect,
         }))
         let stimer: any = null
         let etimer: any = null
         ele.ontransitionstart = () => {
            clearTimeout(stimer)
            stimer = setTimeout(() => {
               const isOpen = ele.getAttribute('data-transition-state') === 'open';
               (onOpen && isOpen) && onOpen();
               (onClose && !isOpen) && onClose()
               onState && onState(isOpen ? "open" : "close")
               setState(s => ({
                  ...s,
                  stage: isOpen ? "open" : "close"
               }))
            }, 1)
         }

         ele.ontransitionend = () => {
            clearTimeout(etimer)
            etimer = setTimeout(() => {
               const isOpen = ele.getAttribute('data-transition-state') === 'open';
               (onOpened && isOpen) && onOpened();
               (onClosed && !isOpen) && onClosed();
               onState && onState(isOpen ? "opened" : "closed")
               setState(s => ({
                  ...s,
                  stage: isOpen ? "opened" : "closed"
               }))
            }, 1)
         }
      } else if (!state.initial) {
         setState(s => ({
            ...s,
            classname: style(from),
            rect: rect,
         }))
      }
   }, [open, state.initial, state.stage, exitOnUnmount])


   useEffect(() => {
      if (state.initial) {
         let _variant = state.variant !== variant ? variant : state.variant
         const { from, to } = getVariant(state.rect, _variant)
         let _css: CSSProps = open ? to : from
         let trans = ` ${duration}ms ${_ease} ${delay || 0}ms`
         let _ = {
            ..._css,
            transition: Object.keys(_css || {}).map(k => formatCSSProp(k)).join(trans + ", ") + trans,
         }
         setState(s => ({
            ...s,
            classname: style(_),
            variant: _variant
         }))
      }
   }, [open, state.initial, variant])

   return {
      exited: exitOnUnmount && state.stage === 'closed',
      props: {
         'id': state.classname,
         'data-transition': id,
         'data-transition-state': open ? 'open' : 'close',
      }
   }
}


export default useTransition