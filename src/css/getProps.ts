import { CSSProps } from "./types";

const getProps = (prop: string, value: string, _css: CSSProps) => {
    let important;
    if (typeof value === 'string') {
        const split = value.split("!")
        important = split[1] ? "!important" : ""
        value = split[0]
    }

    if (prop === 'disabled') {
        if ((value as any) === true) {
            return {
                pointerEvents: "none!important",
                cursor: "default!important",
                userSelect: "none!important",
                opacity: ".8!important"
            } as any
        }
        return {}
    }


    if (prop === 'spacing') {
        const isFlex = (_css as any)?.flexBox || (_css as any)?.flexRow || (_css as any)?.flexColumn || (_css as any)?.display === 'flex'
        if (isFlex && typeof value === 'number') {
            const direction = (_css as any)?.flexColumn ? 'column' : 'row'
            let val: any = value * 8
            if (direction === 'row') {
                return {
                    marginLeft: `calc(-1 * ${val}px)${important || ""}`,
                    marginTop: `calc(-1 * ${val}px)${important || ""}`,
                    '& > *': {
                        paddingLeft: `${val}px${important || ""}`,
                        marginTop: `${val}px${important || ""}`,
                    }
                } as any
            } else {
                return {
                    marginTop: `calc(-1 * ${val}px)${important || ""}`,
                    marginLeft: `calc(-1 * ${val}px)${important || ""}`,
                    '& > *': {
                        paddingTop: `${val}px${important || ""}`,
                        marginLeft: `${val}px${important || ""}`,
                    }
                } as any
            }
        }

        if (typeof value === 'number') {
            let val: any = value * 8
            return {
                margin: `-${val}px${important || ""}`,
                '& > *': {
                    padding: `${val}px${important || ""}`,
                }
            } as any
        }
    }

    if (value && typeof value === "number" && ["border", "borderRight", "borderLeft", "borderTop", "borderBottom"].includes(prop as any)) {
        const keys: any = Object.keys(_css)
        let p: any = {
            [`${prop}Width`]: value + 'px' + (important || ""),
        }
        if (!keys.includes(`${prop}Color`)) {
            p[`${prop}Color`] = "divider"
        }
        if (!keys.includes(`${prop}Style`)) {
            p[`${prop}Style`] = "solid"
        }
        return p
    }
}

export default getProps