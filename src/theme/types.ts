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

export type ThemeColorKeys =
  | "default"
  | "brand"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "danger";

export type ThemeColorOption = {
  main: string; // 500
  light: string; // 400
  dark: string; // 700
  contrast: string; // 50
  muted: string; // 400
  divider: string; // 200

  shades: {
    1: string; // 50
    2: string; // 100
    3: string; // 300
    4: string; // 600
    5: string; // 800
  };
};

export type ThemeMode = "dark" | "light";

export type ThemeComponents<T = any> = (
  defaultProps: T,
  theme: ThemeOptions,
) => T;

export type ThemeOptions = {
  name: string;
  mode?: ThemeMode;
  rtl: boolean;
  globalStyle: GlobalCSS;
  breakpoints: { [key in BreakpointKeys]: number };
  shadow: string[];
  components: Record<string, ThemeComponents>;
  colors: Record<ThemeColorKeys, ThemeColorOption>;
  typography: Record<TypographyRefTypes, ThemeTypographyItem>;
  update: (theme: ThemeOptionInput) => void;
};

export type ThemeOptionInput = {
  name?: string;
  mode?: ThemeMode;
  rtl?: boolean;
  globalStyle?: GlobalCSS;
  shadow?: string[];
  components?: Record<string, ThemeComponents>;
  colors?: Partial<Record<ThemeColorKeys, string | Partial<ThemeColorOption>>>;
  typography?: Record<TypographyRefTypes, ThemeTypographyItem>;
};

type ColorRole = ThemeColorKeys;
type ColorVariant = keyof ThemeColorOption;

export type ColorsRefTypes = ColorRole | `${ColorRole}.${ColorVariant}`;
