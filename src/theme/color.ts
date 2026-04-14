
type ColorRole = {
   main: string;
   light: string;
   dark: string;
   contrast: string;
   muted: string;
   divider: string;
   alpha: string;
};

// -------------------------
// COLOR PARSER
// -------------------------

function parseColor(input: string): { r: number; g: number; b: number } {
   input = input.trim().toLowerCase();

   // HEX
   if (input.startsWith("#")) {
      return hexToRgb(input);
   }

   // RGB / RGBA
   if (input.startsWith("rgb")) {
      const nums = input.match(/[\d.]+/g);
      if (!nums) throw new Error("Invalid RGB color");

      return {
         r: parseFloat(nums[0]),
         g: parseFloat(nums[1]),
         b: parseFloat(nums[2]),
      };
   }

   // HSL / HSLA
   if (input.startsWith("hsl")) {
      const nums = input.match(/[\d.]+/g);
      if (!nums) throw new Error("Invalid HSL color");

      const h = parseFloat(nums[0]) / 360;
      const s = parseFloat(nums[1]) / 100;
      const l = parseFloat(nums[2]) / 100;

      return hslToRgb(h, s, l);
   }

   throw new Error("Unsupported color format");
}

// -------------------------
// NORMALIZATION (IMPORTANT FIX)
// prevents white/black collapse
// -------------------------

function normalizeColor(r: number, g: number, b: number) {
   const min = 18;
   const max = 237;

   const scale = (v: number) =>
      min + (v / 255) * (max - min);

   return {
      r: scale(r),
      g: scale(g),
      b: scale(b),
   };
}

// -------------------------
// HEX <-> RGB
// -------------------------

function hexToRgb(hex: string) {
   hex = hex.replace("#", "");

   if (hex.length === 3) {
      hex = hex.split("").map(c => c + c).join("");
   }

   const num = parseInt(hex, 16);

   return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
   };
}

function rgbToHex(r: number, g: number, b: number) {
   return (
      "#" +
      [r, g, b]
         .map(x => {
            const h = Math.round(x).toString(16);
            return h.length === 1 ? "0" + h : h;
         })
         .join("")
   );
}

// -------------------------
// HSL <-> RGB
// -------------------------

function hslToRgb(h: number, s: number, l: number) {
   let r: number, g: number, b: number;

   if (s === 0) {
      r = g = b = l;
   } else {
      const hue2rgb = (p: number, q: number, t: number) => {
         if (t < 0) t += 1;
         if (t > 1) t -= 1;
         if (t < 1 / 6) return p + (q - p) * 6 * t;
         if (t < 1 / 2) return q;
         if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
         return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
   }

   return {
      r: r * 255,
      g: g * 255,
      b: b * 255,
   };
}

function rgbToHsl(r: number, g: number, b: number) {
   r /= 255;
   g /= 255;
   b /= 255;

   const max = Math.max(r, g, b);
   const min = Math.min(r, g, b);

   let h = 0,
      s = 0,
      l = (max + min) / 2;

   if (max !== min) {
      const d = max - min;

      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
         case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
         case g:
            h = (b - r) / d + 2;
            break;
         case b:
            h = (r - g) / d + 4;
            break;
      }

      h /= 6;
   }

   return { h, s, l };
}

// -------------------------
// HELPERS
// -------------------------

function clamp(v: number, min = 0, max = 1) {
   return Math.min(max, Math.max(min, v));
}

function adjust(hex: string, dl = 0, ds = 0) {
   const { r, g, b } = parseColor(hex);
   const hsl = rgbToHsl(r, g, b);

   const l = clamp(hsl.l + dl);
   const s = clamp(hsl.s + ds);

   const rgb = hslToRgb(hsl.h, s, l);
   return rgbToHex(rgb.r, rgb.g, rgb.b);
}

function desaturate(hex: string, amount: number) {
   const { r, g, b } = parseColor(hex);
   const hsl = rgbToHsl(r, g, b);

   const s = clamp(hsl.s * (1 - amount));

   const rgb = hslToRgb(hsl.h, s, hsl.l);
   return rgbToHex(rgb.r, rgb.g, rgb.b);
}

function getContrast(hex: string) {
   const { r, g, b } = parseColor(hex);

   const luminance =
      (0.299 * r + 0.587 * g + 0.114 * b) / 255;

   return luminance > 0.6 ? "#111827" : "#F9FAFB";
}

function withAlpha(hex: string, alpha: number) {
   const { r, g, b } = parseColor(hex);

   const a = Math.min(1, Math.max(0, alpha));

   return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a})`;
}

// -------------------------
// MAIN ENGINE
// -------------------------

export function generateColorRole(input: string): ColorRole {
   const raw = parseColor(input);

   // 🔥 KEY FIX: normalize prevents white/black collapse
   const { r, g, b } = normalizeColor(raw.r, raw.g, raw.b);

   const main = rgbToHex(r, g, b);

   return {
      main,

      light: adjust(main, 0.12, -0.05),
      dark: adjust(main, -0.12, 0.05),

      muted: adjust(desaturate(main, 0.6), 0.08, 0),

      divider: adjust(desaturate(main, 0.85), 0.18, 0),

      contrast: getContrast(main),

      alpha: withAlpha(main, 0.12),
   };
}