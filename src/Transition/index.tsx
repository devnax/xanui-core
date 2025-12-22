import { cloneElement, Children } from 'react';
import useTransition, { UseTransitionProps } from '../hooks/useTransition';

export type TransitionProps = UseTransitionProps & {
    children: React.ReactElement;
}

const Transition = ({ children, ...props }: TransitionProps) => {
    const { exited, classname } = useTransition(props);
    if (exited) return null;
    const clone: any = Children.only(children);
    return cloneElement(clone, {
        className: `${clone?.props?.className || ''} ${classname || ''}`.trim()
    });
}


export default Transition