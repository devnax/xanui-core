import { useTheme } from "../theme"
import { ThemeColor } from "../theme/types"

export type UseColorTemplateType = "fill" | "outline" | "text" | "alpha"

const useColorTemplate = (name: keyof ThemeColor, type: UseColorTemplateType) => {
    const theme = useTheme()
    let color = theme.colors[name]

    let template = {
        outline: {
            bgcolor: "transparent",
            color: color.text,
            border: 1,
            borderColor: color.divider,
            hover: {
                color: color.text,
                borderColor: color.divider,
            }
        },
        fill: {
            bgcolor: color.primary,
            color: color.text,
            hover: {
                bgcolor: color.secondary,
                color: color.text,
            }
        },
        text: {
            bgcolor: "transparent",
            color: color.primary,
            hover: {
                bgcolor: color.alpha,
                color: color.primary,
            }
        },
        alpha: {
            bgcolor: color.alpha,
            color: color.primary,
            hover: {
                bgcolor: color.alpha,
                color: color.primary,
            }
        }
    }
    return template[type]
}

export default useColorTemplate