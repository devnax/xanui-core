import { BreakpointKeys, GlobalCSS } from "../css/types";
export type ObjectType = { [key: string]: any }

export type BaseTypographyKeys = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "big" | "text" | "button" | "small"
export type ThemeTypographyItem = {
    fontSize: number;
    lineHeight: number;
    fontWeight: number;
}

export type ThemeColorKeys = "surface" | "primary" | "accent" | "info" | "success" | "warning" | "danger"
export type ThemeColorOption = {
    main: string;
    light: string;
    dark: string;
    contrast: string;
    secondary: string;
    muted: string;
    disabled: string;
    divider: string;
    ghost: string;
}


export type ThemeInterface<T = any> = (defaultProps: T, theme: ThemeOptions) => T;
export type ThemeMode = "dark" | "light"
export type ThemeOptions = {
    name: string;
    mode?: ThemeMode;
    rtl: boolean;
    globalStyle: GlobalCSS,
    breakpoints: { [key in BreakpointKeys]: number };
    shadow: string[];
    interfaces: Record<string, ThemeInterface>;
    colors: Record<ThemeColorKeys, ThemeColorOption>;
    typography: Record<BaseTypographyKeys, ThemeTypographyItem>;
    change: (theme: ThemeOptionInput) => void;
}

export type ThemeOptionInput = {
    name?: string;
    mode?: ThemeMode;
    rtl?: boolean;
    globalStyle?: GlobalCSS,
    shadow?: string[];
    interfaces?: Record<string, ThemeInterface>;
    colors?: Partial<Record<ThemeColorKeys, string | Partial<ThemeColorOption>>>;
    typography?: Record<BaseTypographyKeys, ThemeTypographyItem>;
}


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

    | "surface"
    | "surface.main"
    | "surface.light"
    | "surface.dark"
    | "surface.contrast"
    | "surface.secondary"
    | "surface.muted"
    | "surface.disabled"
    | "surface.divider"
    | "surface.ghost"

    | "primary"
    | "primary.main"
    | "primary.light"
    | "primary.dark"
    | "primary.contrast"
    | "primary.secondary"
    | "primary.muted"
    | "primary.disabled"
    | "primary.divider"
    | "primary.ghost"

    | "accent"
    | "accent.main"
    | "accent.light"
    | "accent.dark"
    | "accent.contrast"
    | "accent.secondary"
    | "accent.muted"
    | "accent.disabled"
    | "accent.divider"
    | "accent.ghost"

    | "success"
    | "success.main"
    | "success.light"
    | "success.dark"
    | "success.contrast"
    | "success.secondary"
    | "success.muted"
    | "success.disabled"
    | "success.divider"
    | "success.ghost"

    | "info"
    | "info.main"
    | "info.light"
    | "info.dark"
    | "info.contrast"
    | "info.secondary"
    | "info.muted"
    | "info.disabled"
    | "info.divider"
    | "info.ghost"

    | "warning"
    | "warning.main"
    | "warning.light"
    | "warning.dark"
    | "warning.contrast"
    | "warning.secondary"
    | "warning.muted"
    | "warning.disabled"
    | "warning.divider"
    | "warning.ghost"

    | "danger"
    | "danger.main"
    | "danger.light"
    | "danger.dark"
    | "danger.contrast"
    | "danger.secondary"
    | "danger.muted"
    | "danger.disabled"
    | "danger.divider"
    | "danger.ghost"