import { BreakpointKeys, GlobalCSS } from "../css/types";
export type ObjectType = { [key: string]: any };

export type TypographyRefTypes =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6";

export type ThemeTypographyItem = {
  fontSize: number;
  lineHeight: number;
  fontWeight: number;
};

export type ColorScale = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
};
export type ThemeColorKeys =
  | "default"
  | "brand"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "danger";

export type ThemeColorOption = {
  primary: string;
  secondary: string;
  contrast: string;
  muted: string;
  divider: string;
  ghost: string;
  paper: string;
  surface: string;

  shades: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
    10: string;
    11: string;
  };
};

export type ThemeMode = "dark" | "light";

export type ThemeComponents<T = any> = (
  defaultProps: T,
  theme: ThemeOptions,
) => T;

export type ThemeOptions = {
  name: string;
  mode: ThemeMode;
  rtl: boolean;
  globalStyle: GlobalCSS;
  breakpoints: { [key in BreakpointKeys]: number };
  shadow: { [key in BreakpointKeys]: string };
  radius: { [key in BreakpointKeys]: number };
  spacing: { [key in BreakpointKeys]: number };
  components: Record<string, ThemeComponents>;
  colors: Record<ThemeColorKeys, ThemeColorOption>;
  typography: Record<TypographyRefTypes, ThemeTypographyItem>;
  update: (theme: ThemeOptionInput) => void;
};

export type ThemeOptionInput = {
  name?: string;
  mode: ThemeMode;
  rtl?: boolean;
  globalStyle?: GlobalCSS;
  shadow?: { [key in BreakpointKeys]: string };
  radius?: { [key in BreakpointKeys]: number };
  spacing?: { [key in BreakpointKeys]: number };
  components?: Record<string, ThemeComponents>;
  colors?: Partial<Record<ThemeColorKeys, string | ColorScale>>;
  typography?: Record<TypographyRefTypes, ThemeTypographyItem>;
};

type ColorRole = ThemeColorKeys;
type ColorVariant = keyof Omit<ThemeColorOption, "shades">;
export type ColorsRefTypes =
  | ColorRole
  | `${ColorRole}.${ColorVariant}`
  | `${ColorRole}.${number}`;
