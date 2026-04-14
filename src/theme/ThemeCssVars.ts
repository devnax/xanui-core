import { ThemeOptions } from "./types";

const ThemeCssVars = (theme: ThemeOptions) => {
    const vars: any = {}
    theme.shadow?.forEach((s, i) => vars[`--shadow-${i}`] = s)

    if (theme.breakpoints?.xs) vars["--bp-xs"] = theme.breakpoints.xs
    if (theme.breakpoints?.sm) vars["--bp-sm"] = theme.breakpoints.sm
    if (theme.breakpoints?.md) vars["--bp-md"] = theme.breakpoints.md
    if (theme.breakpoints?.lg) vars["--bp-lg"] = theme.breakpoints.lg
    if (theme.breakpoints?.xl) vars["--bp-xl"] = theme.breakpoints.xl

    if (theme.typography?.h1?.fontSize) vars["--fontsize-h1"] = `${theme.typography.h1.fontSize}px`
    if (theme.typography?.h2?.fontSize) vars["--fontsize-h2"] = `${theme.typography.h2.fontSize}px`
    if (theme.typography?.h3?.fontSize) vars["--fontsize-h3"] = `${theme.typography.h3.fontSize}px`
    if (theme.typography?.h4?.fontSize) vars["--fontsize-h4"] = `${theme.typography.h4.fontSize}px`
    if (theme.typography?.h5?.fontSize) vars["--fontsize-h5"] = `${theme.typography.h5.fontSize}px`
    if (theme.typography?.h6?.fontSize) vars["--fontsize-h6"] = `${theme.typography.h6.fontSize}px`
    if (theme.typography?.big?.fontSize) vars["--fontsize-big"] = `${theme.typography.big.fontSize}px`
    if (theme.typography?.text?.fontSize) vars["--fontsize-text"] = `${theme.typography.text.fontSize}px`
    if (theme.typography?.button?.fontSize) vars["--fontsize-button"] = `${theme.typography.button.fontSize}px`
    if (theme.typography?.small?.fontSize) vars["--fontsize-small"] = `${theme.typography.small.fontSize}px`

    if (theme.typography?.h1?.fontWeight) vars["--fontweight-h1"] = theme.typography.h1.fontWeight + ""
    if (theme.typography?.h2?.fontWeight) vars["--fontweight-h2"] = theme.typography.h2.fontWeight + ""
    if (theme.typography?.h3?.fontWeight) vars["--fontweight-h3"] = theme.typography.h3.fontWeight + ""
    if (theme.typography?.h4?.fontWeight) vars["--fontweight-h4"] = theme.typography.h4.fontWeight + ""
    if (theme.typography?.h5?.fontWeight) vars["--fontweight-h5"] = theme.typography.h5.fontWeight + ""
    if (theme.typography?.h6?.fontWeight) vars["--fontweight-h6"] = theme.typography.h6.fontWeight + ""
    if (theme.typography?.big?.fontWeight) vars["--fontweight-big"] = theme.typography.big.fontWeight + ""
    if (theme.typography?.text?.fontWeight) vars["--fontweight-text"] = theme.typography.text.fontWeight + ""
    if (theme.typography?.button?.fontWeight) vars["--fontweight-button"] = theme.typography.button.fontWeight + ""
    if (theme.typography?.small?.fontWeight) vars["--fontweight-small"] = theme.typography.small.fontWeight + ""


    if (theme.typography?.h1?.lineHeight) vars["--lineheight-h1"] = theme.typography.h1.lineHeight + ""
    if (theme.typography?.h2?.lineHeight) vars["--lineheight-h2"] = theme.typography.h2.lineHeight + ""
    if (theme.typography?.h3?.lineHeight) vars["--lineheight-h3"] = theme.typography.h3.lineHeight + ""
    if (theme.typography?.h4?.lineHeight) vars["--lineheight-h4"] = theme.typography.h4.lineHeight + ""
    if (theme.typography?.h5?.lineHeight) vars["--lineheight-h5"] = theme.typography.h5.lineHeight + ""
    if (theme.typography?.h6?.lineHeight) vars["--lineheight-h6"] = theme.typography.h6.lineHeight + ""
    if (theme.typography?.big?.lineHeight) vars["--lineheight-big"] = theme.typography.big.lineHeight + ""
    if (theme.typography?.text?.lineHeight) vars["--lineheight-text"] = theme.typography.text.lineHeight + ""
    if (theme.typography?.button?.lineHeight) vars["--lineheight-button"] = theme.typography.button.lineHeight + ""
    if (theme.typography?.small?.lineHeight) vars["--lineheight-small"] = theme.typography.small.lineHeight + ""

    if (theme.colors?.background?.primary) vars["--color-background-primary"] = theme.colors.background.primary
    if (theme.colors?.background?.secondary) vars["--color-background-secondary"] = theme.colors.background.secondary

    if (theme.colors?.text?.primary) vars["--color-text-primary"] = theme.colors.text.primary
    if (theme.colors?.text?.secondary) vars["--color-text-secondary"] = theme.colors.text.secondary

    if (theme.colors?.divider?.primary) vars["--color-divider-primary"] = theme.colors.divider.primary
    if (theme.colors?.divider?.secondary) vars["--color-divider-secondary"] = theme.colors.divider.secondary

    if (theme.colors?.divider?.soft?.primary) vars["--color-divider-soft-primary"] = theme.colors.divider.soft.primary
    if (theme.colors?.divider?.soft?.secondary) vars["--color-divider-soft-secondary"] = theme.colors.divider.soft.secondary

    if (theme.colors?.brand?.primary) vars["--color-brand-primary"] = theme.colors.brand.primary
    if (theme.colors?.brand?.secondary) vars["--color-brand-secondary"] = theme.colors.brand.secondary
    if (theme.colors?.brand?.text) vars["--color-brand-text"] = theme.colors.brand.text
    if (theme.colors?.brand?.soft?.primary) vars["--color-brand-soft-primary"] = theme.colors.brand.soft.primary
    if (theme.colors?.brand?.soft?.secondary) vars["--color-brand-soft-secondary"] = theme.colors.brand.soft.secondary

    if (theme.colors?.accent?.primary) vars["--color-accent-primary"] = theme.colors.accent.primary
    if (theme.colors?.accent?.secondary) vars["--color-accent-secondary"] = theme.colors.accent.secondary
    if (theme.colors?.accent?.text) vars["--color-accent-text"] = theme.colors.accent.text
    if (theme.colors?.accent?.soft?.primary) vars["--color-accent-soft-primary"] = theme.colors.accent.soft.primary
    if (theme.colors?.accent?.soft?.secondary) vars["--color-accent-soft-secondary"] = theme.colors.accent.soft.secondary

    if (theme.colors?.info?.primary) vars["--color-info-primary"] = theme.colors.info.primary
    if (theme.colors?.info?.secondary) vars["--color-info-secondary"] = theme.colors.info.secondary
    if (theme.colors?.info?.text) vars["--color-info-text"] = theme.colors.info.text
    if (theme.colors?.info?.soft?.primary) vars["--color-info-soft-primary"] = theme.colors.info.soft.primary
    if (theme.colors?.info?.soft?.secondary) vars["--color-info-soft-secondary"] = theme.colors.info.soft.secondary

    if (theme.colors?.success?.primary) vars["--color-success-primary"] = theme.colors.success.primary
    if (theme.colors?.success?.secondary) vars["--color-success-secondary"] = theme.colors.success.secondary
    if (theme.colors?.success?.text) vars["--color-success-text"] = theme.colors.success.text
    if (theme.colors?.success?.soft?.primary) vars["--color-success-soft-primary"] = theme.colors.success.soft.primary
    if (theme.colors?.success?.soft?.secondary) vars["--color-success-soft-secondary"] = theme.colors.success.soft.secondary

    if (theme.colors?.warning?.primary) vars["--color-warning-primary"] = theme.colors.warning.primary
    if (theme.colors?.warning?.secondary) vars["--color-warning-secondary"] = theme.colors.warning.secondary
    if (theme.colors?.warning?.text) vars["--color-warning-text"] = theme.colors.warning.text
    if (theme.colors?.warning?.soft?.primary) vars["--color-warning-soft-primary"] = theme.colors.warning.soft.primary
    if (theme.colors?.warning?.soft?.secondary) vars["--color-warning-soft-secondary"] = theme.colors.warning.soft.secondary

    if (theme.colors?.danger?.primary) vars["--color-danger-primary"] = theme.colors.danger.primary
    if (theme.colors?.danger?.secondary) vars["--color-danger-secondary"] = theme.colors.danger.secondary
    if (theme.colors?.danger?.text) vars["--color-danger-text"] = theme.colors.danger.text
    if (theme.colors?.danger?.soft?.primary) vars["--color-danger-soft-primary"] = theme.colors.danger.soft.primary
    if (theme.colors?.danger?.soft?.secondary) vars["--color-danger-soft-secondary"] = theme.colors.danger.soft.secondary
    return vars
}

export default ThemeCssVars