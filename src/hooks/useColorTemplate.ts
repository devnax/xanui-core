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
        color: is_def ? `text` : color,
        border: "1px solid",
        borderColor: is_def ? "divider" : color,
      },
      hover: {
        bgcolor: `transparent`,
        color: is_def ? `text` : `${color}.secondary`,
        border: "1px solid",
        borderColor: is_def ? "text.secondary" : `${color}.secondary`,
      },
    };
  } else if (type === "fill") {
    return {
      main: {
        bgcolor: is_def ? "paper" : color,
        color: is_def ? "text" : `${color}.contrast`,
        border: 0,
        borderColor: "transparent",
      },
      hover: {
        bgcolor: is_def ? "paper.secondary" : `${color}.secondary`,
        color: is_def ? "text" : `${color}.text`,
        border: 0,
        borderColor: "transparent",
      },
    };
  } else if (type === "text") {
    return {
      main: {
        bgcolor: "transparent",
        color: is_def ? `text` : `${color}.primary`,
        border: 0,
        borderColor: `transparent`,
      },
      hover: {
        bgcolor: "transparent",
        color: is_def ? `text` : `${color}.primary`,
        border: 0,
        borderColor: `transparent`,
      },
    };
  } else if (type === "ghost") {
    return {
      main: {
        bgcolor: `${color}.ghost`,
        color: is_def ? `text` : color,
        border: 0,
        borderColor: `transparent`,
      },
      hover: {
        bgcolor: `${color}.ghost`,
        color: is_def ? `text` : `${color}.secondary`,
        border: 0,
        borderColor: `transparent`,
      },
    };
  }

  throw new Error(`useColorTemplate: Unknown type ${type}`);
};

export default useColorTemplate;
