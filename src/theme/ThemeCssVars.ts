import { ThemeOptions } from "./types";

const ThemeCssVars = (theme: ThemeOptions) => {

    const shadows: any = {}
    theme.shadow.forEach((s, i) => shadows[`--shadow-${i}`] = s)

    return {
        "--bp-xs": theme.breakpoints.xs,
        "--bp-sm": theme.breakpoints.sm,
        "--bp-md": theme.breakpoints.md,
        "--bp-lg": theme.breakpoints.lg,
        "--bp-xl": theme.breakpoints.xl,

        "--font-h1": `${theme.typography.h1.fontWeight} ${theme.typography.h1.fontSize}px/${theme.typography.h1.lineHeight} inherit`,
        "--font-h2": `${theme.typography.h2.fontWeight} ${theme.typography.h2.fontSize}px/${theme.typography.h2.lineHeight} inherit`,
        "--font-h3": `${theme.typography.h3.fontWeight} ${theme.typography.h3.fontSize}px/${theme.typography.h3.lineHeight} inherit`,
        "--font-h4": `${theme.typography.h4.fontWeight} ${theme.typography.h4.fontSize}px/${theme.typography.h4.lineHeight} inherit`,
        "--font-h5": `${theme.typography.h5.fontWeight} ${theme.typography.h5.fontSize}px/${theme.typography.h5.lineHeight} inherit`,
        "--font-h6": `${theme.typography.h6.fontWeight} ${theme.typography.h6.fontSize}px/${theme.typography.h6.lineHeight} inherit`,
        "--font-big": `${theme.typography.big.fontWeight} ${theme.typography.text.fontSize}px/${theme.typography.text.lineHeight} inherit`,
        "--font-text": `${theme.typography.text.fontWeight} ${theme.typography.text.fontSize}px/${theme.typography.text.lineHeight} inherit`,
        "--font-button": `${theme.typography.button.fontWeight} ${theme.typography.button.fontSize}px/${theme.typography.button.lineHeight} inherit`,
        "--font-small": `${theme.typography.small.fontWeight} ${theme.typography.small.fontSize}px/${theme.typography.small.lineHeight} inherit`,

        "--fontsize-h1": `${theme.typography.h1.fontSize}px`,
        "--fontsize-h2": `${theme.typography.h2.fontSize}px`,
        "--fontsize-h3": `${theme.typography.h3.fontSize}px`,
        "--fontsize-h4": `${theme.typography.h4.fontSize}px`,
        "--fontsize-h5": `${theme.typography.h5.fontSize}px`,
        "--fontsize-h6": `${theme.typography.h6.fontSize}px`,
        "--fontsize-big": `${theme.typography.big.fontSize}px`,
        "--fontsize-text": `${theme.typography.text.fontSize}px`,
        "--fontsize-button": `${theme.typography.button.fontSize}px`,
        "--fontsize-small": `${theme.typography.small.fontSize}px`,

        "--fontweight-h1": theme.typography.h1.fontWeight + "",
        "--fontweight-h2": theme.typography.h2.fontWeight + "",
        "--fontweight-h3": theme.typography.h3.fontWeight + "",
        "--fontweight-h4": theme.typography.h4.fontWeight + "",
        "--fontweight-h5": theme.typography.h5.fontWeight + "",
        "--fontweight-h6": theme.typography.h6.fontWeight + "",
        "--fontweight-big": theme.typography.big.fontWeight + "",
        "--fontweight-text": theme.typography.text.fontWeight + "",
        "--fontweight-button": theme.typography.button.fontWeight + "",
        "--fontweight-small": theme.typography.small.fontWeight + "",

        "--lineheight-h1": theme.typography.h1.lineHeight + "",
        "--lineheight-h2": theme.typography.h2.lineHeight + "",
        "--lineheight-h3": theme.typography.h3.lineHeight + "",
        "--lineheight-h4": theme.typography.h4.lineHeight + "",
        "--lineheight-h5": theme.typography.h5.lineHeight + "",
        "--lineheight-h6": theme.typography.h6.lineHeight + "",
        "--lineheight-big": theme.typography.big.lineHeight + "",
        "--lineheight-text": theme.typography.text.lineHeight + "",
        "--lineheight-button": theme.typography.button.lineHeight + "",
        "--lineheight-small": theme.typography.small.lineHeight + "",

        "--color-common-primary": theme.colors.common.primary,
        "--color-common-secondary": theme.colors.common.secondary,

        "--color-text-primary": theme.colors.text.primary,
        "--color-text-secondary": theme.colors.text.secondary,

        "--color-divider-primary": theme.colors.divider.primary,
        "--color-divider-secondary": theme.colors.divider.secondary,

        "--color-brand-primary": theme.colors.brand.primary,
        "--color-brand-secondary": theme.colors.brand.secondary,
        "--color-brand-text": theme.colors.brand.text,

        "--color-accent-primary": theme.colors.accent.primary,
        "--color-accent-secondary": theme.colors.accent.secondary,
        "--color-accent-text": theme.colors.accent.text,

        "--color-info-primary": theme.colors.info.primary,
        "--color-info-secondary": theme.colors.info.secondary,
        "--color-info-text": theme.colors.info.text,

        "--color-success-primary": theme.colors.success.primary,
        "--color-success-secondary": theme.colors.success.secondary,
        "--color-success-text": theme.colors.success.text,

        "--color-warning-primary": theme.colors.warning.primary,
        "--color-warning-secondary": theme.colors.warning.secondary,
        "--color-warning-text": theme.colors.warning.text,

        "--color-danger-primary": theme.colors.danger.primary,
        "--color-danger-secondary": theme.colors.danger.secondary,
        "--color-danger-text": theme.colors.danger.text,
        ...shadows,
    }
}


export default ThemeCssVars