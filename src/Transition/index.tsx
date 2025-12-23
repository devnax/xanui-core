import { cloneElement, Children } from 'react';
import useTransition, { UseTransitionProps } from '../hooks/useTransition';

export type TransitionProps = UseTransitionProps & {
    children: React.ReactElement;
}

const Transition = ({ children, ...options }: TransitionProps) => {
    const { props, exited } = useTransition(options);
    if (exited) return null;
    const clone: any = Children.only(children);
    return cloneElement(clone, props);
}


export default Transition