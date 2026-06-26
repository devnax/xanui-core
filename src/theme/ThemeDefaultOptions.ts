import { ThemeOptionInput, ThemeOptions } from "./types";

export const shadows = {
  xs: "0 1px 2px rgb(0 0 0 / 0.10), 0 0 1px rgb(0 0 0 / 0.20)",
  sm: "0 2px 4px rgb(0 0 0 / 0.10), 0 0 1px rgb(0 0 0 / 0.30)",
  md: "0 4px 8px rgb(0 0 0 / 0.10), 0 0 1px rgb(0 0 0 / 0.30)",
  lg: "0 8px 16px rgb(0 0 0 / 0.10), 0 0 1px rgb(0 0 0 / 0.30)",
  xl: "0 16px 24px rgb(0 0 0 / 0.10), 0 0 1px rgb(0 0 0 / 0.30)",
  xxl: "0 24px 40px rgb(0 0 0 / 0.16), 0 0 1px rgb(0 0 0 / 0.30)",
};

const radius = {
  xs: "6px",
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "24px",
  xxl: "32px",
};

const spacing = {
  xs: "4px",
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "24px",
  xxl: "32px",
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

export const defaultThemeOptions: ThemeOptionInput = {
  name: "light",
  mode: "light",
  rtl: false,
  shadow: shadows as any,
  radius: radius as any,
  spacing: spacing as any,
  globalStyle: {},
  colors: { neutral: "Gray" },
  typography: ThemeTypography,
  components: {},
};
