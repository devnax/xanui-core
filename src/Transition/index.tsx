"use client";
import React, { cloneElement, Children, useState, useLayoutEffect, useEffect, useRef } from 'react';
import * as variants from './variants'
import { css } from '../css';
import { useDocument } from '../Document';
import { useCSSCacheId } from '../css/CSSCacheProvider';
import { animationEases } from '../hooks/useAnimation';
import { formatCSSProp } from 'oncss';
import { CSSProps } from '../css/types';

export type TransitionVariantTypes = keyof typeof variants
export type TransitionVariant = TransitionVariantTypes | ((rect: DOMRect) => ({ from: CSSProps, to: CSSProps }))
export type TransitionState = "open" | "opened" | "close" | "closed"

export type TransitionProps = {
    children: React.ReactElement;
    open: boolean;
    variant: TransitionVariant
    ease?: string;
    easing?: keyof typeof animationEases;
    duration?: number;
    delay?: number;
    disableInitialTransition?: boolean;
    onOpen?: () => void;
    onOpened?: () => void;
    onClose?: () => void;
    onClosed?: () => void;
    onState?: (state: TransitionState) => void;
}

const getVariant = (rect: DOMRect, variant: TransitionVariant) => {
    let fn = typeof variant === 'string' ? variants[variant] : variant
    if (!fn) throw new Error(`Transition variant "${variant}" not found.`)
    return fn(rect as DOMRect);
}

function Transition({ children, ...options }: TransitionProps) {
    let {
        disableInitialTransition = false,
        variant = "fade",
        duration = 400,
        delay,
        ease,
        easing,
        open,
        onOpen,
        onOpened,
        onClose,
        onClosed,
        onState
    } = options

    const [rect, setRect] = useState<DOMRect>()
    const [isDisableInitial, setIsDisableInitial] = useState(disableInitialTransition)
    const ref = useRef<HTMLElement>(null)
    const doc = useDocument();
    const cacheId = useCSSCacheId()
    let _ease = ease || (animationEases as any)[easing as any] || animationEases.bounce

    const style = (obj = {}) => {
        return css(obj, { container: doc?.document, cacheId }).classname;
    }

    let [cls, setCls] = useState(() => {
        let props: any = {}
        if (!isDisableInitial) {
            props.visibility = 'hidden'
        } else if (isDisableInitial && !open) {
            props.visibility = 'hidden'
        }
        return style(props)
    })


    useEffect(() => {
        const rect = ref.current?.getBoundingClientRect() as DOMRect
        const v = getVariant(rect, variant)
        setCls(style(open ? v.from : v.to))
        setRect(rect)
    }, [])

    useLayoutEffect(() => {
        if (rect) {
            const v = getVariant(rect, variant)
            let _css: any = open ? v.to : v.from
            let trans = ` ${duration}ms ${_ease} ${delay || 0}ms`
            if (isDisableInitial) {
                trans = ''
                setIsDisableInitial(false)
            }
            let _ = {
                ..._css,
                transition: Object.keys(_css || {}).map(k => formatCSSProp(k)).join(trans + ", ") + trans,
            }

            setCls(style(_))

            const ele = ref.current as HTMLElement
            let stimer: any = null
            let etimer: any = null
            ele.ontransitionstart = () => {
                clearTimeout(stimer)
                stimer = setTimeout(() => {
                    (onOpen && open) && onOpen();
                    (onClose && !open) && onClose()
                    onState && onState(open ? "open" : "close")
                }, 1)
            }
            ele.ontransitionend = () => {
                clearTimeout(etimer)
                etimer = setTimeout(() => {
                    if (onOpened && open) onOpened();
                    if (onClosed && !open) onClosed();
                    onState && onState(open ? "opened" : "closed")
                }, 1)
            }
        }
    }, [rect, open, variant])

    const clone: any = Children.only(children);
    return cloneElement(clone, {
        className: cls,
        ref
    });
}

export default Transition