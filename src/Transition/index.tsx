"use client";
import React, { cloneElement, Children, useRef, isValidElement, useLayoutEffect } from 'react';
import * as variants from './variants'
import useTransition from '../hooks/useTransition';
import { Easing } from '../animate';

export type TransitionVariantTypes = keyof typeof variants
export type TransitionProps = {
    children: React.ReactElement;
    open: boolean;
    variant: TransitionVariantTypes
    easing?: keyof typeof Easing
    duration?: number;
    delay?: number;
    initialTransition?: boolean;

    exitOnUnmount?: boolean;

    onEnter?: () => void
    onEntered?: () => void
    onExit?: () => void
    onExited?: () => void
    onUpdate?: (value: Record<string, number>, progress: number) => void;
    onDone?: () => void;
}


function Transition({ children, ...options }: TransitionProps) {
    let {
        open,
        variant = "fade",
        duration = 450,
        delay,
        easing,
        exitOnUnmount = false,
        initialTransition = false,
        onEnter,
        onEntered,
        onExit,
        onExited,
        onUpdate,
        onDone,

    } = options

    easing ??= "default"

    const variantCb = variants[variant]
    const ref = useRef<HTMLElement>(null)
    const init = useRef(false)

    const trans = useTransition({
        delay,
        duration,
        easing: Easing[easing],
        onEnter,
        onEntered,
        onExit,
        onExited,
        onDone,
        from: () => {
            const v = variantCb(ref.current as HTMLElement)
            return v.from
        },
        to: () => {
            const v = variantCb(ref.current as HTMLElement)
            return v.to
        },
        onUpdate: (val, prograss) => {
            if (!ref.current) throw new Error("Invalid Transition Element");
            const vc = variantCb(ref.current)
            onUpdate?.(val, prograss)
            return vc.onUpdate(val)
        }
    })


    useLayoutEffect(() => {
        const isnot = !init.current && !initialTransition
        init.current = true
        if (open) {
            trans.enter(isnot ? false : true)
        } else {
            trans.exit(isnot ? false : true)
        }
    }, [open])

    if (exitOnUnmount && trans.status === "exited") return

    const childs = Children.toArray(children)
    if (childs.length !== 1) {
        throw new Error("Transition expects exactly one child.");
    }
    const child = childs[0]
    if (!isValidElement(child)) {
        throw new Error("Transition expects a valid React element.");
    }

    return cloneElement(child, {
        ref: (node: HTMLElement) => {
            ref.current = node;

            const childRef = (child as any).ref;
            if (typeof childRef === "function") {
                childRef(node);
            } else if (childRef) {
                childRef.current = node;
            }
        }
    } as any);
}

export default Transition