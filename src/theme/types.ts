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

export type ColorCode =
  | `#${string}`
  | `rgb(${string})`
  | `hsl(${string})`
  | `oklch(${string})`;
export type ThemeColorNeutralNames =
  | "Slate"
  | "Gray"
  | "Zinc"
  | "Neutral"
  | "Stone";
export type ThemeColorValue = {
  primary: ColorCode;
  secondary: ColorCode;
};
export type ThemeColorVariantValue = ThemeColorValue & {
  contrast: ColorCode;
  ghost: ThemeColorValue;
};
export type ThemeColorInputVariantValue = ThemeColorValue & {
  contrast?: ColorCode;
};

export type ThemeOptionColors = {
  neutral: {
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
  };
  surface: ThemeColorValue;
  paper: ThemeColorValue;
  text: ThemeColorValue;
  divider: ThemeColorValue;
  brand: ThemeColorVariantValue;
  accent: ThemeColorVariantValue;
  info: ThemeColorVariantValue;
  success: ThemeColorVariantValue;
  warning: ThemeColorVariantValue;
  danger: ThemeColorVariantValue;
};
export type ThemeOptionColorNeutralInput = ThemeColorNeutralNames | ColorCode;
export type ThemeOptionColorsInput = {
  neutral?: ThemeOptionColorNeutralInput;
  surface?: ThemeColorValue;
  paper?: ThemeColorValue;
  text?: ThemeColorValue;
  divider?: ThemeColorValue;
  brand?: ThemeColorInputVariantValue | ColorCode;
  accent?: ThemeColorInputVariantValue | ColorCode;
  info?: ThemeColorInputVariantValue | ColorCode;
  success?: ThemeColorInputVariantValue | ColorCode;
  warning?: ThemeColorInputVariantValue | ColorCode;
  danger?: ThemeColorInputVariantValue | ColorCode;
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
  colors: ThemeOptionColors;
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
  colors?: ThemeOptionColorsInput;
  typography?: Record<TypographyRefTypes, ThemeTypographyItem>;
};

type ColorKeys = "surface" | "paper" | "text" | "divider";
type ColorVariantKeys =
  | "brand"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "danger";

export type ColorsRefTypes =
  | "Neutral.1"
  | "Neutral.2"
  | "Neutral.3"
  | "Neutral.4"
  | "Neutral.5"
  | "Neutral.6"
  | "Neutral.7"
  | "Neutral.8"
  | "Neutral.9"
  | "Neutral.10"
  | ColorKeys
  | `${ColorKeys}.secondary`
  | ColorVariantKeys
  | `${ColorVariantKeys}.secondary`
  | `${ColorVariantKeys}.ghost`
  | `${ColorVariantKeys}.ghost.secondary`;
