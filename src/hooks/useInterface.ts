import { useTheme } from "../theme"

const useInterface = <P extends object>(name: string, userPorps: P, defaultProps: P) => {
    const theme = useTheme()
    let _props = { ...defaultProps, ...userPorps } as P
    if (name in theme.interfaces) {
        return theme.interfaces[name](_props, theme)
    }
    return [_props, theme]
}

export default useInterface