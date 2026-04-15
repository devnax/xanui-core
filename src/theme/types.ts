import { BreakpointKeys, GlobalCSS } from "../css/types";
export type ObjectType = { [key: string]: any }

export type BaseTypographyKeys = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "big" | "text" | "button" | "small"
export type ThemeTypographyItem = {
    fontSize: number;
    lineHeight: number;
    fontWeight: number;
}

export type ThemeColorKeys = "surface" | "primary" | "info" | "success" | "warning" | "danger"
export type ThemeColorOption = {
    main: string;
    light: string;
    dark: string;
    contrast: string;
    muted: string;
    divider: string;
    ghost: string;
}


export type ThemeInterface<T = any> = (defaultProps: T, theme: ThemeOptions) => T;

export interface ThemeOptions {
    name: string;
    mode?: "dark" | "light";
    rtl: boolean;
    globalStyle: GlobalCSS,
    breakpoints: { [key in BreakpointKeys]: number };
    shadow: string[];
    interfaces: Record<string, ThemeInterface>;
    colors: Record<ThemeColorKeys, ThemeColorOption>;
    typography: Record<BaseTypographyKeys, ThemeTypographyItem>;
    change: (theme: ThemeOptionInput) => void;
}

export type ThemeOptionInput = Omit<Partial<ThemeOptions>, "breakpoints" | "change">


// ============ Reference Types
export type TypographyRefTypes =
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "big"
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
