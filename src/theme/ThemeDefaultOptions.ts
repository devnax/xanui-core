import { ThemeOptionInput, ThemeTypographyType } from './types'

export const lightColorPallete = {
    text: {
        primary: "#212B36",
        secondary: "#637381",
    },
    background: {
        primary: "#FFFFFF",
        secondary: "#EDEFF7",
    },
    divider: "#DADCE0"
}

export const darkColorPallete = {
    text: {
        primary: "#FFFFFF",
        secondary: "#C4CDD5",
    },
    background: {
        primary: "#272727",
        secondary: "#1E1E1E",
    },
    divider: "#3D3D3D"
}

export const ThemeColors = {
    ...lightColorPallete,
    brand: {
        primary: "#3b82f6",
        secondary: "#60a5fa",
        text: "#FFFFFF"
    },
    accent: {
        primary: "#14b8a6",
        secondary: "#2dd4bf",
        text: "#FFFFFF"
    },
    info: {
        primary: "#0ea5e9",
        secondary: "#60a5fa",
        text: "#FFFFFF"
    },
    success: {
        primary: "#22c55e",
        secondary: "#4ade80",
        text: "#FFFFFF"
    },
    warning: {
        primary: "#f59e0b",
        secondary: "#fbbf24",
        text: "#FFFFFF"
    },
    danger: {
        primary: "#ef4444",
        secondary: "#f87171",
        text: "#FFFFFF"
    },
}

export const ThemeTypography: ThemeTypographyType = {
    fontFamily: '"Inter",sans-serif,"Helvetica","Arial"',
    h1: {
        fontSize: 47.78,
        lineHeight: 1.3,
        fontWeight: 400,
    },
    h2: {
        fontSize: 39.81,
        lineHeight: 1.35,
        fontWeight: 400,
    },
    h3: {
        fontSize: 33.18,
        lineHeight: 1.4,
        fontWeight: 400,
    },
    h4: {
        fontSize: 27.65,
        lineHeight: 1.45,
        fontWeight: 400,
    },
    h5: {
        fontSize: 27.65,
        lineHeight: 1.5,
        fontWeight: 400,
    },
    h6: {
        fontSize: 23.04,
        lineHeight: 1.55,
        fontWeight: 400,
    },
    text: {
        fontSize: 16,
        lineHeight: 1.6,
        fontWeight: 400,
    },
    button: {
        fontSize: 13.33,
        lineHeight: 1.6,
        fontWeight: 500,
    },
    small: {
        fontSize: 12.33,
        lineHeight: 1.6,
        fontWeight: 400,
    }
}

export const shadow = [
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

export default {
    name: "light",
    rtl: false,
    shadow,
    globalStyle: {},
    colors: ThemeColors,
    typography: ThemeTypography,
    interfaces: {}
} as ThemeOptionInput
