import { useTheme } from "./theme"

const useInterface = <P extends object>(name: string, userPorps: P, defaultProps: P) => {
    const theme = useTheme()
    const _interface = theme.interfaces[name]

    if (_interface) {
        defaultProps = _interface<P>({ ...defaultProps, ...userPorps }, theme)
    }
    return [{ ...defaultProps, ...userPorps }, theme]
}

export default useInterface