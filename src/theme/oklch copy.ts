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
   alpha: string;
};

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
   if (!values) throw new Error("Invalid RGB");

   const [r, g, b] = values.map(Number);

   return {
      r: r / 255,
      g: g / 255,
      b: b / 255,
   };
}

function parseHsl(input: string) {
   const values = input.match(/[\d.]+/g);
   if (!values) throw new Error("Invalid HSL");

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

   let r: number, g: number, b: number;

   if (s === 0) {
      r = g = b = l;
   } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
   }

   return { r, g, b };
}

/* ---------------- CORE ---------------- */

function srgbToLinear(c: number) {
   return c <= 0.04045
      ? c / 12.92
      : Math.pow((c + 0.055) / 1.055, 2.4);
}

function linearToSrgb(c: number) {
   return c <= 0.0031308
      ? 12.92 * c
      : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
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

function oklabToRgb(L: number, a: number, b: number) {
   const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
   const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
   const s_ = L - 0.0894841775 * a - 1.291485548 * b;

   const l = l_ * l_ * l_;
   const m = m_ * m_ * m_;
   const s = s_ * s_ * s_;

   let r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
   let g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
   let b_ = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

   r = linearToSrgb(r);
   g = linearToSrgb(g);
   b_ = linearToSrgb(b_);

   return {
      r: Math.min(1, Math.max(0, r)),
      g: Math.min(1, Math.max(0, g)),
      b: Math.min(1, Math.max(0, b_)),
   };
}

/* ---------------- OKLCH ---------------- */

function oklabToOklch(L: number, a: number, b: number): OKLCH {
   const c = Math.sqrt(a * a + b * b);
   let h = Math.atan2(b, a) * (180 / Math.PI);
   if (h < 0) h += 360;

   return { l: L, c, h };
}

function fromOKLCH({ l, c, h }: OKLCH): string {
   const hr = (h * Math.PI) / 180;
   const a = Math.cos(hr) * c;
   const b = Math.sin(hr) * c;

   const rgb = oklabToRgb(l, a, b);

   const to255 = (v: number) => Math.round(v * 255);

   return `#${[to255(rgb.r), to255(rgb.g), to255(rgb.b)]
      .map(v => v.toString(16).padStart(2, "0"))
      .join("")}`;
}

function toOKLCH(input: string): OKLCH {
   input = input.trim().toLowerCase();

   let rgb;

   if (input.startsWith("#")) {
      rgb = parseHex(input);
   } else if (input.startsWith("rgb")) {
      rgb = parseRgb(input);
   } else if (input.startsWith("hsl")) {
      rgb = parseHsl(input);
   } else {
      throw new Error("Unsupported color format");
   }

   const lab = rgbToOklab(rgb.r, rgb.g, rgb.b);
   return oklabToOklch(lab.L, lab.a, lab.b);
}

/* ---------------- UTILS ---------------- */

function clamp(v: number, min = 0, max = 1) {
   return Math.min(max, Math.max(min, v));
}

function rgbString(r: number, g: number, b: number, a = 1) {
   const to255 = (v: number) => Math.round(v * 255);
   return `rgba(${to255(r)}, ${to255(g)}, ${to255(b)}, ${a})`;
}

/* ---------------- CONTRAST ---------------- */

function getBestContrast(rgb: { r: number; g: number; b: number }) {
   const srgb = [rgb.r, rgb.g, rgb.b].map(v =>
      v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
   );

   const luminance =
      0.2126 * srgb[0] +
      0.7152 * srgb[1] +
      0.0722 * srgb[2];

   return luminance > 0.6 ? "#111827" : "#ffffff";
}

/* ---------------- ⭐ FIXED DIVIDER ---------------- */

function getDivider(base: OKLCH): OKLCH {
   return {
      // slightly above mid-lightness but not tied to brand hue
      l: clamp(base.l + 0.25),

      // 🔥 KEY FIX: almost no chroma → neutral gray
      c: base.c * 0.02,

      // hue preserved but irrelevant due to near-zero chroma
      h: base.h,
   };
}

/* ---------------- MAIN ---------------- */

export function createPalette(input: string): ColorRole {
   const base = toOKLCH(input);

   const light = {
      l: clamp(base.l + 0.15),
      c: base.c * 0.9,
      h: base.h,
   };

   const dark = {
      l: clamp(base.l - 0.18),
      c: base.c * 1.05,
      h: base.h,
   };

   const muted = {
      l: clamp(base.l + 0.08),
      c: base.c * 0.25,
      h: base.h,
   };

   const divider = getDivider(base);

   const hr = (base.h * Math.PI) / 180;
   const a = Math.cos(hr) * base.c;
   const b = Math.sin(hr) * base.c;

   const rgb = oklabToRgb(base.l, a, b);

   return {
      main: fromOKLCH(base),
      light: fromOKLCH(light),
      dark: fromOKLCH(dark),
      muted: fromOKLCH(muted),

      // ✅ FIXED divider (neutral, stable, non-tinted)
      divider: fromOKLCH(divider),

      contrast: getBestContrast(rgb),

      alpha: rgbString(
         rgb.r,
         rgb.g,
         rgb.b,
         base.l > 0.6 ? 0.08 : 0.18
      ),
   };
}