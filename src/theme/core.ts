"use client";
import React, { useContext } from "react";
import { ObjectType, ThemeOptions, ThemeOptionInput } from "./types";
import { breakpoints } from "../css";
import { defaultThemeOptions } from "./ThemeDefaultOptions";
import { createPalette } from "./palette";

export const mergeObject = (a: ObjectType, b: ObjectType) => {
  a = { ...a };
  b = { ...b };
  for (const key in b) {
    const v = (b as any)[key];
    if (
      typeof v === "object" &&
      !Array.isArray(v) &&
      !React.isValidElement(v)
    ) {
      a[key] = mergeObject(a[key], b[key]);
    } else {
      a[key] = v;
    }
  }
  return a;
};

export const createTheme = (options: ThemeOptionInput): ThemeOptions => {
  options.mode = options?.mode ?? "light";
  options.name = options.name ?? options.mode;
  let theme: any = mergeObject(defaultThemeOptions, {
    ...options,
    breakpoints: breakpoints,
  });

  theme.colors = createPalette(theme.colors, options.mode);
  return theme as ThemeOptions;
};

export type ThemeCntextProps = {
  theme: ThemeOptions;
  onThemeUpdate: (theme: ThemeOptions) => void;
};

export const ThemeContext = React.createContext<ThemeCntextProps>({
  theme: createTheme({
    name: "light",
    mode: "light",
  }),
  onThemeUpdate(theme) {},
});

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  const theme = ctx.theme;
  theme.update = (theme: ThemeOptions) => ctx.onThemeUpdate(theme);
  return theme;
};
