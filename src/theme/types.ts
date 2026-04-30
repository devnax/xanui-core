import { BreakpointKeys, GlobalCSS } from "../css/types";
export type ObjectType = { [key: string]: any }

export type BaseTypographyKeys = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "big" | "text" | "button" | "small"
export type ThemeTypographyItem = {
    fontSize: number;
    lineHeight: number;
    fontWeight: number;
}

export type ThemeColorKeys = "default" | "primary" | "accent" | "info" | "success" | "warning" | "danger"
export type ThemeColorOption = {
    main: string;
    light: string;
    dark: string;
    contrast: string;
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

    | "default"
    | "default.base"
    | "default.surface"
    | "default.subtle"
    | "default.elevated"
    | "default.emphasis"
    | "default.contrast"
    | "default.muted"
    | "default.divider"
    | "default.ghost"

    | "primary"
    | "primary.base"
    | "primary.surface"
    | "primary.subtle"
    | "primary.elevated"
    | "primary.emphasis"
    | "primary.contrast"
    | "primary.muted"
    | "primary.divider"
    | "primary.ghost"

    | "accent"
    | "accent.base"
    | "accent.surface"
    | "accent.subtle"
    | "accent.elevated"
    | "accent.emphasis"
    | "accent.contrast"
    | "accent.muted"
    | "accent.divider"
    | "accent.ghost"

    | "success"
    | "success.base"
    | "success.surface"
    | "success.subtle"
    | "success.elevated"
    | "success.emphasis"
    | "success.contrast"
    | "success.muted"
    | "success.divider"
    | "success.ghost"

    | "info"
    | "info.base"
    | "info.surface"
    | "info.subtle"
    | "info.elevated"
    | "info.emphasis"
    | "info.contrast"
    | "info.muted"
    | "info.divider"
    | "info.ghost"

    | "warning"
    | "warning.base"
    | "warning.surface"
    | "warning.subtle"
    | "warning.elevated"
    | "warning.emphasis"
    | "warning.contrast"
    | "warning.muted"
    | "warning.divider"
    | "warning.ghost"

    | "danger"
    | "danger.base"
    | "danger.surface"
    | "danger.subtle"
    | "danger.elevated"
    | "danger.emphasis"
    | "danger.contrast"
    | "danger.muted"
    | "danger.divider"
    | "danger.ghost"