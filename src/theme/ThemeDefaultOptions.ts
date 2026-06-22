import { colorScale } from "hueforge";
import { ThemeOptionInput, ThemeOptions } from "./types";

const elevations = {
  xs: { contact: { y: 1, blur: 2 }, ambient: { y: 1, blur: 3 } },
  sm: { contact: { y: 1, blur: 3 }, ambient: { y: 4, blur: 8 } },
  md: { contact: { y: 2, blur: 4 }, ambient: { y: 8, blur: 16 } },
  lg: { contact: { y: 4, blur: 8 }, ambient: { y: 16, blur: 32 } },
  xl: { contact: { y: 6, blur: 12 }, ambient: { y: 24, blur: 48 } },
};

const make = (rgb: any, contactAlpha: any, ambientAlpha: any) =>
  Object.fromEntries(
    Object.entries(elevations).map(([key, e]) => {
      const c = `0px ${e.contact.y}px ${e.contact.blur}px 0px rgba(${rgb},${contactAlpha})`;
      const a = `0px ${e.ambient.y}px ${e.ambient.blur}px 0px rgba(${rgb},${ambientAlpha})`;
      return [key, `${c}, ${a}`];
    }),
  );

export const lightShadows = make("15,23,42", 0.14, 0.1) as any;
export const darkShadows = make("0,0,0", 0.22, 0.18) as any;
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

const darkThemeDefaultColor = colorScale("#6b7280");
const lightThemeDefaultColor = Object.fromEntries(
  Object.entries(darkThemeDefaultColor).map(([key, value], index, arr) => [
    arr[arr.length - 1 - index][0],
    value,
  ]),
);

const brand = colorScale("#3b82f6");
const accent = colorScale("#f59e0b");
const info = colorScale("#0ea5e9");
const success = colorScale("#22c55e");
const warning = colorScale("#eab308");
const danger = colorScale("#ef4444");

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
