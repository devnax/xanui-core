export type ColorScale = {
   mode: "black" | "white" | "other";  // semantic color mode
   base: string;
   light: string;
   lighter: string;
   dark: string;
   darker: string;
   soft: string;
   softer: string;
   divider: string;
   text: string;
   subtext: string;
};

function createColorScale(hex: string): ColorScale {
   type RGB = { r: number; g: number; b: number };

   const clamp = (v: number): number =>
      Math.min(255, Math.max(0, Math.round(v)));

   const hexToRgb = (hex: string): RGB => {
      let h = hex.replace("#", "");
      if (h.length === 3) h = h.split("").map(c => c + c).join("");
      const n = parseInt(h, 16);
      return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
   };

   const rgbToHex = ({ r, g, b }: RGB): string =>
      `#${[r, g, b].map(v => clamp(v).toString(16).padStart(2, "0")).join("")}`;

   const mix = (a: RGB, b: RGB, w: number): RGB => ({
      r: clamp(a.r * (1 - w) + b.r * w),
      g: clamp(a.g * (1 - w) + b.g * w),
      b: clamp(a.b * (1 - w) + b.b * w),
   });

   const luminance = ({ r, g, b }: RGB): number =>
      (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

   const base = hexToRgb(hex);
   const lum = luminance(base);
   const isLight = lum > 0.6;

   const textRgb: RGB = isLight
      ? { r: 0, g: 0, b: 0 }
      : { r: 255, g: 255, b: 255 };

   // Determine mode
   let mode: "black" | "white" | "other" = "other";
   if (lum < 0.15) mode = "black";
   else if (lum > 0.9) mode = "white";

   let rgbW = { r: 255, g: 255, b: 255 }
   let rgbB = { r: 0, g: 0, b: 0 }

   let scale: any = {
      mode,

      // core
      base: rgbToHex(base),

      // lighter variants
      light: rgbToHex(mix(base, rgbW, 0.15)),
      lighter: rgbToHex(mix(base, rgbW, 0.35)),

      // darker variants
      dark: rgbToHex(mix(base, rgbB, 0.15)),
      darker: rgbToHex(mix(base, rgbB, 0.35)),

      // soft backgrounds
      soft: rgbToHex(mix(base, rgbW, 0.85)),
      softer: rgbToHex(mix(base, rgbW, 0.92)),

      // text colors
      text: isLight ? "#000000" : "#FFFFFF",
      subtext: rgbToHex(mix(textRgb, base, 0.35)), // muted but readable
   };

   if (mode === "white") {
      scale = {
         ...scale,

         light: rgbToHex(mix(base, rgbB, 0.20)),
         lighter: rgbToHex(mix(base, rgbB, 0.30)),

         dark: rgbToHex(mix(base, rgbB, 0.08)),
         darker: rgbToHex(mix(base, rgbB, 0.12)),

         soft: rgbToHex(mix(base, rgbB, 0.08)),
         softer: rgbToHex(mix(base, rgbB, 0.12)),

      }
   } else if (mode === "black") {
      scale = {
         ...scale,

         light: rgbToHex(mix(base, rgbW, 0.20)),
         lighter: rgbToHex(mix(base, rgbW, 0.30)),

         dark: rgbToHex(mix(base, rgbW, 0.08)),
         darker: rgbToHex(mix(base, rgbW, 0.12)),

         soft: rgbToHex(mix(base, rgbW, 0.08)),
         softer: rgbToHex(mix(base, rgbW, 0.12)),

      }
   }

   return scale
}

export default createColorScale;
