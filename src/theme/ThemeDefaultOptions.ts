import { ThemeOptionInput, ThemeOptions } from "./types";
import { createColorPalette } from "./palette";

const shadows = {
  light: {
    xs: "rgba(0, 0, 0, 0.08) 0px 1px 3px 0px, rgba(0, 0, 0, 0.04) 0px 1px 2px 0px",
    sm: "rgba(0, 0, 0, 0.08) 0px 4px 6px -1px, rgba(0, 0, 0, 0.04) 0px 2px 4px -1px",
    md: "rgba(0, 0, 0, 0.10) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    lg: "rgba(0, 0, 0, 0.12) 0px 20px 25px -5px, rgba(0, 0, 0, 0.06) 0px 10px 10px -5px",
    xl: "rgba(0, 0, 0, 0.16) 0px 25px 50px -12px",
  },

  dark: {
    xs: "rgba(0, 0, 0, 0.45) 0px 1px 3px 0px, rgba(0, 0, 0, 0.30) 0px 1px 2px 0px",
    sm: "rgba(0, 0, 0, 0.55) 0px 4px 6px -1px, rgba(0, 0, 0, 0.35) 0px 2px 4px -1px",
    md: "rgba(0, 0, 0, 0.65) 0px 10px 15px -3px, rgba(0, 0, 0, 0.45) 0px 4px 6px -2px",
    lg: "rgba(0, 0, 0, 0.75) 0px 20px 25px -5px, rgba(0, 0, 0, 0.55) 0px 10px 10px -5px",
    xl: "rgba(0, 0, 0, 0.85) 0px 25px 50px -12px",
  },
};

const radius = {
  xs: "6px",
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "24px",
};

const spacing = {
  xs: "4px",
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "24px",
};

export const ThemeTypography: ThemeOptions["typography"] = {
  xs: {
    fontSize: 12,
    lineHeight: 1.4,
    fontWeight: 400,
  },
  sm: {
    fontSize: 14,
    lineHeight: 1.45,
    fontWeight: 400,
  },
  md: {
    fontSize: 16,
    lineHeight: 1.5,
    fontWeight: 400,
  },
  lg: {
    fontSize: 18,
    lineHeight: 1.55,
    fontWeight: 400,
  },
  xl: {
    fontSize: 20,
    lineHeight: 1.6,
    fontWeight: 400,
  },

  h1: { fontSize: 48, lineHeight: 1.3, fontWeight: 600 },
  h2: { fontSize: 40, lineHeight: 1.35, fontWeight: 500 },
  h3: { fontSize: 34, lineHeight: 1.4, fontWeight: 500 },
  h4: { fontSize: 28, lineHeight: 1.45, fontWeight: 500 },
  h5: { fontSize: 24, lineHeight: 1.5, fontWeight: 500 },
  h6: { fontSize: 20, lineHeight: 1.55, fontWeight: 500 },
};

const darkThemeDefaultColor = createColorPalette("#64748b");
const lightThemeDefaultColor = createColorPalette("#64748b", true);

const brand = createColorPalette("#3b82f6");
const accent = createColorPalette("#f59e0b");
const info = createColorPalette("#0ea5e9");
const success = createColorPalette("#22c55e");
const warning = createColorPalette("#eab308");
const danger = createColorPalette("#ef4444");

export const lightThemeOptions: ThemeOptionInput = {
  mode: "light",
  rtl: false,
  shadow: shadows.dark as any,
  radius: radius as any,
  spacing: spacing as any,
  globalStyle: {},
  colors: {
    default: lightThemeDefaultColor,
    brand,
    accent,
    success,
    info,
    warning,
    danger,
  },
  typography: ThemeTypography,
  components: {},
} as ThemeOptionInput;

export const darkThemeOptions: ThemeOptionInput = {
  mode: "dark",
  rtl: false,
  shadow: shadows.light as any,
  radius: radius as any,
  spacing: spacing as any,
  globalStyle: {},
  colors: {
    default: darkThemeDefaultColor,
    brand,
    accent,
    success,
    info,
    warning,
    danger,
  },
  typography: ThemeTypography,
  components: {},
} as ThemeOptionInput;
