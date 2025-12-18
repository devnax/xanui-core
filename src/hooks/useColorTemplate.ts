import { alpha } from "../css"
import { useTheme } from "../theme"
import { ThemeColor } from "../theme/types"

export type UseColorTemplateType = "fill" | "outline" | "text" | "alpha"
export type UseColorTemplateColor = "common" | "brand" | "accent" | "success" | "info" | "warning" | "danger"

const useColorTemplate = (name: keyof ThemeColor, type: UseColorTemplateType) => {
    const theme = useTheme()
    let color: any = theme.colors[name]
    let divider = theme.colors.divider.primary

    if (name === "common") {
        color = {
            ...color,
            text: theme.colors.text.primary,
        }
    }

    const if_common = (a: string, b: string) => name === "common" ? a : b

    if (type === "outline") {
        return {
            bgcolor: "transparent",
            color: if_common(color.text, color.primary),
            border: 1,
            borderColor: divider,
            hover: {
                color: if_common(color.text, color.secondary),
                border: 1,
                borderColor: color.divider,
            }
        }
    } else if (type === "fill") {
        return {
            bgcolor: if_common(color.secondary, color.primary),
            color: color.text,
            border: 0,
            borderColor: `transparent`,
            hover: {
                bgcolor: if_common(color.secondary, color.secondary),
                color: color.text,
                border: 0,
                borderColor: `transparent`,
            }
        }
    } else if (type === "text") {
        return {
            bgcolor: "transparent",
            color: if_common(color.text, color.primary),
            border: 0,
            borderColor: `transparent`,
            hover: {
                bgcolor: if_common(color.secondary, alpha(color.primary, 0.09)),
                color: if_common(color.text, color.primary),
                border: 0,
                borderColor: `transparent`,
            }
        }
    } else if (type === "alpha") {
        return {
            bgcolor: if_common(color.secondary, alpha(color.primary, 0.09)),
            color: if_common(color.text, color.primary),
            border: 0,
            borderColor: `transparent`,
            hover: {
                bgcolor: if_common(color.secondary, alpha(color.primary, 0.15)),
                color: if_common(color.text, color.primary),
                border: 0,
                borderColor: `transparent`,
            }
        }
    }

    throw new Error(`useColorTemplate: Unknown type ${type}`);
}

export default useColorTemplate