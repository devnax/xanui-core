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

  const colorNames = [
    "default",
    "brand",
    "accent",
    "success",
    "info",
    "warning",
    "danger",
  ];
  const colorKeys = [
    "primary",
    "secondary",
    "paper",
    "surface",
    "contrast",
    "muted",
    "divider",
    "ghost",
  ];

  for (let cname of colorNames) {
    if (cname in theme.colors) {
      for (let key of colorKeys) {
        vars[`--color-${cname}-${key}`] = (theme as any).colors[cname][key];
      }

      // shades
      for (let i = 1; i <= 11; i++) {
        vars[`--color-${cname}-${i}`] = (theme as any).colors[cname].shades[i];
      }
    }
  }

  vars[`--shadow-xs`] = theme.shadow.xs;
  vars[`--shadow-sm`] = theme.shadow.sm;
  vars[`--shadow-md`] = theme.shadow.md;
  vars[`--shadow-lg`] = theme.shadow.lg;
  vars[`--shadow-xl`] = theme.shadow.xl;

  vars[`--radius-xs`] = theme.radius.xs;
  vars[`--radius-sm`] = theme.radius.sm;
  vars[`--radius-md`] = theme.radius.md;
  vars[`--radius-lg`] = theme.radius.lg;
  vars[`--radius-xl`] = theme.radius.xl;

  vars[`--spacing-xs`] = theme.spacing.xs;
  vars[`--spacing-sm`] = theme.spacing.sm;
  vars[`--spacing-md`] = theme.spacing.md;
  vars[`--spacing-lg`] = theme.spacing.lg;
  vars[`--spacing-xl`] = theme.spacing.xl;

  return vars;
};

export default ThemeCssVars;
