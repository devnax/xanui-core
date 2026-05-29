import { CSSProps } from "./types";

const getColor = (color: string) => {
  return {
    [`${color}`]: `var(--color-${color}-base)`,
    [`${color}.base`]: `var(--color-${color}-base)`,
    [`${color}.surface`]: `var(--color-${color}-surface)`,
    [`${color}.subtle`]: `var(--color-${color}-subtle)`,
    [`${color}.elevated`]: `var(--color-${color}-elevated)`,
    [`${color}.emphasis`]: `var(--color-${color}-emphasis)`,
    [`${color}.contrast`]: `var(--color-${color}-contrast)`,
    [`${color}.muted`]: `var(--color-${color}-muted)`,
    [`${color}.divider`]: `var(--color-${color}-divider)`,
    [`${color}.ghost`]: `var(--color-${color}-ghost)`,
  };
};

const withImportant = (important: any, value: any) =>
  important ? value + important : value;
const colors: any = {
  ...getColor("default"),
  ...getColor("primary"),
  ...getColor("accent"),
  ...getColor("info"),
  ...getColor("success"),
  ...getColor("warning"),
  ...getColor("danger"),
};

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
    typeof value === "number" &&
    ["shadow", "boxShadow"].includes(prop)
  ) {
    return withImportant(important, `var(--shadow-${value})`);
  }

  return withImportant(important, colors[value] || value);
};

export default getValue;
