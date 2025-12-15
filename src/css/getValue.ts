import { CSSProps } from "./types"

const getColor = (color: string) => {
    return {
        [`${color}`]: `var(--color-${color}-primary)`,
        [`${color}.primary`]: `var(--color-${color}-primary)`,
        [`${color}.secondary`]: `var(--color-${color}-secondary)`,
        [`${color}.alpha`]: `var(--color-${color}-alpha)`,
        [`${color}.divider`]: `var(--color-${color}-divider)`,
        [`${color}.text.primary`]: `var(--color-${color}-text-primary)`,
        [`${color}.text.secondary`]: `var(--color-${color}-text-secondary)`,
    }
}

const withImportant = (important: any, value: any) => important ? value + important : value
const colors: any = {
    ...getColor("common"),
    ...getColor("surface"),
    ...getColor("brand"),
    ...getColor("accent"),
    ...getColor("info"),
    ...getColor("success"),
    ...getColor("warning"),
    ...getColor("danger"),
}

const breakpoints: any = {
    "xs": "var(--bp-xs)",
    "sm": "var(--bp-sm)",
    "md": "var(--bp-md)",
    "lg": "var(--bp-lg)",
    "xl": "var(--bp-xl)"
}

let fontsizes: any = {
    "h1": "var(--fontsize-h1)",
    "h2": "var(--fontsize-h2)",
    "h3": "var(--fontsize-h3)",
    "h4": "var(--fontsize-h4)",
    "h5": "var(--fontsize-h5)",
    "h6": "var(--fontsize-h6)",
    "big": "var(--fontsize-big)",
    "text": "var(--fontsize-text)",
    "button": "var(--fontsize-button)",
    "small": "var(--fontsize-small)"
}

let lineHeights: any = {
    "h1": "var(--lineheight-h1)",
    "h2": "var(--lineheight-h2)",
    "h3": "var(--lineheight-h3)",
    "h4": "var(--lineheight-h4)",
    "h5": "var(--lineheight-h5)",
    "h6": "var(--lineheight-h6)",
    "big": "var(--lineheight-big)",
    "text": "var(--lineheight-text)",
    "button": "var(--lineheight-button)",
    "small": "var(--lineheight-small)"
}

let fontWeights: any = {
    "h1": "var(--fontweight-h1)",
    "h2": "var(--fontweight-h2)",
    "h3": "var(--fontweight-h3)",
    "h4": "var(--fontweight-h4)",
    "h5": "var(--fontweight-h5)",
    "h6": "var(--fontweight-h6)",
    "big": "var(--fontweight-big)",
    "text": "var(--fontweight-text)",
    "button": "var(--fontweight-button)",
    "small": "var(--fontweight-small)"
}

let font: any = {
    "h1": "var(--font-h1)",
    "h2": "var(--font-h2)",
    "h3": "var(--font-h3)",
    "h4": "var(--font-h4)",
    "h5": "var(--font-h5)",
    "h6": "var(--font-h6)",
    "big": "var(--font-big)",
    "text": "var(--font-text)",
    "button": "var(--font-button)",
    "small": "var(--font-small)"
}

const getValue = (prop: any, value: string | number, _css: CSSProps): any => {
    let important;

    if (typeof value === 'string') {
        const split = value.split("!")
        important = split[1] ? "!important" : ""
        value = split[0]
    }


    if (['width', 'maxWidth', 'minWidth', 'max-width', 'min-width'].includes(prop)) {
        return withImportant(important, breakpoints[value] || value)
    } else if (prop === 'font' && typeof value === "string" && ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'text', 'button', 'small'].includes(value)) {
        return withImportant(important, font[value] || value)
    } else if (['fontWeight', 'font-weight'].includes(prop) && typeof value === 'string' && ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'text', 'button', 'small'].includes(value)) {
        return withImportant(important, fontWeights[value] || value)
    } else if (['lineHeight', 'line-height'].includes(prop) && typeof value === 'string' && ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'text', 'button', 'small'].includes(value)) {
        return withImportant(important, lineHeights[value] || value)
    } else if (['fontSize', 'font-size'].includes(prop) && typeof value === 'string') {
        return withImportant(important, fontsizes[value] || value)
    } else if (typeof value === "number" && ["shadow", "boxShadow"].includes(prop)) {
        return withImportant(important, `var(--shadow-${value})`)
    }

    return withImportant(important, colors[value] || value)
}

export default getValue