import React, { ReactElement, cloneElement, Children, useState, useEffect, useId } from 'react';
import Tag from '../Tag';
import { animationEases } from '../hooks/useAnimation';
import { css } from '../css';
import { formatCSSProp } from 'oncss';
import { CSSProps } from '../css/types';
import * as variants from './variants'
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
    let { disableInitialTransition, variant, duration, delay, ease, easing, onOpen, onOpened, onClose, onClosed, onState } = props as TransitionProps
    let _ease = ease || (animationEases as any)[easing as any] || animationEases.easeBounceOut
    disableInitialTransition ??= false
    duration ??= 400
    variant ??= "fade"

    const id = useId().replace(/:/g, "")
    const [rendered, setRendered] = useState(false)
    const [initial, setInitial] = useState(false)
    const [transitionState, setTransitionState] = useState<TransitionState>(open ? (disableInitialTransition ? "opened" : "open") : "closed")
    const [element, setElement] = useState<TransitionElementProps>({
        height: 0,
        width: 0,
        rect: null
    });

    if (typeof variant === 'string') {
        variant = (variants as any)[variant](element)
    }

    let from = (variant as any).from
    let to = (variant as any).to

    const [_css, setCss] = useState(open ? to : from)

    useEffect(() => {
        const ele: HTMLElement = document.querySelector(`.trans-${id}`) as any
        if (ele) {
            setRendered(true)
            setElement({
                height: ele.clientHeight,
                width: ele.clientWidth,
                rect: ele.getBoundingClientRect()
            })
            if (!disableInitialTransition && open) {
                setCss(from)
            }
        }
    }, [])

    useEffect(() => {
        const ele: HTMLElement = document.querySelector(`.trans-${id}`) as any
        if (rendered && ele) {
            let stimer: any = null
            let etimer: any = null
            ele.ontransitionstart = () => {
                clearTimeout(stimer)
                stimer = setTimeout(() => {
                    const isOpen = Array.from(ele.classList).includes("trans-open");
                    (onOpen && isOpen) && onOpen();
                    (onClose && !isOpen) && onClose()
                    onState && onState(isOpen ? "open" : "close")
                    setTransitionState(isOpen ? "open" : "close")
                }, 1)
            }
            ele.ontransitionend = () => {
                clearTimeout(etimer)
                etimer = setTimeout(() => {
                    const isOpen = Array.from(ele.classList).includes("trans-open");
                    (onOpened && isOpen) && onOpened();
                    (onClosed && !isOpen) && onClosed();
                    onState && onState(isOpen ? "opened" : "closed")
                    setTransitionState(isOpen ? "opened" : "closed")
                }, 1)
            }
        }
    }, [rendered])

    useEffect(() => {
        if (rendered) {
            if (!initial) {
                setInitial(true)
                setTimeout(() => {
                    setCss(open ? to : from)
                }, 50);
            } else {
                setCss(open ? to : from)
            }
        }
    }, [rendered, open, JSON.stringify(from), JSON.stringify(to)])

    let _: any = {}
    if (rendered) {
        let trans = ` ${duration}ms ${_ease} ${delay || 0}ms`
        _ = {
            ..._css,
            transition: Object.keys(_css || {}).map(k => formatCSSProp(k)).join(trans + ", ") + trans,
        }
    }

    const cls = css(_)
    if (!children || Array.isArray(children)) throw new Error("Invalid children in Transition")
    const first: any = Children.toArray(children).shift();
    let classname = `${cls.classname} trans-${id} trans-${(open ? "open" : "close")} trans-state-${transitionState}`
    const child = cloneElement(first, { classNames: [classname] })
    if (rendered) return child
    if (!rendered && disableInitialTransition && open) return child

    return (
        <Tag
            height={0}
            overflow={'hidden'}
            position="fixed"
        >
            {child}
        </Tag>
    )
}


export default Transition