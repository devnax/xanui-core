import * as React from 'react'
import { TagComponentType, TagPropsRoot } from './types';
import useTagProps from './useTagProps';
import ServerStyleTag from './ServerStyleTag';

const Tag = React.forwardRef(<T extends TagComponentType = 'div'>({ component, children, ...rest }: TagPropsRoot<T>, ref: React.Ref<any>) => {
    const { props, style, themeStyle }: any = useTagProps(rest)
    props.ref = ref
    const ele = React.createElement(component || "div", props, children)
    if (typeof window === 'undefined') {
        return (
            <>
                <ServerStyleTag factory={style} />
                {themeStyle && <ServerStyleTag factory={themeStyle} />}
                {ele}
            </>
        )
    }
    return ele
})

export default Tag