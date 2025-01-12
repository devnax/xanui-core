import * as React from 'react'
import { TagComponentType, TagPropsRoot } from './types';
import useTagProps from './useTagProps';

const Tag = React.forwardRef(<T extends TagComponentType = 'div'>({ component, children, ...rest }: TagPropsRoot<T>, ref: React.Ref<any>) => {
    const props: any = useTagProps(rest)
    props.ref = ref
    return React.createElement(component || "div", props, children)
}) as <T extends TagComponentType = 'div'>(props: TagPropsRoot<T> & { ref?: React.Ref<any> }) => React.ReactElement;

export default Tag