import { neutralColorSteps } from "../theme/palette";
import { CSSProps } from "./types";

const color_vars: Record<string, string> = {};

// generate Neutral
for (let step of neutralColorSteps) {
  color_vars[`neutral.${step}`] = `var(--color-neutral-${step})`;
}

// generate surface, paper, text, divider
const names = ["surface", "paper", "text", "divider"];
for (let name of names) {
  color_vars[`${name}.primary`] = `var(--color-${name}-primary)`;
  color_vars[`${name}.secondary`] = `var(--color-${name}-secondary)`;
}

color_vars[`paper.ghost.primary`] = `var(--color-paper-ghost-primary)`;
color_vars[`paper.ghost.secondary`] = `var(--color-paper-ghost-secondary)`;

// generate variant colors
const variant_names = [
  "brand",
  "accent",
  "info",
  "success",
  "warning",
  "danger",
];
for (let name of variant_names) {
  color_vars[`${name}.primary`] = `var(--color-${name}-primary)`;
  color_vars[`${name}.secondary`] = `var(--color-${name}-secondary)`;
  color_vars[`${name}.contrast`] = `var(--color-${name}-contrast)`;
  color_vars[`${name}.ghost.primary`] = `var(--color-${name}-ghost-primary)`;
  color_vars[`${name}.ghost.secondary`] =
    `var(--color-${name}-ghost-secondary)`;
}

const withImportant = (important: any, value: any) =>
  important ? value + important : value;

const breakpoints: any = {
  xs: "var(--bp-xs)",
  sm: "var(--bp-sm)",
  md: "var(--bp-md)",
  lg: "var(--bp-lg)",
  xl: "var(--bp-xl)",
};

let fontsizes: any = {
  xs: "var(--fontsize-xs)",
  sm: "var(--fontsize-sm)",
  md: "var(--fontsize-md)",
  lg: "var(--fontsize-lg)",
  xl: "var(--fontsize-xl)",
  h1: "var(--fontsize-h1)",
  h2: "var(--fontsize-h2)",
  h3: "var(--fontsize-h3)",
  h4: "var(--fontsize-h4)",
  h5: "var(--fontsize-h5)",
  h6: "var(--fontsize-h6)",
};

let lineHeights: any = {
  xs: "var(--lineheight-xs)",
  sm: "var(--lineheight-sm)",
  md: "var(--lineheight-md)",
  lg: "var(--lineheight-lg)",
  xl: "var(--lineheight-xl)",
  h1: "var(--lineheight-h1)",
  h2: "var(--lineheight-h2)",
  h3: "var(--lineheight-h3)",
  h4: "var(--lineheight-h4)",
  h5: "var(--lineheight-h5)",
  h6: "var(--lineheight-h6)",
};

let fontWeights: any = {
  xs: "var(--fontweight-xs)",
  sm: "var(--fontweight-sm)",
  md: "var(--fontweight-md)",
  lg: "var(--fontweight-lg)",
  xl: "var(--fontweight-xl)",
  h1: "var(--fontweight-h1)",
  h2: "var(--fontweight-h2)",
  h3: "var(--fontweight-h3)",
  h4: "var(--fontweight-h4)",
  h5: "var(--fontweight-h5)",
  h6: "var(--fontweight-h6)",
};

const fontKeys = Object.keys(fontsizes);

const getValue = (prop: any, value: string | number, _css: CSSProps): any => {
  let important;

  if (typeof value === "string") {
    const split = value.split("!");
    important = split[1] ? "!important" : "";
    value = split[0];
  }

  if (
    ["width", "maxWidth", "minWidth", "max-width", "min-width"].includes(prop)
  ) {
    return withImportant(important, breakpoints[value] || value);
  } else if (
    ["fontWeight", "font-weight"].includes(prop) &&
    typeof value === "string" &&
    fontKeys.includes(value)
  ) {
    return withImportant(important, fontWeights[value] || value);
  } else if (
    ["lineHeight", "line-height"].includes(prop) &&
    typeof value === "string" &&
    fontKeys.includes(value)
  ) {
    return withImportant(important, lineHeights[value] || value);
  } else if (
    ["fontSize", "font-size"].includes(prop) &&
    typeof value === "string"
  ) {
    return withImportant(important, fontsizes[value] || value);
  } else if (
    typeof value === "string" &&
    ["shadow", "boxShadow"].includes(prop) &&
    ["xs", "sm", "md", "lg", "xl"].includes(value)
  ) {
    return withImportant(important, `var(--shadow-${value})`);
  } else if (["radius", "borderRadius"].includes(prop)) {
    if (
      typeof value === "string" &&
      ["xs", "sm", "md", "lg", "xl"].includes(value)
    ) {
      return withImportant(important, `var(--radius-${value})`);
    } else {
      return withImportant(important, value);
    }
  } else if (
    prop === "gap" ||
    prop.startsWith("padding") ||
    prop.startsWith("margin")
  ) {
    if (
      typeof value === "string" &&
      ["xs", "sm", "md", "lg", "xl"].includes(value)
    ) {
      return withImportant(important, `var(--spacing-${value})`);
    } else {
      return withImportant(important, value);
    }
  }

  return withImportant(important, color_vars[value] || value);
};

export default getValue;
