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
    | "surface.lighter"
    | "surface.dark"
    | "surface.darker"
    | "surface.contrast"
    | "surface.muted"
    | "surface.divider"
    | "surface.ghost"

    | "primary"
    | "primary.main"
    | "primary.light"
    | "primary.lighter"
    | "primary.dark"
    | "primary.darker"
    | "primary.contrast"
    | "primary.muted"
    | "primary.divider"
    | "primary.ghost"

    | "accent"
    | "accent.main"
    | "accent.light"
    | "accent.lighter"
    | "accent.dark"
    | "accent.darker"
    | "accent.contrast"
    | "accent.muted"
    | "accent.divider"
    | "accent.ghost"

    | "success"
    | "success.main"
    | "success.light"
    | "success.lighter"
    | "success.dark"
    | "success.darker"
    | "success.contrast"
    | "success.muted"
    | "success.divider"
    | "success.ghost"

    | "info"
    | "info.main"
    | "info.light"
    | "info.lighter"
    | "info.dark"
    | "info.darker"
    | "info.contrast"
    | "info.muted"
    | "info.divider"
    | "info.ghost"

    | "warning"
    | "warning.main"
    | "warning.light"
    | "warning.lighter"
    | "warning.dark"
    | "warning.darker"
    | "warning.contrast"
    | "warning.muted"
    | "warning.divider"
    | "warning.ghost"

    | "danger"
    | "danger.main"
    | "danger.light"
    | "danger.lighter"
    | "danger.dark"
    | "danger.darker"
    | "danger.contrast"
    | "danger.muted"
    | "danger.divider"
    | "danger.ghost"