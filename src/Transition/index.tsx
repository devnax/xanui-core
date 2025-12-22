import React, { ReactElement, cloneElement, Children, useState, useEffect, useId, useRef, useMemo } from 'react';
import Tag from '../Tag';
import { animationEases } from '../hooks/useAnimation';
import { css } from '../css';
import { formatCSSProp } from 'oncss';
import { CSSProps } from '../css/types';
import * as variants from './variants'
import classNames from 'pretty-class';
export type TransitionVariantTypes = keyof typeof variants

export type TransitionElementProps = {
    height: number;
    width: number;
    rect: DOMRect | null
}

export type TransitionState = "open" | "opened" | "close" | "closed"

export type TransitionProps = {
    children: ReactElement;
    open: boolean;
    variant: {
        from: CSSProps;
        to: CSSProps;
    } | TransitionVariantTypes;
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

const Transition = ({ children, open, ...props }: TransitionProps) => {
    let {
        disableInitialTransition = false,
        variant = "fade",
        duration = 400,
        delay,
        ease,
        easing,
        onOpen,
        onOpened,
        onClose,
        onClosed,
        onState
    } = props as TransitionProps
    let _ease = ease || (animationEases as any)[easing as any] || animationEases.easeBounceOut

    const ref = useRef<any>(null);

    const [state, setState] = useState({
        initial: false,
        classname: "",
        variant: variant,
        rect: null as DOMRect | null
    })

    const getVariant = (rect: any, variant: any) => {
        return typeof variant === 'string' ? (variants as any)[variant](rect) : variant
    }

    useEffect(() => {
        const rect = state.rect || (ref.current as HTMLElement)?.getBoundingClientRect();
        let { from } = getVariant(rect, state.variant)
        const ele = ref.current as HTMLElement;
        if (open && !state.initial) {
            setState(s => ({
                ...s,
                classname: css(from).classname,
                initial: true,
                rect: rect,
                stage: open ? "open" : "closed"
            }))

            ele.ontransitionstart = () => {
                const isOpen = Array.from(ele.classList).includes("trans-open");
                (onOpen && isOpen) && onOpen();
                (onClose && !isOpen) && onClose()
                onState && onState(isOpen ? "open" : "close")
            }
            ele.ontransitionend = () => {
                const isOpen = Array.from(ele.classList).includes("trans-open");
                (onOpened && isOpen) && onOpened();
                (onClosed && !isOpen) && onClosed();
                onState && onState(isOpen ? "opened" : "closed")
            }
        } else if (!state.initial) {
            setState(s => ({
                ...s,
                classname: css(from).classname,
                rect: rect
            }))
        }
    }, [open])

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
                classname: css(_).classname,
                variant: _variant
            }))
        }
    }, [open, state.initial, variant])

    return cloneElement(Children.only(children), {
        ref: ref,
        className: classNames(state.classname, (children.props as any).className, `trans-${(open ? "open" : "close")}`),
    } as any);
}


export default Transition