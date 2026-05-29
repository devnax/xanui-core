import { useTheme } from "../theme";

const useThemeComponent = <P extends object>(
  name: string,
  userPorps: P,
  defaultProps: P,
) => {
  const theme = useTheme();
  let _props = { ...defaultProps, ...userPorps } as P;
  if (name in theme.components) {
    return theme.components[name](_props, theme);
  }
  return [_props, theme];
};

export default useThemeComponent;
