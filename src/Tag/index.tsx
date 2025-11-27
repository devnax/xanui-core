import * as React from 'react'
import { TagComponentType, TagPropsRoot } from './types';
import useTagProps from './useTagProps';
import isWindow from '../isWindow';

const Tag = React.forwardRef(<T extends TagComponentType = 'div'>({ component, children, ...rest }: TagPropsRoot<T>, ref: React.Ref<any>) => {
    const { props, style }: any = useTagProps(rest)
    props.ref = ref
    const ele = React.createElement(component || "div", props, children)
    if (!isWindow()) {
        const isCache = style.cache
        const styletag = React.createElement("style", {
            dangerouslySetInnerHTML: { __html: style.css },
            'data-oncss': style.classname
        })
        return React.createElement(React.Fragment, null, [isCache ? null : styletag, ele])
    }
    return ele
})

export default Tag