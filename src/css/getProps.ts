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