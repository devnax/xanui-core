import { BreakpointKeys, GlobalCSS } from "../css/types";

export type ObjectType = { [key: string]: any }

export type ThemeColorItem = {
    primary: string;
    secondary: string;
    text: string
}

export type ThemeTypographyItem = {
    fontSize: number;
    lineHeight: number;
    fontWeight: number;
}

export type ThemeColor = {
    common: Omit<ThemeColorItem, "text">;
    text: Omit<ThemeColorItem, "text">;
    divider: Omit<ThemeColorItem, "text">;
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
    text?: Omit<ThemeColorItem, "text">;
    divider?: Omit<ThemeColorItem, "text">;
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

    | "common.primary"
    | "common.secondary"

    | "text.primary"
    | "text.secondary"

    | "divider.primary"
    | "divider.secondary"

    | "brand.primary"
    | "brand.secondary"
    | "brand.text"

    | "accent.primary"
    | "accent.secondary"
    | "accent.text"

    | "info.primary"
    | "info.secondary"
    | "info.text"

    | "success.primary"
    | "success.secondary"
    | "success.text"

    | "warning.primary"
    | "warning.secondary"
    | "warning.text"

    | "danger.primary"
    | "danger.secondary"
    | "danger.text.primary"