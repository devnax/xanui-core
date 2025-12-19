export type UseColorTemplateType = "fill" | "outline" | "text" | "soft"
export type UseColorTemplateColor = "default" | "brand" | "accent" | "success" | "info" | "warning" | "danger"

const useColorTemplate = (color: UseColorTemplateColor, type: UseColorTemplateType) => {
    const is_def = color === "default";
    if (is_def) {
        color = "divider" as any
    }

    if (type === "outline") {
        return {
            primary: {
                bgcolor: `transparent`,
                color: is_def ? `text.primary` : `${color}.primary`,
                border: 1,
                borderColor: is_def ? `divider` : `${color}.primary`,
            },
            secondary: {
                bgcolor: `transparent`,
                color: is_def ? `text.primary` : `${color}.secondary`,
                border: 1,
                borderColor: is_def ? `divider.secondary` : `${color}.secondary`,
            }
        }
    } else if (type === "fill") {
        return {
            primary: {
                bgcolor: color,
                color: is_def ? `text.primary` : `${color}.text`,
                border: 1,
                borderColor: is_def ? `divider.secondary` : `${color}.secondary`,
            },
            secondary: {
                bgcolor: `${color}.secondary`,
                color: is_def ? `text.primary` : `${color}.text`,
                border: 1,
                borderColor: is_def ? `divider.secondary` : `${color}.secondary`,
            }
        }
    } else if (type === "text") {
        return {
            primary: {
                bgcolor: "transparent",
                color: is_def ? `text.primary` : `${color}.primary`,
                border: 0,
                borderColor: `transparent`,
            },
            secondary: {
                bgcolor: "transparent",
                color: is_def ? `text.primary` : `${color}.secondary`,
                border: 0,
                borderColor: `transparent`,
            }
        }
    } else if (type === "soft") {
        return {
            primary: {
                bgcolor: `${color}.soft.primary`,
                color: is_def ? `text.primary` : color,
                border: 0,
                borderColor: `transparent`,
            },
            secondary: {
                bgcolor: `${color}.soft.secondary`,
                color: is_def ? `text.primary` : `${color}.secondary`,
                border: 0,
                borderColor: `transparent`,
            }
        }
    }

    throw new Error(`useColorTemplate: Unknown type ${type}`);
}

export default useColorTemplate