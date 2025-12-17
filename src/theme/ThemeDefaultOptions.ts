import { ThemeOptionInput, ThemeTypographyType } from './types'

export const lightShadows = [
    "none",
    "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
    "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
    "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
    "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
    "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
    "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
    "0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)",
    "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
    "0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)",
    "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)",
    "0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)",
    "0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)",
    "0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)",
    "0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)",
    "0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)",
    "0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)",
    "0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)",
    "0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)",
    "0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)",
    "0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)",
    "0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)",
    "0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)",
    "0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)",
    "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)",
]

export const darkShadows = [
    "none",
    "0px 2px 1px -1px rgba(255,255,255,0.05),0px 1px 1px 0px rgba(255,255,255,0.04),0px 1px 3px 0px rgba(255,255,255,0.03)",
    "0px 3px 1px -2px rgba(255,255,255,0.05),0px 2px 2px 0px rgba(255,255,255,0.04),0px 1px 5px 0px rgba(255,255,255,0.03)",
    "0px 3px 3px -2px rgba(255,255,255,0.05),0px 3px 4px 0px rgba(255,255,255,0.04),0px 1px 8px 0px rgba(255,255,255,0.03)",
    "0px 2px 4px -1px rgba(255,255,255,0.05),0px 4px 5px 0px rgba(255,255,255,0.04),0px 1px 10px 0px rgba(255,255,255,0.03)",
    "0px 3px 5px -1px rgba(255,255,255,0.05),0px 5px 8px 0px rgba(255,255,255,0.04),0px 1px 14px 0px rgba(255,255,255,0.03)",
    "0px 3px 5px -1px rgba(255,255,255,0.05),0px 6px 10px 0px rgba(255,255,255,0.04),0px 1px 18px 0px rgba(255,255,255,0.03)",
    "0px 4px 5px -2px rgba(255,255,255,0.05),0px 7px 10px 1px rgba(255,255,255,0.04),0px 2px 16px 1px rgba(255,255,255,0.03)",
    "0px 5px 5px -3px rgba(255,255,255,0.05),0px 8px 10px 1px rgba(255,255,255,0.04),0px 3px 14px 2px rgba(255,255,255,0.03)",
    "0px 5px 6px -3px rgba(255,255,255,0.05),0px 9px 12px 1px rgba(255,255,255,0.04),0px 3px 16px 2px rgba(255,255,255,0.03)",
    "0px 6px 6px -3px rgba(255,255,255,0.05),0px 10px 14px 1px rgba(255,255,255,0.04),0px 4px 18px 3px rgba(255,255,255,0.03)",
    "0px 6px 7px -4px rgba(255,255,255,0.05),0px 11px 15px 1px rgba(255,255,255,0.04),0px 4px 20px 3px rgba(255,255,255,0.03)",
    "0px 7px 8px -4px rgba(255,255,255,0.05),0px 12px 17px 2px rgba(255,255,255,0.04),0px 5px 22px 4px rgba(255,255,255,0.03)",
    "0px 7px 8px -4px rgba(255,255,255,0.05),0px 13px 19px 2px rgba(255,255,255,0.04),0px 5px 24px 4px rgba(255,255,255,0.03)",
    "0px 7px 9px -4px rgba(255,255,255,0.05),0px 14px 21px 2px rgba(255,255,255,0.04),0px 5px 26px 4px rgba(255,255,255,0.03)",
    "0px 8px 9px -5px rgba(255,255,255,0.05),0px 15px 22px 2px rgba(255,255,255,0.04),0px 6px 28px 5px rgba(255,255,255,0.03)",
    "0px 8px 10px -5px rgba(255,255,255,0.05),0px 16px 24px 2px rgba(255,255,255,0.04),0px 6px 30px 5px rgba(255,255,255,0.03)",
    "0px 8px 11px -5px rgba(255,255,255,0.05),0px 17px 26px 2px rgba(255,255,255,0.04),0px 6px 32px 5px rgba(255,255,255,0.03)",
    "0px 9px 11px -5px rgba(255,255,255,0.05),0px 18px 28px 2px rgba(255,255,255,0.04),0px 7px 34px 6px rgba(255,255,255,0.03)",
    "0px 9px 12px -6px rgba(255,255,255,0.05),0px 19px 29px 2px rgba(255,255,255,0.04),0px 7px 36px 6px rgba(255,255,255,0.03)",
    "0px 10px 13px -6px rgba(255,255,255,0.05),0px 20px 31px 3px rgba(255,255,255,0.04),0px 8px 38px 7px rgba(255,255,255,0.03)",
    "0px 10px 13px -6px rgba(255,255,255,0.05),0px 21px 33px 3px rgba(255,255,255,0.04),0px 8px 40px 7px rgba(255,255,255,0.03)",
    "0px 10px 14px -6px rgba(255,255,255,0.05),0px 22px 35px 3px rgba(255,255,255,0.04),0px 8px 42px 7px rgba(255,255,255,0.03)",
    "0px 11px 14px -7px rgba(255,255,255,0.05),0px 23px 36px 3px rgba(255,255,255,0.04),0px 9px 44px 8px rgba(255,255,255,0.03)",
    "0px 11px 15px -7px rgba(255,255,255,0.05),0px 24px 38px 3px rgba(255,255,255,0.04),0px 9px 46px 8px rgba(255,255,255,0.03)",
]


export const lightColorPallete = {
    common: {
        primary: "#FFFFFF",     // main background
        secondary: "#ecf0f3",   // secondary background
        divider: "#E5E7EB",     // borders
        alpha: "#F3F4F6",       // subtle hover / overlay
        text: "#1F2937",        // main text
    },

    surface: {
        primary: "#FFFFFF",     // cards & modals
        secondary: "#F4F6FB",   // nested surfaces
        divider: "#D1D5DB",     // subtle divider
        alpha: "#F9FAFB",       // hover / overlay on surface
        text: "#6B7280",        // surface text (slightly softer)
    },
}


export const darkColorPallete = {
    common: {
        primary: "#0F172A",
        secondary: "#111827",
        divider: "#374151",
        alpha: "#1F2937",
        text: "#F9FAFB",
    },
    surface: {
        primary: "#1F2937",   // cards & modals
        secondary: "#273449", // nested surfaces
        divider: "#4B5563",
        alpha: "#111827",
        text: "#9CA3AF",
    },
}

export const ThemeColors = {
    ...lightColorPallete,

    brand: {
        primary: "#2563EB",   // blue-600
        secondary: "#3B82F6", // blue-500
        divider: "#E5E7EB",        // neutral-200
        alpha: "#EFF6FF",          // blue-50
        text: "#FFFFFF"
    },

    accent: {
        primary: "#0D9488",   // teal-600
        secondary: "#14B8A6", // teal-500
        divider: "#E5E7EB",        // neutral-200
        alpha: "#F0FDFA",          // teal-50
        text: "#FFFFFF"
    },

    info: {
        primary: "#0284C7",   // sky-600
        secondary: "#38BDF8", // sky-400
        divider: "#E5E7EB",        // neutral-200
        alpha: "#EFF6FF",          // sky-50
        text: "#FFFFFF"
    },

    success: {
        primary: "#16A34A",   // green-600
        secondary: "#4ADE80", // green-400
        divider: "#E5E7EB",        // neutral-200
        alpha: "#ECFDF5",          // green-50
        text: "#FFFFFF"
    },

    warning: {
        primary: "#D97706",
        secondary: "#FBBF24",
        divider: "#E5E7EB",
        alpha: "#FFFBEB",
        text: "#000000"
    },

    danger: {
        primary: "#DC2626",
        secondary: "#F87171",
        divider: "#E5E7EB",
        alpha: "#FEF2F2",
        text: "#FFFFFF"
    },
}

export const ThemeTypography: ThemeTypographyType = {
    h1: { fontSize: 48, lineHeight: 1.3, fontWeight: 600 }, // bolder for emphasis
    h2: { fontSize: 40, lineHeight: 1.35, fontWeight: 500 },
    h3: { fontSize: 34, lineHeight: 1.4, fontWeight: 500 },
    h4: { fontSize: 28, lineHeight: 1.45, fontWeight: 500 },
    h5: { fontSize: 24, lineHeight: 1.5, fontWeight: 500 },
    h6: { fontSize: 20, lineHeight: 1.55, fontWeight: 500 },
    big: { fontSize: 18, lineHeight: 1.6, fontWeight: 400 },
    text: { fontSize: 16, lineHeight: 1.6, fontWeight: 400 },
    button: { fontSize: 14, lineHeight: 1.6, fontWeight: 500 },
    small: { fontSize: 12, lineHeight: 1.6, fontWeight: 400 },
}


export const darkThemeOptions: ThemeOptionInput = {
    name: "dark",
    rtl: false,
    shadow: darkShadows,
    globalStyle: {},
    colors: darkColorPallete,
    typography: ThemeTypography,
    interfaces: {}
} as ThemeOptionInput

export const lightThemeOptions: ThemeOptionInput = {
    name: "light",
    rtl: false,
    shadow: lightShadows,
    globalStyle: {},
    colors: ThemeColors,
    typography: ThemeTypography,
    interfaces: {}
} as ThemeOptionInput
