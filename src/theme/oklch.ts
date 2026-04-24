type OKLCH = {
   l: number;
   c: number;
   h: number;
};

type ColorRole = {
   main: string;
   light: string;
   lighter: string;
   dark: string;
   darker: string;
   contrast: string;
   muted: string;
   divider: string;
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

export function createDarkThemePalette(input: string): ColorRole {
   const base = toOKLCH(input);

   const isNeutral = base.c < 0.03;
   const isDarkEnough = base.l < 0.2;
   const isNearBlack = isNeutral && isDarkEnough;
   const safeC = Math.min(base.c, 0.22);

   const main: OKLCH = {
      l: base.l,
      c: safeC,
      h: base.h
   };

   if (isNearBlack) {
      const neutralHue = 0;
      const safeC = Math.min(base.c, 0.25);

      const step = (i: number): OKLCH => {
         const offset = (i - 3) * 0.09;
         const l = clamp(base.l + offset)
         return { l, c: safeC, h: base.h };
      };

      return {
         main: formatOklch(main),
         light: formatOklch(step(3.5)),
         lighter: formatOklch(step(4.5)),
         dark: formatOklch(step(2.5)),
         darker: formatOklch(step(1.5)),
         contrast: formatOklch({ l: 0.96, c: 0, h: neutralHue }),
         muted: formatOklch({ l: 0.85, c: 0, h: neutralHue }),
         divider: formatOklch({
            l: 0.43,
            c: 0,
            h: 0
         }),
         ghost: formatOklch({ l: 0.96, c: 0, h: neutralHue }, 0.16)
      };
   }

   return createPalette(input, "dark")
}

export function createLightThemePalette(input: string): ColorRole {
   const base = toOKLCH(input);

   const isNearWhite = base.l > 0.98 && base.c < 0.01;
   const main = formatOklch(base);
   if (isNearWhite) {
      const neutralHue = 0;
      const safeC = Math.min(base.c, 0.25);

      const step = (i: number): OKLCH => {
         const offset = (i - 3) * 0.09;
         const l = clamp(base.l - offset);
         return { l, c: safeC, h: base.h };
      };

      return {
         main,
         light: formatOklch(step(4)),
         lighter: formatOklch(step(3.5)),
         dark: formatOklch(step(5.5)),
         darker: formatOklch(step(6.5)),
         contrast: formatOklch({
            l: 0.12,
            c: 0,
            h: neutralHue
         }),
         muted: formatOklch({
            l: 0.50,
            c: 0,
            h: neutralHue
         }),
         divider: formatOklch({
            l: 0.75,
            c: 0,
            h: neutralHue
         }),
         ghost: formatOklch(
            { l: 0.12, c: 0, h: neutralHue },
            0.12
         )
      };
   }

   return createPalette(input, "light");
}

export function createPalette(input: string, mode: "light" | "dark" = "light"): ColorRole {
   const base = toOKLCH(input);
   const isDark = mode === "dark";
   const isLightColor = base.l > 0.75;
   const safeC = Math.min(base.c, 0.25);

   const step = (i: number): OKLCH => {
      const offset = (i - 3) * 0.09;
      const l = isDark ? clamp(base.l + offset) : clamp(base.l - offset);
      return { l, c: safeC, h: base.h };
   };

   const main: OKLCH = {
      l: base.l,
      c: safeC,
      h: base.h
   };

   const contrast = {
      l: !isLightColor ? 0.96 : 0.12,
      c: 0.02,
      h: base.h
   }

   return {
      main: formatOklch(main),
      light: formatOklch(step(isDark ? 4 : 2)),
      lighter: formatOklch(step(isDark ? 5 : 1)),
      dark: formatOklch(step(isDark ? 2 : 4)),
      darker: formatOklch(step(isDark ? 1 : 5)),
      ghost: formatOklch(main, isDark ? 0.12 : 0.18),

      contrast: formatOklch(contrast),

      muted: formatOklch({
         l: clamp(contrast.l - (isDark ? 0.05 : 0.025)),
         c: clamp(contrast.c - 0.01),
         h: contrast.h
      }),

      divider: formatOklch({
         l: clamp(contrast.l - (isDark ? 0.4 : 0.35)),
         c: clamp(contrast.c + (isDark ? .03 : .08)),
         h: contrast.h
      }),
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
