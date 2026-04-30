"use client";

import { ThemeColorKeys } from "../theme/types";

export type UseColorTemplateType = "fill" | "outline" | "text" | "ghost"
export type UseColorTemplateColor = ThemeColorKeys

const useColorTemplate = (color: UseColorTemplateColor, type: UseColorTemplateType) => {
    const is_def = color === "default";

    if (type === "outline") {
        return {
            main: {
                bgcolor: `transparent`,
                color: is_def ? `default.contrast` : `${color}.base`,
                border: "1px solid",
                borderColor: `${color}.divider`,
            },
            hover: {
                bgcolor: `transparent`,
                color: is_def ? `default.contrast` : `${color}.base`,
                border: "1px solid",
                borderColor: is_def ? "default.muted" : `${color}.base`,
            }
        }
    } else if (type === "fill") {
        return {
            main: {
                bgcolor: is_def ? `default.base` : `${color}`,
                color: `${color}.contrast`,
                border: 0,
                borderColor: 'transparent',
            },
            hover: {
                bgcolor: is_def ? `default.elevated` : `${color}.surface`,
                color: `${color}.contrast`,
                border: 0,
                borderColor: 'transparent',
            }
        }
    } else if (type === "text") {
        return {
            main: {
                bgcolor: "transparent",
                color: is_def ? `default.contrast` : `${color}.base`,
                border: 0,
                borderColor: `transparent`,
            },
            hover: {
                bgcolor: "transparent",
                color: is_def ? `default.contrast` : `${color}.surface`,
                border: 0,
                borderColor: `transparent`,
            }
        }
    } else if (type === "ghost") {
        return {
            main: {
                bgcolor: `${color}.ghost`,
                color: is_def ? `default.contrast` : color,
                border: 0,
                borderColor: `transparent`,
            },
            hover: {
                bgcolor: `${color}.ghost`,
                color: is_def ? `default.contrast` : `${color}.surface`,
                border: 0,
                borderColor: `transparent`,
            }
        }
    }

    throw new Error(`useColorTemplate: Unknown type ${type}`);
}

export default useColorTemplate