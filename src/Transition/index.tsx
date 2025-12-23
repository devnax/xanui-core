import { cloneElement, Children } from 'react';
import useTransition, { UseTransitionProps } from '../hooks/useTransition';

export type TransitionProps = UseTransitionProps & {
    children: React.ReactElement;
}

const Transition = ({ children, ...props }: TransitionProps) => {
    const { id, exited, classname } = useTransition(props);
    if (exited) return null;
    const clone: any = Children.only(children);
    return cloneElement(clone, {
        id,
        className: `${clone?.props?.className || ''} ${classname || ''}`.trim()
    });
}


export default Transition