import { BreakpointKeys, GlobalCSS } from "../css/types";
export type ObjectType = { [key: string]: any }


export type ThemeTypographyItem = {
    fontSize: number;
    lineHeight: number;
    fontWeight: number;
}


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

export type ThemeColorOption = {
    primary: string;
    secondary: string;
    text: string;
}
export type ThemeOptionsColor = ThemeColorOption & {
    soft: {
        primary: string;
        secondary: string;
    }
}
export interface ThemeOptions {
    name: string;
    rtl: boolean;
    globalStyle: GlobalCSS,
    breakpoints: { [key in BreakpointKeys]: number };
    shadow: string[];
    interfaces: { [name: string]: <P extends object>(defaultProps: P, theme: ThemeOptions) => P };
    colors: {
        background: Omit<ThemeOptionsColor, 'text'>;
        text: Omit<ThemeOptionsColor, 'text'>;
        divider: Omit<ThemeOptionsColor, 'text'>;
        brand: ThemeOptionsColor;
        accent: ThemeOptionsColor;
        success: ThemeOptionsColor
        info: ThemeOptionsColor
        warning: ThemeOptionsColor
        danger: ThemeOptionsColor
    };
    typography: ThemeTypographyType;
}


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
    colors?: {
        background?: Omit<ThemeColorOption, 'text'>;
        text?: Omit<ThemeColorOption, 'text'>;
        divider?: Omit<ThemeColorOption, 'text'>;
        brand?: ThemeColorOption
        accent?: ThemeColorOption
        success?: ThemeColorOption
        info?: ThemeColorOption
        warning?: ThemeColorOption
        danger?: ThemeColorOption
    };
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

    | "background"
    | "background.primary"
    | "background.secondary"

    | "text"
    | "text.primary"
    | "text.secondary"

    | "divider"
    | "divider.primary"
    | "divider.secondary"
    | "divider.soft.primary"
    | "divider.soft.secondary"

    | "brand"
    | "brand.primary"
    | "brand.secondary"
    | "brand.text"
    | "brand.soft.primary"
    | "brand.soft.secondary"

    | "accent"
    | "accent.primary"
    | "accent.secondary"
    | "accent.text"
    | "accent.soft.primary"
    | "accent.soft.secondary"

    | "info"
    | "info.primary"
    | "info.secondary"
    | "info.text"
    | "info.soft.primary"
    | "info.soft.secondary"

    | "success"
    | "success.primary"
    | "success.secondary"
    | "success.text"
    | "success.soft.primary"
    | "success.soft.secondary"

    | "warning"
    | "warning.primary"
    | "warning.secondary"
    | "warning.text"
    | "warning.soft.primary"
    | "warning.soft.secondary"

    | "danger"
    | "danger.primary"
    | "danger.secondary"
    | "danger.text"
    | "danger.soft.primary"
    | "danger.soft.secondary"
