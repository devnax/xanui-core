"use client";
import React, { cloneElement, Children, useEffect, useState } from 'react';
import useTransition, { UseTransitionProps } from '../hooks/useTransition';

export type TransitionProps = UseTransitionProps & {
    children: React.ReactElement;
}

const TransitionBase = ({ children, ...options }: TransitionProps) => {
    const { props, exited } = useTransition(options);
    if (exited) return null;
    const clone: any = Children.only(children);
    return cloneElement(clone, props);
}

function Transition({ children, ...options }: TransitionProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    return <TransitionBase  {...options} >{children}</TransitionBase>
}


export default Transition