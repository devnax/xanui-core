export type UseColorTemplateType = "fill" | "outline" | "text" | "soft"
export type UseColorTemplateColor = "common" | "brand" | "accent" | "success" | "info" | "warning" | "danger"

const useColorTemplate = (color: UseColorTemplateColor, type: UseColorTemplateType) => {
    const if_common = (a: string, b: string) => color === "common" ? a : b

    if (type === "outline") {
        return {
            bgcolor: "transparent",
            color: if_common(`${color}.text`, color),
            border: 1,
            borderColor: `${color}.dark`,
            hover: {
                bgcolor: "transparent",
                color: if_common(`${color}.text`, color),
                border: 1,
                borderColor: `${color}.darker`,
            }
        }
    } else if (type === "fill") {
        return {
            bgcolor: if_common(`${color}.light`, color),
            color: `${color}.text`,
            border: 0,
            borderColor: `transparent`,
            hover: {
                bgcolor: if_common(`${color}.lighter`, `${color}.dark`),
                color: `${color}.text`,
                border: 0,
                borderColor: `transparent`,
            }
        }
    } else if (type === "text") {
        return {
            bgcolor: "transparent",
            color: if_common(`${color}.text`, color),
            border: 0,
            borderColor: `transparent`,
            hover: {
                bgcolor: "transparent",
                color: if_common(`${color}.text`, `${color}.dark`),
                border: 0,
                borderColor: `transparent`,
            }
        }
    } else if (type === "soft") {
        return {
            bgcolor: `${color}.soft`,
            color: if_common(`${color}.text`, color),
            border: 0,
            borderColor: `transparent`,
            hover: {
                bgcolor: `${color}.softer`,
                color: if_common(`${color}.text`, color),
                border: 0,
                borderColor: `transparent`,
            }
        }
    }

    throw new Error(`useColorTemplate: Unknown type ${type}`);
}

export default useColorTemplate