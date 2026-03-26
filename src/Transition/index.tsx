"use client";
import React, { cloneElement, Children, useState, useEffect, useRef } from 'react';
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

    const endTimer = useRef<any>(null)
    const animId = useRef(0)
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
        if (!isDisableInitial || (isDisableInitial && !open)) {
            props.opacity = 0
            props.pointerEvents = 'none'
            props.transition = 'none'
        }
        return style(props)
    })


    useEffect(() => {
        let frame: any
        const measure = () => {
            const node = ref.current
            if (!node) {
                frame = requestAnimationFrame(measure) // ⬅️ retry next frame
                return
            }

            const rect = node.getBoundingClientRect()
            const v = getVariant(rect, variant)
            const initial = isDisableInitial
                ? (open ? v.to : v.from)
                : (open ? v.from : v.to)

            setCls(style({
                ...initial,
                transition: 'none'
            }))
            setRect(rect)
        }

        frame = requestAnimationFrame(measure)

        return () => {
            if (endTimer.current) {
                clearTimeout(endTimer.current)
            }
            cancelAnimationFrame(frame)
        }

    }, [])

    useEffect(() => {
        if (rect) {
            let _duration = isDisableInitial ? 0 : duration
            let _delay = isDisableInitial ? 0 : (delay || 0)

            if (isDisableInitial) {
                setIsDisableInitial(false)
            }
            const v = getVariant(rect, variant)
            let _css: any = open ? v.to : v.from

            let _ = {
                ..._css,
                transition: Object.keys(_css || {})
                    .map(k => `${formatCSSProp(k)} ${_duration}ms ${_ease} ${_delay}ms`)
                    .join(", "),
                willChange: Object.keys(_css || {})
                    .map(formatCSSProp)
                    .join(", "),
            }

            if (open) {
                onOpen?.();
                onState?.("open");
            } else {
                onClose?.();
                onState?.("close");
            }

            setCls(style(_))
            if (endTimer.current) {
                clearTimeout(endTimer.current)
            }
            animId.current++
            const id = animId.current
            endTimer.current = setTimeout(() => {
                if (id !== animId.current) return
                if (open) {
                    onOpened?.();
                    onState?.("opened");
                } else {
                    onClosed?.();
                    onState?.("closed");
                }
            }, _duration + _delay)
        }
    }, [rect, open, variant])

    const clone: any = Children.only(children);

    return cloneElement(clone, {
        className: cls,
        ref: (node: HTMLElement) => {
            ref.current = node;

            const childRef = (clone as any).ref;
            if (typeof childRef === "function") {
                childRef(node);
            } else if (childRef) {
                childRef.current = node;
            }
        }
    });
}

export default Transition