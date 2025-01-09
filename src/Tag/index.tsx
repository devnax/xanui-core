import * as React from 'react'
import { CSSPropAsAttr } from './types';
import useTagProps from './useTagProps';
import { CSSProps } from '../css/types';

export type TagComponentType = keyof React.JSX.IntrinsicElements | React.ComponentType<any>
export type TagProps<T extends TagComponentType = 'div'> = Omit<React.HTMLProps<T>, 'width' | 'height'> & {
    component?: T;
    children?: React.ReactNode;
    ref?: any;
} & CSSPropAsAttr

export type TagPropsRoot<T extends TagComponentType = 'div'> = TagProps<T> & {
    sxr?: CSSProps
}

const Tag = React.forwardRef(<T extends TagComponentType = 'div'>({ component, children, ...rest }: TagPropsRoot<T>, ref: React.Ref<any>) => {
    const props: any = useTagProps(rest)
    props.ref = ref
    return React.createElement(component || "div", props, children)
}) as <T extends TagComponentType = 'div'>(props: TagPropsRoot<T> & { ref?: React.Ref<any> }) => React.ReactElement;

export default Tag;