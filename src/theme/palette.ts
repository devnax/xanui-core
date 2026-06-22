import { colorScale, parseColor } from "hueforge";
import { ColorScale } from "./types";

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

export const createPalette = (color: string | ColorScale) => {
  const scale = typeof color === "string" ? colorScale(color) : color;
  const r = parseColor(scale[500]);

  return {
    primary: scale[500],
    secondary: scale[600],
    contrast: scale[50],
    muted: scale[300],
    divider: scale[200],
    ghost: `rgba(${r[0]}, ${r[1]}, ${r[2]}, .09)`,
    shades: {
      1: scale[100],
      2: scale[400],
      3: scale[700],
      4: scale[800],
      5: scale[900],
      6: scale[950],
    },
  };
};
