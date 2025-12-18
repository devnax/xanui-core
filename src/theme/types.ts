import { BreakpointKeys, GlobalCSS } from "../css/types";
import { ColorScale } from "./createColorScale";
export type ObjectType = { [key: string]: any }




export type ThemeTypographyItem = {
    fontSize: number;
    lineHeight: number;
    fontWeight: number;
}

export type ThemeColor = {
    common: ColorScale;
    brand: ColorScale;
    accent: ColorScale;
    success: ColorScale
    info: ColorScale
    warning: ColorScale
    danger: ColorScale
};

export type ThemeTypographyType = {
    h1: ThemeTypographyItem;
    h2: ThemeTypographyItem;
    h3: ThemeTypographyItem;
    h4: ThemeTypographyItem;
    h5: ThemeTypographyItem;
    h6: ThemeTypographyItem;
    big: ThemeTypographyItem;
    text: ThemeTypographyItem;
    button: ThemeTypographyItem;
    small: ThemeTypographyItem;
}

export interface ThemeOptions {
    name: string;
    isDark: boolean;
    rtl: boolean;
    globalStyle: GlobalCSS,
    breakpoints: { [key in BreakpointKeys]: number };
    shadow: string[];
    interfaces: { [name: string]: <P extends object>(defaultProps: P, theme: ThemeOptions) => P };
    colors: ThemeColor;
    typography: ThemeTypographyType;
}


// Theme Input
export type ThemeColorItemInput = string | {
    base: string;
    light?: string;
    lighter?: string;
    dark?: string;
    darker?: string;
    soft?: string;
    softer?: string;
    text?: string;
    subtext?: string;
};

export type ThemeColorInput = {
    common?: ThemeColorItemInput;
    brand?: ThemeColorItemInput;
    accent?: ThemeColorItemInput;
    success?: ThemeColorItemInput
    info?: ThemeColorItemInput
    warning?: ThemeColorItemInput
    danger?: ThemeColorItemInput
};

export type ThemeTypographyItemInput = Partial<ThemeTypographyItem>

export type ThemeTypographyInputType = {
    h1?: ThemeTypographyItemInput;
    h2?: ThemeTypographyItemInput;
    h3?: ThemeTypographyItemInput;
    h4?: ThemeTypographyItemInput;
    h5?: ThemeTypographyItemInput;
    h6?: ThemeTypographyItemInput;
    text?: ThemeTypographyItemInput;
    button?: ThemeTypographyItemInput;
    small?: ThemeTypographyItemInput;
};
export interface ThemeOptionInput {
    rtl?: boolean;
    globalStyle?: GlobalCSS,
    interfaces?: { [name: string]: <P extends object>(defaultProps: P, theme: ThemeOptions) => P };
    colors?: ThemeColorInput;
    typography?: ThemeTypographyInputType;
}

// ============ Reference Types

export type TypographyRefTypes =
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "text"
    | "button"
    | "small"

export type ColorsRefTypes =

    | "common"
    | "common.light"
    | "common.lighter"
    | "common.dark"
    | "common.darker"
    | "common.soft"
    | "common.softer"
    | "common.text"
    | "common.subtext"

    | "brand"
    | "brand.light"
    | "brand.lighter"
    | "brand.dark"
    | "brand.darker"
    | "brand.soft"
    | "brand.softer"
    | "brand.text"
    | "brand.subtext"

    | "accent"
    | "accent.light"
    | "accent.lighter"
    | "accent.dark"
    | "accent.darker"
    | "accent.soft"
    | "accent.softer"
    | "accent.text"
    | "accent.subtext"

    | "info"
    | "info.light"
    | "info.lighter"
    | "info.dark"
    | "info.darker"
    | "info.soft"
    | "info.softer"
    | "info.text"
    | "info.subtext"

    | "success"
    | "success.light"
    | "success.lighter"
    | "success.dark"
    | "success.darker"
    | "success.soft"
    | "success.softer"
    | "success.text"
    | "success.subtext"

    | "warning"
    | "warning.light"
    | "warning.lighter"
    | "warning.dark"
    | "warning.darker"
    | "warning.soft"
    | "warning.softer"
    | "warning.text"
    | "warning.subtext"

    | "danger"
    | "danger.light"
    | "danger.lighter"
    | "danger.dark"
    | "danger.darker"
    | "danger.soft"
    | "danger.softer"
    | "danger.text"
    | "danger.subtext"
