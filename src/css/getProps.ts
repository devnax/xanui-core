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
            let c: any = {
                pointerEvents: "none!important",
                cursor: "not-allowed!important",
                userSelect: "none!important",
                opacity: "0.6!important",
                transition: "none",
                boxShadow: "none",
                // color: `surface.muted!important`,
                // borderColor: `transparent!important`,
            }

            if ((_css as any).bgcolor && (_css as any).bgcolor !== 'transparent') {
                // c.bgcolor = `surface.dark!important`
                // c.borderColor = `surface.dark!important`
            }
            return c
        }
        return {}
    }


    if (prop === "spacing" && typeof value === "number") {
        const val = value * 8;
        const hasWidth = "width" in _css;
        const width = `calc(${hasWidth ? _css.width : "100%"} + ${val}px)`;
        return {
            marginLeft: `-${val}px`,
            marginTop: `-${val}px`,
            width: width,

            "& > *": {
                paddingLeft: `${val}px`,
                paddingTop: `${val}px`,
            },
        } as any;
    }



    // if (value && typeof value === "number" && ["border", "borderRight", "borderLeft", "borderTop", "borderBottom"].includes(prop as any)) {
    //     const keys: any = Object.keys(_css)
    //     let p: any = {
    //         [`${prop}Width`]: value + 'px' + (important || ""),
    //     }
    //     // if (!keys.includes(`${prop}Color`)) {
    //     //     p[`${prop}Color`] = "surface.divider"
    //     // }
    //     if (!keys.includes(`${prop}Style`)) {
    //         p[`${prop}Style`] = "solid"
    //     }
    //     return p
    // }
}

export default getProps