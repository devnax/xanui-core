type OKLCH = {
   l: number;
   c: number;
   h: number;
};

type ColorRole = {
   main: string;
   light: string;
   dark: string;
   contrast: string;
   muted: string;
   divider: string;
   disabled: string;
   ghost: string;
};

/* ---------------- PARSERS ---------------- */

export function toOKLCH(input: string): OKLCH {
   if (input.startsWith("oklch")) {
      const values = input.match(/[\d.]+/g);
      if (!values || values.length < 3) {
         throw new Error("Invalid OKLCH format");
      }

      let [l, c, h] = values.map(Number);

      return {
         l: l > 1 ? l / 100 : l,
         c,
         h,
      };
   }

   const rgb = parseToRgb(input);
   const lab = rgbToOklab(rgb.r, rgb.g, rgb.b);
   return oklabToOklch(lab.L, lab.a, lab.b);
}

function parseToRgb(input: string) {
   input = input.trim().toLowerCase();

   if (input.startsWith("#")) return parseHex(input);
   if (input.startsWith("rgb")) return parseRgb(input);
   if (input.startsWith("hsl")) return parseHsl(input);

   throw new Error("Unsupported format");
}

/* ---------------- CORE MATH ---------------- */

function srgbToLinear(c: number) {
   return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function rgbToOklab(r: number, g: number, b: number) {
   r = srgbToLinear(r);
   g = srgbToLinear(g);
   b = srgbToLinear(b);

   const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
   const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
   const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;

   const l_ = Math.cbrt(l);
   const m_ = Math.cbrt(m);
   const s_ = Math.cbrt(s);

   return {
      L: 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_,
      a: 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_,
      b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_,
   };
}

function oklabToOklch(L: number, a: number, b: number): OKLCH {
   const c = Math.sqrt(a * a + b * b);
   let h = Math.atan2(b, a) * (180 / Math.PI);

   if (h < 0) h += 360;

   return { l: L, c, h };
}

/* ---------------- FORMAT ---------------- */

function formatOklch(color: OKLCH, alpha = 1): string {
   const l = (color.l * 100).toFixed(2) + "%";
   const c = color.c.toFixed(4);
   const h = color.h.toFixed(2);

   return alpha === 1
      ? `oklch(${l} ${c} ${h})`
      : `oklch(${l} ${c} ${h} / ${alpha})`;
}

/* ---------------- UTILS ---------------- */

function clamp(v: number, min = 0, max = 1) {
   return Math.min(max, Math.max(min, v));
}


export function createPalette(input: string): ColorRole {
   const base = toOKLCH(input);
   const isTrueBlack = base.l < 0.2 && base.c < 0.02;
   const isTrueWhite = base.l > 0.92 && base.c < 0.015;
   const isDark = base.l < 0.75;

   if (isTrueBlack) {
      return {
         main: formatOklch(base),

         light: formatOklch({
            l: clamp(base.l + (1 - base.l) * 0.10),
            c: base.c * 0.85,
            h: base.h,
         }),

         dark: formatOklch({
            l: 0.04,
            c: 0.005,
            h: base.h,
         }),

         muted: formatOklch({
            l: 0.72,
            c: 0.01,
            h: base.h,
         }),

         disabled: formatOklch({
            l: 0.30,
            c: 0,
            h: base.h,
         }),

         contrast: formatOklch({
            l: 0.98,
            c: 0.01,
            h: base.h,
         }),

         divider: formatOklch({
            l: 0.30,
            c: 0.002,
            h: 0,
         }),

         ghost: formatOklch({
            l: clamp(base.l + (1 - base.l) * 0.10),
            c: base.c * 0.85,
            h: base.h,
         }, 0.6),

      };
   }

   if (isTrueWhite) {
      return {
         main: formatOklch(base),

         light: formatOklch({
            l: 0.95,
            c: 0,
            h: base.h
         }),

         dark: formatOklch({
            l: 0.86,
            c: 0,
            h: base.h,
         }),

         muted: formatOklch({
            l: 0.55,
            c: 0,
            h: base.h,
         }),

         disabled: formatOklch({
            l: 0.75,
            c: 0,
            h: base.h,
         }),

         contrast: formatOklch({
            l: 0.15,
            c: 0,
            h: base.h,
         }),

         divider: formatOklch({
            l: 0.85,
            c: 0,
            h: 0,
         }),

         ghost: formatOklch({
            l: 0.85,
            c: 0,
            h: base.h
         }, 0.2),
      };
   }


   return {
      main: formatOklch(base),

      light: formatOklch({
         l: clamp(base.l + 0.10),
         c: clamp(base.c * 1.2),
         h: base.h
      }),

      dark: formatOklch({
         l: clamp(base.l - 0.06),
         c: clamp(base.c * 1),
         h: base.h
      }),

      muted: formatOklch({
         l: clamp(base.l + (isDark ? 0.25 : -0.25)),
         c: clamp(base.c * 0.22),
         h: base.h
      }),

      disabled: formatOklch({
         l: clamp(base.l + (isDark ? 0.01 : -0.01)),
         c: clamp(base.c * 0.15),
         h: base.h
      }),

      contrast: formatOklch({
         l: isDark ? 0.97 : 0.11,
         c: 0.01,
         h: base.h
      }),

      divider: formatOklch({
         l: clamp(base.l - 0.20),
         c: clamp(base.c * 1.08),
         h: base.h
      }, .3),

      ghost: formatOklch(base, isDark ? 0.1 : .22),
   };
}

/* ---------------- PARSERS ---------------- */

function parseHex(hex: string) {
   hex = hex.replace("#", "").trim();

   if (hex.length === 3) {
      hex = hex.split("").map(c => c + c).join("");
   }

   const num = parseInt(hex, 16);

   return {
      r: ((num >> 16) & 255) / 255,
      g: ((num >> 8) & 255) / 255,
      b: (num & 255) / 255,
   };
}

function parseRgb(input: string) {
   const values = input.match(/[\d.]+/g);
   if (!values || values.length < 3) {
      throw new Error("Invalid RGB format");
   }

   const [r, g, b] = values.map(Number);

   return {
      r: r / 255,
      g: g / 255,
      b: b / 255,
   };
}

function parseHsl(input: string) {
   const values = input.match(/[\d.]+/g);
   if (!values || values.length < 3) {
      throw new Error("Invalid HSL format");
   }

   let [h, s, l] = values.map(Number);

   h /= 360;
   s /= 100;
   l /= 100;

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

   return {
      r: hue2rgb(p, q, h + 1 / 3),
      g: hue2rgb(p, q, h),
      b: hue2rgb(p, q, h - 1 / 3),
   };
}