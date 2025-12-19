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
                cursor: "default!important",
                userSelect: "none!important",
                opacity: "0.5!important",
                color: `text.primary!important`,
                borderColor: `divider.secondary!important`,
            }

            if ((_css as any).bgcolor && (_css as any).bgcolor !== 'transparent') {
                c.bgcolor = `divider.primary!important`
            }
            return c
        }
        return {}
    }


    if (prop === "spacing" && typeof value === "number") {
        const val = value * 8;
        const isFlex =
            (_css as any)?.flexBox ||
            (_css as any)?.flexRow ||
            (_css as any)?.flexColumn ||
            (_css as any)?.display === "flex";

        if (isFlex) {
            const isColumn = (_css as any)?.flexColumn === true;

            return {
                ...(isColumn
                    ? { marginTop: `-${val}px${important || ""}` }
                    : { marginLeft: `-${val}px${important || ""}` }),

                "& > *": isColumn
                    ? { marginTop: `${val}px${important || ""}` }
                    : { marginLeft: `${val}px${important || ""}` },
            } as any;
        }

        // non-flex fallback (safe & predictable)
        return {
            "& > * + *": {
                marginTop: `${val}px${important || ""}`,
            },
        } as any;
    }


    if (value && typeof value === "number" && ["border", "borderRight", "borderLeft", "borderTop", "borderBottom"].includes(prop as any)) {
        const keys: any = Object.keys(_css)
        let p: any = {
            [`borderWidth`]: value + 'px' + (important || ""),
        }
        if (!keys.includes(`borderColor`)) {
            p[`borderColor`] = "divider.primary"
        }
        if (!keys.includes(`borderStyle`)) {
            p[`borderStyle`] = "solid"
        }
        return p
    }
}

export default getProps