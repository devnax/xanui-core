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
  primary: string; // 500
  secondary: string; // 700
  contrast: string; // 50
  muted: string; // 400
  divider: string; // 200
  ghost: string; // 200

  shades: {
    1: string; // 100
    2: string; // 300
    3: string; // 600
    4: string; // 800
    5: string; // 900
    6: string; // 950
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
  | `${ColorRole}.1`
  | `${ColorRole}.2`
  | `${ColorRole}.3`
  | `${ColorRole}.4`
  | `${ColorRole}.5`
  | `${ColorRole}.6`;
