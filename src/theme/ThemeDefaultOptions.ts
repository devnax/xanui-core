import { createTheme } from './createTheme'
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

    "0px 1px 2px rgba(0,0,0,0.65), inset 0px 1px 0px rgba(255,255,255,0.04)",
    "0px 2px 3px rgba(0,0,0,0.68), inset 0px 1px 0px rgba(255,255,255,0.04)",
    "0px 2px 4px rgba(0,0,0,0.7), inset 0px 1px 0px rgba(255,255,255,0.05)",
    "0px 3px 5px rgba(0,0,0,0.72), inset 0px 1px 0px rgba(255,255,255,0.05)",

    "0px 4px 6px rgba(0,0,0,0.75), inset 0px 1px 0px rgba(255,255,255,0.05)",
    "0px 5px 8px rgba(0,0,0,0.78), inset 0px 1px 0px rgba(255,255,255,0.06)",
    "0px 6px 10px rgba(0,0,0,0.8), inset 0px 1px 0px rgba(255,255,255,0.06)",
    "0px 7px 12px rgba(0,0,0,0.82), inset 0px 1px 0px rgba(255,255,255,0.06)",
    "0px 8px 14px rgba(0,0,0,0.84), inset 0px 1px 0px rgba(255,255,255,0.06)",

    "0px 9px 16px rgba(0,0,0,0.86), inset 0px 1px 0px rgba(255,255,255,0.07)",
    "0px 10px 18px rgba(0,0,0,0.88), inset 0px 1px 0px rgba(255,255,255,0.07)",
    "0px 11px 20px rgba(0,0,0,0.89), inset 0px 1px 0px rgba(255,255,255,0.07)",
    "0px 12px 22px rgba(0,0,0,0.9), inset 0px 1px 0px rgba(255,255,255,0.07)",
    "0px 13px 24px rgba(0,0,0,0.91), inset 0px 1px 0px rgba(255,255,255,0.07)",

    "0px 14px 26px rgba(0,0,0,0.92), inset 0px 1px 0px rgba(255,255,255,0.08)",
    "0px 15px 28px rgba(0,0,0,0.93), inset 0px 1px 0px rgba(255,255,255,0.08)",
    "0px 16px 30px rgba(0,0,0,0.94), inset 0px 1px 0px rgba(255,255,255,0.08)",
    "0px 18px 32px rgba(0,0,0,0.95), inset 0px 1px 0px rgba(255,255,255,0.08)",
    "0px 20px 34px rgba(0,0,0,0.95), inset 0px 1px 0px rgba(255,255,255,0.08)",

    "0px 22px 36px rgba(0,0,0,0.96), inset 0px 1px 0px rgba(255,255,255,0.08)",
    "0px 24px 38px rgba(0,0,0,0.97), inset 0px 1px 0px rgba(255,255,255,0.09)",
    "0px 26px 40px rgba(0,0,0,0.98), inset 0px 1px 0px rgba(255,255,255,0.09)",
    "0px 28px 42px rgba(0,0,0,0.99), inset 0px 1px 0px rgba(255,255,255,0.1)",
]



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

export const lightThemeOptions: ThemeOptionInput = {
    name: "light",
    rtl: false,
    shadow: lightShadows,
    globalStyle: {},
    colors: {
        background: {
            primary: "#FFFFFF",   // main app background
            secondary: "#F3F4F6", // slightly darker surface for sections/cards
        },

        divider: {
            primary: "#E5E7EB",   // soft divider, visible on #FFFFFF
            secondary: "#D1D5DB", // stronger divider for emphasis
        },

        text: {
            primary: "#111827",
            secondary: "#6B7280",
        },

        brand: {
            primary: "#2563EB",
            secondary: "#1D4ED8",
            text: "#F9FAFB",
        },

        accent: {
            primary: "#7C3AED",
            secondary: "#6D28D9",
            text: "#F9FAFB",
        },

        success: {
            primary: "#16A34A",
            secondary: "#15803D",
            text: "#F9FAFB",
        },

        info: {
            primary: "#2563EB",
            secondary: "#1D4ED8",
            text: "#F9FAFB",
        },

        warning: {
            primary: "#D97706",
            secondary: "#B45309",
            text: "#FFFBEB",
        },

        danger: {
            primary: "#DC2626",
            secondary: "#B91C1C",
            text: "#FEF2F2",
        },
    },
    typography: ThemeTypography,
    interfaces: {}
} as ThemeOptionInput


export const createDefaultThemes = () => {
    createTheme("light", {})
    createTheme("dark", {
        shadow: darkShadows,
        colors: {
            background: {
                primary: "#121212",
                secondary: "#1E1E1E",
            },

            divider: {
                primary: "#262626",
                secondary: "#2E2E2E",
            },

            text: {
                primary: "#F3F4F6",   // main readable text
                secondary: "#9CA3AF", // muted / secondary text
            },

            brand: {
                primary: "#3F5AE0",
                secondary: "#5F78F0",
                text: "#0B1220",
            },

            accent: {
                primary: "#6B4FE8",
                secondary: "#856FF2",
                text: "#0C0824",
            },


            success: {
                primary: "#22985A",
                secondary: "#3AB97C",
                text: "#052A18",
            },

            info: {
                primary: "#3F70E0",
                secondary: "#5F8CE8",
                text: "#0A1024",
            },


            warning: {
                primary: "#B7832B",
                secondary: "#D09B45",
                text: "#1F1304",
            },

            danger: {
                primary: "#C44040",
                secondary: "#DE6161",
                text: "#2A0808",
            },
        }
    })
}