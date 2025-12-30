"use client";
import { cloneElement, Children, useId } from 'react';
import useTransition, { UseTransitionProps } from '../hooks/useTransition';

export type TransitionProps = UseTransitionProps & {
    children: React.ReactElement;
}



const Transition = ({ children, ...options }: TransitionProps) => {
    const id = useId();

    const { props, exited } = useTransition(id, options);
    if (exited) return null;
    const clone: any = Children.only(children);
    return cloneElement(clone, props);
}


export default Transition