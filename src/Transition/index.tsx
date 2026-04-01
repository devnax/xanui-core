"use client";
import React, { cloneElement, Children, useRef, isValidElement, useLayoutEffect, useEffect } from 'react';
import * as variants from './variants'
import { Easing } from '../animate';
import useTransition from '../hooks/useTransition';

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


function TransitionBase({ children, ...options }: TransitionProps) {
    let {
        open,
        variant = "fade",
        duration = 450,
        delay,
        easing,
        exitOnUnmount = false,
        initialTransition = true,
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
    const rect = useRef<DOMRect>(null)

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
            if (!rect.current) {
                rect.current = ref.current?.getBoundingClientRect() as DOMRect
            }
            const v = variantCb(ref.current as HTMLElement, rect.current)
            return v.from
        },
        to: () => {
            if (!rect.current) {
                rect.current = ref.current?.getBoundingClientRect() as DOMRect
            }
            const v = variantCb(ref.current as HTMLElement, rect.current)
            return v.to
        },
        onUpdate: (val, prograss) => {
            if (!ref.current || !rect.current) return
            const vc = variantCb(ref.current, rect.current)
            onUpdate?.(val, prograss)
            return vc.onUpdate(val)
        },
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


const Transition = (props: any) => {
    return (
        <TransitionBase
            key={props.variant}
            {...props}
        />
    )
}
export default Transition