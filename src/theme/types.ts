import { BreakpointKeys, GlobalCSS } from "../css/types";

export type ObjectType = { [key: string]: any }

export type ThemeColorItem = {
    primary: string;
    secondary: string;
    text: string;
    alpha: string;
    template: {
        outline: {
            bgcolor: string;
            color: string;
            border: number;
            borderColor: string;
            hover: {
                bgcolor: string,
                color: string,
            }
        },
        fill: {
            bgcolor: string;
            color: string,
            hover: {
                bgcolor: string;
                color: string;
            }
        },
        text: {
            bgcolor: string;
            color: string;
            hover: {
                bgcolor: string;
                color: string;
            }
        },
        alpha: {
            bgcolor: string
            color: string;
            hover: {
                bgcolor: string;
                color: string;
            }
        }
    }
}

export type ThemeTypographyItem = {
    fontSize: number;
    lineHeight: number;
    fontWeight: number;
}

export type ThemeColor = {
    text: Omit<ThemeColorItem, "text" | "alpha" | "template">;
    divider: string;
    background: Omit<ThemeColorItem, "text">;
    surface: Omit<ThemeColorItem, "text">;
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
    text?: Omit<ThemeColorItemInput, "text">
    divider?: string;
    background?: Omit<ThemeColorItemInput, "text">
    surface?: Omit<ThemeColorItemInput, "text">
    brand?: ThemeColorItemInput;
    accent?: ThemeColorItemInput;
    success?: ThemeColorItemInput
    info?: ThemeColorItemInput
    warning?: ThemeColorItemInput
    danger?: ThemeColorItemInput
};
export type ThemeTypographyInputType = {
    fontFamily?: string,
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
    | "text"
    | "text.primary"
    | "text.secondary"

    | "background"
    | "background.primary"
    | "background.secondary"

    | "surface"
    | "surface.primary"
    | "surface.secondary"

    | "brand"
    | "brand.primary"
    | "brand.secondary"
    | "brand.alpha"
    | "brand.text"

    | "accent"
    | "accent.primary"
    | "accent.secondary"
    | "accent.alpha"
    | "accent.text"

    | "info"
    | "info.primary"
    | "info.secondary"
    | "info.alpha"
    | "info.text"

    | "success"
    | "success.primary"
    | "success.secondary"
    | "success.alpha"
    | "success.text"

    | "warning"
    | "warning.primary"
    | "warning.secondary"
    | "warning.alpha"
    | "warning.text"

    | "danger"
    | "danger.primary"
    | "danger.secondary"
    | "danger.alpha"
    | "danger.text"