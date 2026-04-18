import { breakpoints } from "../css";
import { ThemeOptions } from "./types";

const ThemeCssVars = (theme: ThemeOptions) => {
    const vars: any = {}

    const bnames = Object.keys(breakpoints)
    for (let name of bnames) {
        if (name in theme.breakpoints) {
            vars[`--bp-${name}`] = (theme as any).breakpoints[name]
        }
    }

    const typoNames = ["h1", "h2", "h3", "h4", "h5", "h6", "big", "text", "button", "small"]
    const typoKeys = ["fontSize", "fontWeight", "lineHeight"]
    for (let tname of typoNames) {
        if (tname in theme.typography) {
            for (let key of typoKeys) {
                const v = (theme as any).typography[tname]
                if (key in v) {
                    let px = key === "fontSize" ? "px" : ""
                    vars[`--${key.toLowerCase()}-${tname}`] = `${(theme as any).typography[tname][key]}${px}`
                }
            }
        }
    }

    const colorNames = ["surface", "primary", "accent", "success", "info", "warning", "danger"]
    const colorKeys = ["main", "light", "dark", "secondary", "contrast", "muted", "disabled", "divider", "ghost"]
    for (let cname of colorNames) {
        if (cname in theme.colors) {
            if ("main" in (theme as any).colors[cname]) {
                vars[`--color-${cname}`] = (theme as any).colors[cname]["main"]
            }

            for (let key of colorKeys) {
                if (key in (theme as any).colors[cname]) {
                    vars[`--color-${cname}-${key}`] = (theme as any).colors[cname][key]
                }
            }
        }
    }

    theme.shadow?.forEach((s, i) => vars[`--shadow-${i}`] = s)

    return vars
}

export default ThemeCssVars