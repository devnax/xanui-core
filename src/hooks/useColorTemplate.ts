"use client";

const colorNames = [
  "default",
  "brand",
  "accent",
  "info",
  "success",
  "warning",
  "danger",
] as const;
const types = ["fill", "outline", "text", "ghost"] as const;
export type UseColorTemplateType = (typeof types)[number];
export type UseColorTemplateColor = (typeof colorNames)[number];

const useColorTemplate = (
  color: UseColorTemplateColor,
  type: UseColorTemplateType,
) => {
  if (!colorNames.includes(color)) {
    throw new Error(`Invalid color: ${color}`);
  }
  if (!types.includes(type)) {
    throw new Error(`Invalid type: ${type}`);
  }
  const is_def = color === "default";

  if (type === "outline") {
    return {
      main: {
        bgcolor: `transparent`,
        color: is_def ? `text.primary` : `${color}.primary`,
        border: "1px solid",
        borderColor: is_def ? "divider.primary" : `${color}.primary`,
        transition: "border .3s",
      },
      hover: {
        bgcolor: `transparent`,
        color: is_def ? `text.primary` : `${color}.secondary`,
        border: "1px solid",
        borderColor: is_def ? "divider.secondary" : `${color}.secondary`,
        transition: "border .3s",
      },
    };
  } else if (type === "fill") {
    return {
      main: {
        bgcolor: is_def ? "paper.primary" : `${color}.primary`,
        color: is_def ? "text.primary" : `${color}.contrast`,
        border: 0,
        borderColor: "transparent",
        transition: "background-color .3s",
      },
      hover: {
        bgcolor: is_def ? "paper.secondary" : `${color}.secondary`,
        color: is_def ? "text.primary" : `${color}.contrast`,
        border: 0,
        borderColor: "transparent",
        transition: "background-color .3s",
      },
    };
  } else if (type === "text") {
    return {
      main: {
        bgcolor: "transparent",
        color: is_def ? `text.primary` : `${color}.primary`,
        border: 0,
        borderColor: `transparent`,
      },
      hover: {
        bgcolor: "transparent",
        color: is_def ? `text.primary` : `${color}.primary`,
        border: 0,
        borderColor: `transparent`,
      },
    };
  } else if (type === "ghost") {
    return {
      main: {
        bgcolor: is_def ? "paper.ghost.primary" : `${color}.ghost.primary`,
        color: is_def ? `text.primary` : `${color}.primary`,
        border: 0,
        borderColor: `transparent`,
        transition: "background-color .3s",
      },
      hover: {
        bgcolor: is_def ? "paper.ghost.secondary" : `${color}.ghost.secondary`,
        color: is_def ? `text.primary` : `${color}.secondary`,
        border: 0,
        borderColor: `transparent`,
        transition: "background-color .3s",
      },
    };
  }

  throw new Error(`useColorTemplate: Unknown type ${type}`);
};

export default useColorTemplate;
