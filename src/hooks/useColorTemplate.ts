"use client";

import { ThemeColorKeys } from "../theme/types";

export type UseColorTemplateType = "fill" | "outline" | "text" | "ghost"
export type UseColorTemplateColor = ThemeColorKeys

const useColorTemplate = (color: UseColorTemplateColor, type: UseColorTemplateType) => {
    const is_def = color === "surface";

    if (type === "outline") {
        return {
            main: {
                bgcolor: `transparent`,
                color: is_def ? `surface.contrast` : `${color}.main`,
                border: "1px solid",
                borderColor: is_def ? `surface.muted` : `${color}.main`,
            },
            hover: {
                bgcolor: `transparent`,
                color: is_def ? `surface.contrast` : `${color}.light`,
                border: "1px solid",
                borderColor: is_def ? `surface.muted` : `${color}.light`,
            }
        }
    } else if (type === "fill") {
        return {
            main: {
                bgcolor: is_def ? `surface.light` : `${color}`,
                color: is_def ? `surface.contrast` : `${color}.contrast`,
                border: "1px solid",
                borderColor: is_def ? `surface.divider` : `${color}.light`,
            },
            hover: {
                bgcolor: is_def ? `surface.dark` : `${color}.light`,
                color: is_def ? `surface.contrast` : `${color}.contrast`,
                border: "1px solid",
                borderColor: is_def ? `surface.divider` : `${color}.light`,
            }
        }
    } else if (type === "text") {
        return {
            main: {
                bgcolor: "transparent",
                color: is_def ? `surface.contrast` : `${color}.main`,
                border: 0,
                borderColor: `transparent`,
            },
            hover: {
                bgcolor: "transparent",
                color: is_def ? `surface.contrast` : `${color}.light`,
                border: 0,
                borderColor: `transparent`,
            }
        }
    } else if (type === "ghost") {
        return {
            main: {
                bgcolor: `${color}.ghost`,
                color: is_def ? `surface.contrast` : color,
                border: 0,
                borderColor: `transparent`,
            },
            hover: {
                bgcolor: `${color}.ghost`,
                color: is_def ? `surface.contrast` : `${color}.light`,
                border: 0,
                borderColor: `transparent`,
            }
        }
    }

    throw new Error(`useColorTemplate: Unknown type ${type}`);
}

export default useColorTemplate