import { useTheme } from "./theme"
export type ColorTemplateColors = "default" | "brand" | "accent" | "info" | "success" | "warning" | "danger"
export type ColorTemplateType = "fill" | "outline" | "text" | "alpha"

const useColorTemplate = (color: ColorTemplateColors, type: ColorTemplateType) => {
    const theme: any = useTheme()
    let _color = color === 'default' ? "background" : color as any
    return theme.colors[_color]?.template[type]
}

export default useColorTemplate