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
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536
}

export const css = (props: CSSProps, options?: CSSOptionProps) => {
    const cssOptions: CSSOptionProps = {
        ...options,
        breakpoints,
        aliases,
        getValue: (p: any, v: any, _c: any,) => {
            if (options?.getValue) {
                let _val = options?.getValue(p, v, _c)
                if (_val) return _val
            }
            return getValue(p, v, _c)
        },
        getProps: (p: any, v: any, _c: any) => {
            if (options?.getProps) {
                let _p = options?.getProps(p, v, _c)
                if (_p) return _p
            }
            return getProps(p, v, _c)
        },
    }
    return _css<Aliases, BreakpointKeys>(props, cssOptions)
}

export const adjustColor = (hex: string, factor: number) => {

    hex = hex.replace(/^#/, '')

    let r = parseInt(hex.slice(0, 2), 16)
    let g = parseInt(hex.slice(2, 4), 16)
    let b = parseInt(hex.slice(4, 6), 16)

    r = Math.floor(r * factor)
    g = Math.floor(g * factor)
    b = Math.floor(b * factor)

    r = Math.min(255, Math.max(0, r))
    g = Math.min(255, Math.max(0, g))
    b = Math.min(255, Math.max(0, b))

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export const adjustTextContrast = (color: string) => {
    color = color.replace(/^#/, '')
    const r = parseInt(color.slice(0, 2), 16);
    const g = parseInt(color.slice(2, 4), 16);
    const b = parseInt(color.slice(4, 6), 16);

    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#111111' : '#FFFFFF';
}

export const alpha = (color: string, opacity = 1) => {
    if (typeof opacity !== 'number') return color
    let _opacity = opacity * 100
    if (!color.startsWith("#")) throw new Error(`color must be hex`)
    return (color + (`0${Math.round((255 / 100) * _opacity).toString(16)}`.slice(-2))).toUpperCase();
};

