"use client"
const cubicBezier = (p1x: number, p1y: number, p2x: number, p2y: number) => {
   return (t: number) => {
      const cx = 3 * p1x;
      const bx = 3 * (p2x - p1x) - cx;
      const ax = 1 - cx - bx;

      const cy = 3 * p1y;
      const by = 3 * (p2y - p1y) - cy;
      const ay = 1 - cy - by;

      const sampleCurveX = (t: number) => ((ax * t + bx) * t + cx) * t;
      const sampleCurveY = (t: number) => ((ay * t + by) * t + cy) * t;
      const sampleCurveDerivativeX = (t: number) =>
         (3 * ax * t + 2 * bx) * t + cx;

      // Newton-Raphson
      let x = t;
      for (let i = 0; i < 5; i++) {
         const dx = sampleCurveX(x) - t;
         const d = sampleCurveDerivativeX(x);
         if (Math.abs(dx) < 1e-6) break;
         if (Math.abs(d) < 1e-6) break;
         x = x - dx / d;
      }

      return sampleCurveY(x);
   };
};

const Easing = {
   default: (t: number) => 1 - Math.pow(1 - t, 3),
   // your cubic-bezier mappings
   standard: cubicBezier(0.4, 0, 0.2, 1),
   fast: cubicBezier(0.2, 0, 0, 1),
   smooth: cubicBezier(0.25, 0.46, 0.45, 0.94),
   linear: cubicBezier(0, 0, 1, 1),
   bounceBezier: cubicBezier(0.34, 1.5, 0.64, 1),

   // existing easings
   cubicInOut: (t: number) =>
      t < 0.5
         ? 4 * t * t * t
         : 1 - Math.pow(-2 * t + 2, 3) / 2,

   easeOutBounce: (t: number) => {
      const n1 = 7.5625;
      const d1 = 2.75;
      if (t < 1 / d1) return n1 * t * t;
      else if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
      else if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
      else return n1 * (t -= 2.625 / d1) * t + 0.984375;
   },

   spring: (t: number) => {
      return 1 - Math.exp(-6 * t) * Math.cos(8 * t);
   },
};

export default Easing