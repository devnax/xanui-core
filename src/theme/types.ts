import { BreakpointKeys, GlobalCSS } from "../css/types";

export type ObjectType = { [key: string]: any }

export type ThemeColorItem = {
    primary: string;
    secondary: string;
    alpha: string;
    divider: string;
    text: string
}

export type ThemeTypographyItem = {
    fontSize: number;
    lineHeight: number;
    fontWeight: number;
}

export type ThemeColor = {
    common: ThemeColorItem;
    surface: ThemeColorItem;
    brand: ThemeColorItem;
    accent: ThemeColorItem;
    success: ThemeColorItem
    info: ThemeColorItem
    warning: ThemeColorItem
    danger: ThemeColorItem
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
    rtl: boolean;
    globalStyle: GlobalCSS,
    breakpoints: { [key in BreakpointKeys]: number };
    shadow: string[];
    interfaces: { [name: string]: <P extends object>(defaultProps: P, theme: ThemeOptions) => P };
    colors: ThemeColor;
    typography: ThemeTypographyType;
}

// Theme Input
export type ThemeColorItemInput = Partial<Omit<ThemeColorItem, "alpha">>
export type ThemeTypographyItemInput = Partial<ThemeTypographyItem>
export type ThemeColorInput = {
    common?: ThemeColorItemInput;
    surface?: ThemeColorItemInput;
    brand?: ThemeColorItemInput;
    accent?: ThemeColorItemInput;
    success?: ThemeColorItemInput
    info?: ThemeColorItemInput
    warning?: ThemeColorItemInput
    danger?: ThemeColorItemInput
};
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
    | "common.primary"
    | "common.secondary"
    | "common.alpha"
    | "common.divider"
    | "common.text"

    | "surface"
    | "surface.primary"
    | "surface.secondary"
    | "surface.divider"
    | "surface.alpha"
    | "surface.text"

    | "brand"
    | "brand.primary"
    | "brand.secondary"
    | "brand.alpha"
    | "brand.divider"
    | "brand.text"

    | "accent"
    | "accent.primary"
    | "accent.secondary"
    | "accent.alpha"
    | "accent.divider"
    | "accent.text"

    | "info"
    | "info.primary"
    | "info.secondary"
    | "info.alpha"
    | "info.divider"
    | "info.text"

    | "success"
    | "success.primary"
    | "success.secondary"
    | "success.alpha"
    | "success.divider"
    | "success.text"

    | "warning"
    | "warning.primary"
    | "warning.secondary"
    | "warning.alpha"
    | "warning.divider"
    | "warning.text"

    | "danger"
    | "danger.primary"
    | "danger.secondary"
    | "danger.alpha"
    | "danger"
    | "danger.text.primary"