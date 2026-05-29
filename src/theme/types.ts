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
  | "primary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "danger";
export type ThemeColorOption = {
  base: string;
  surface: string;
  subtle: string;
  elevated: string;
  emphasis: string;
  contrast: string;
  muted: string;
  ghost: string;
  divider: string;
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
