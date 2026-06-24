"use client";
export type UseColorTemplateType = "fill" | "outline" | "text" | "ghost";
export type UseColorTemplateColor =
  | "default"
  | "brand"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "danger";

const useColorTemplate = (
  color: UseColorTemplateColor,
  type: UseColorTemplateType,
) => {
  const is_def = color === "default";

  if (type === "outline") {
    return {
      main: {
        bgcolor: `transparent`,
        color: is_def ? `text.primary` : `${color}.primary`,
        border: "1px solid",
        borderColor: is_def ? "divider.primary" : `${color}.primary`,
        transition: "border .2s",
      },
      hover: {
        bgcolor: `transparent`,
        color: is_def ? `text.primary` : `${color}.secondary`,
        border: "1px solid",
        borderColor: is_def ? "divider.secondary" : `${color}.secondary`,
        transition: "border .2s",
      },
    };
  } else if (type === "fill") {
    return {
      main: {
        bgcolor: is_def ? "paper.primary" : `${color}.primary`,
        color: is_def ? "text.primary" : `${color}.contrast`,
        border: 0,
        borderColor: "transparent",
      },
      hover: {
        bgcolor: is_def ? "paper.secondary" : `${color}.secondary`,
        color: is_def ? "text.primary" : `${color}.text`,
        border: 0,
        borderColor: "transparent",
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
      },
      hover: {
        bgcolor: is_def ? "paper.ghost.secondary" : `${color}.ghost.secondary`,
        color: is_def ? `text.primary` : `${color}.secondary`,
        border: 0,
        borderColor: `transparent`,
      },
    };
  }

  throw new Error(`useColorTemplate: Unknown type ${type}`);
};

export default useColorTemplate;
