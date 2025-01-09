import { useTheme } from "./theme"
export type useColorTemplateColors = "default" | "brand" | "accent" | "info" | "success" | "warning" | "danger"
export type useColorTemplateType = "fill" | "outline" | "text" | "alpha"

const useColorTemplate = (color: useColorTemplateColors, type: useColorTemplateType) => {
    const theme: any = useTheme()
    let _color = color === 'default' ? "background" : color as any
    return theme.colors[_color]?.template[type]
}

export default useColorTemplate