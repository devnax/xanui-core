import { neutralColorSteps } from "./palette";
import { ThemeOptions } from "./types";

const ThemeCssVars = (theme: ThemeOptions) => {
  const vars: any = {};

  vars[`--bp-xs`] = (theme as any).breakpoints.sm;
  vars[`--bp-sm`] = (theme as any).breakpoints.md;
  vars[`--bp-md`] = (theme as any).breakpoints.lg;
  vars[`--bp-lg`] = (theme as any).breakpoints.xl;
  vars[`--bp-xl`] = "100%";

  const typoNames = [
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
  ];
  const typoKeys = ["fontSize", "fontWeight", "lineHeight"];
  for (let tname of typoNames) {
    if (tname in theme.typography) {
      for (let key of typoKeys) {
        const v = (theme as any).typography[tname];
        if (key in v) {
          let px = key === "fontSize" ? "px" : "";
          vars[`--${key.toLowerCase()}-${tname}`] =
            `${(theme as any).typography[tname][key]}${px}`;
        }
      }
    }
  }

  // print neutral colors
  for (let step of neutralColorSteps) {
    vars[`--color-neutral-${step}`] = (theme as any).colors.neutral[step];
  }

  // print surface, paper, text, divider
  const names = ["surface", "paper", "text", "divider"];
  for (let name of names) {
    vars[`--color-${name}-primary`] = (theme as any).colors[name].primary;
    vars[`--color-${name}-secondary`] = (theme as any).colors[name].secondary;
  }

  // paper ghpst
  vars[`--color-paper-ghost-primary`] = (
    theme as any
  ).colors.paper.ghost.primary;
  vars[`--color-paper-ghost-secondary`] = (
    theme as any
  ).colors.paper.ghost.secondary;

  // print variant colors
  const variant_names = [
    "brand",
    "accent",
    "info",
    "success",
    "warning",
    "danger",
  ];
  for (let name of variant_names) {
    vars[`--color-${name}-primary`] = (theme as any).colors[name].primary;
    vars[`--color-${name}-secondary`] = (theme as any).colors[name].secondary;
    vars[`--color-${name}-contrast`] = (theme as any).colors[name].contrast;
    vars[`--color-${name}-ghost-primary`] = (theme as any).colors[
      name
    ].ghost.primary;
    vars[`--color-${name}-ghost-secondary`] = (theme as any).colors[
      name
    ].ghost.secondary;
  }

  vars[`--shadow-xs`] = theme.shadow.xs;
  vars[`--shadow-sm`] = theme.shadow.sm;
  vars[`--shadow-md`] = theme.shadow.md;
  vars[`--shadow-lg`] = theme.shadow.lg;
  vars[`--shadow-xl`] = theme.shadow.xl;
  vars[`--shadow-xxl`] = theme.shadow.xxl;

  vars[`--radius-xs`] = theme.radius.xs;
  vars[`--radius-sm`] = theme.radius.sm;
  vars[`--radius-md`] = theme.radius.md;
  vars[`--radius-lg`] = theme.radius.lg;
  vars[`--radius-xxl`] = theme.radius.xxl;

  vars[`--spacing-xs`] = theme.spacing.xs;
  vars[`--spacing-sm`] = theme.spacing.sm;
  vars[`--spacing-md`] = theme.spacing.md;
  vars[`--spacing-lg`] = theme.spacing.lg;
  vars[`--spacing-xxl`] = theme.spacing.xxl;

  return vars;
};

export default ThemeCssVars;
