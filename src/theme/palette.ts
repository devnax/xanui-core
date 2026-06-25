import { colorScale, hexToRgb } from "hueforge";
import {
  ColorCode,
  ThemeMode,
  ThemeOptionColorNeutralInput,
  ThemeOptionColors,
  ThemeOptionColorsInput,
} from "./types";

// const colors = [
//   { label: "Slate", value: "#64748b" },
//   { label: "Gray", value: "#6b7280" },
//   { label: "Zinc", value: "#71717a" },
//   { label: "Neutral", value: "#737373" },
//   { label: "Stone", value: "#78716c" },

//   { label: "Red", value: "#ef4444" },
//   { label: "Orange", value: "#f97316" },
//   { label: "Amber", value: "#f59e0b" },
//   { label: "Yellow", value: "#eab308" },
//   { label: "Lime", value: "#84cc16" },

//   { label: "Green", value: "#22c55e" },
//   { label: "Emerald", value: "#10b981" },
//   { label: "Teal", value: "#14b8a6" },
//   { label: "Cyan", value: "#06b6d4" },
//   { label: "Sky", value: "#0ea5e9" },

//   { label: "Blue", value: "#3b82f6" },
//   { label: "Indigo", value: "#6366f1" },
//   { label: "Violet", value: "#8b5cf6" },
//   { label: "Purple", value: "#a855f7" },
//   { label: "Fuchsia", value: "#d946ef" },

//   { label: "Pink", value: "#ec4899" },
//   { label: "Rose", value: "#f43f5e" },
// ];

const neutralColors = {
  Slate: "#64748b",
  Gray: "#6b7280",
  Zinc: "#71717a",
  Neutral: "#737373",
  Stone: "#78716c",
};

const defaultColors = {
  brand: "#3b82f6",
  accent: "#f59e0b",
  info: "#0ea5e9",
  success: "#22c55e",
  warning: "#eab308",
  danger: "#ef4444",
};

export const createNeutralColorScale = (
  color: ThemeOptionColorNeutralInput,
  mode: ThemeMode,
) => {
  if (color in neutralColors) {
    color = (neutralColors as any)[color];
  }
  const steps = [
    50, 100, 180, 200, 250, 300, 400, 500, 600, 700, 800, 900, 950,
  ];
  const scale = colorScale(color, "hex", steps);

  if (mode === "dark") {
    return Object.fromEntries(
      Object.entries(scale).map(([_key, value], index, arr) => [
        arr[arr.length - 1 - index][0],
        value,
      ]),
    );
  }

  return scale;
};

export const neutralColorSteps = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
] as const;

export const formatNeutralColors = (scale: Record<number, string>) => {
  const colors: Record<number, string> = {};
  for (let step of neutralColorSteps) {
    colors[step] = scale[step];
  }

  return colors;
};

export const createVariantColors = (color: ColorCode) => {
  const steps = [50, 500, 550];
  const scale = colorScale(color, "hex", steps);
  const [r, g, b] = hexToRgb(scale[500]);
  return {
    primary: scale[500],
    secondary: scale[550],
    contrast: scale[50],
    ghost: {
      primary: `rgba(${r}, ${g}, ${b}, .1)`,
      secondary: `rgba(${r}, ${g}, ${b}, .2)`,
    },
  };
};

export const createPalette = (
  colors: ThemeOptionColorsInput,
  mode: ThemeMode,
): ThemeOptionColors => {
  const scale = createNeutralColorScale(colors.neutral || "Gray", mode);
  const neutral = formatNeutralColors(scale);
  const neutralBase = scale[500];
  const [r, g, b] = hexToRgb(neutralBase);
  const surface = colors.surface || {
    primary: scale[50],
    secondary: scale[200],
  };
  const paper = colors.paper || {
    primary: scale[180],
    secondary: scale[250],
    ghost: {
      primary: `rgba(${r}, ${g}, ${b}, .1)`,
      secondary: `rgba(${r}, ${g}, ${b}, .2)`,
    },
  };
  const text = colors.text || {
    primary: scale[900],
    secondary: scale[600],
  };
  const divider = colors.divider || {
    primary: scale[200],
    secondary: scale[300],
  };

  const variants: any = {};
  const variant_names = [
    "brand",
    "accent",
    "info",
    "success",
    "warning",
    "danger",
  ];
  for (let name of variant_names) {
    let color = (colors as any)[name] || (defaultColors as any)[name];
    variants[name] = createVariantColors(color);
  }

  return {
    neutral,
    surface,
    paper,
    text,
    divider,
    ...variants,
  };
};
