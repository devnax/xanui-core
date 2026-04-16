import getValue from "./getValue"
import getProps from "./getProps"
import aliases from "./aliases"
import { Aliases, BreakpointKeys, CSSOptionProps, CSSProps } from './types'
import { css as _css } from "oncss"

export {
    getValue,
    getProps
}

export const breakpoints = {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
}

export const css = (props: CSSProps, options?: CSSOptionProps) => {
    const cssOptions: CSSOptionProps = {
        ...options,
        breakpoints,
        aliases,
        getValue: (p: any, v: any, _c: any, dept) => {
            if (options?.getValue) {
                let _val = options?.getValue(p, v, _c, dept)
                if (_val) return _val
            }
            return getValue(p, v, _c)
        },
        getProps: (p: any, v: any, _c: any, dept) => {
            if (options?.getProps) {
                let _p = options?.getProps(p, v, _c, dept)
                if (_p) return _p
            }
            return getProps(p, v, _c)
        },
    }
    return _css<Aliases, BreakpointKeys>(props, cssOptions)
}

