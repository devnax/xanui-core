"use client"
import Easing from "./easing";

export { Easing };

export type AnimateOptions<T extends Record<string, number>> = {
   from: T | (() => T);
   to: T | (() => T);
   duration?: number;
   delay?: number;
   easing?: ((t: number) => number) | Partial<Record<keyof T, (t: number) => number>>;
   onUpdate: (value: T, progress: number) => void;
   onDone?: (value: T) => void;
   breakpoints?: Partial<Record<keyof T, Array<{ value: number; callback: () => void }>>>;
   repeat?: number;
   repeatBack?: boolean;
};

const animate = <T extends Record<string, number>>({
   from,
   to,
   duration = 400,
   delay = 0,
   easing = Easing.default,
   onUpdate,
   onDone,
   breakpoints,
   repeat = 0,
   repeatBack = false,
}: AnimateOptions<T>) => {
   let rafId: number;
   let cycle = 0;
   let forward = true;

   // Track triggered breakpoints
   const triggered: Partial<Record<keyof T, Set<number>>> = {};

   const resolve = (val: T | (() => T)): T =>
      typeof val === "function" ? (val as () => T)() : val;

   const getEased = (key: keyof T, t: number) => {
      if (typeof easing === "function") return easing(t);
      if (easing[key]) return easing[key]!(t);
      return t;
   };

   const startAnimation = () => {
      const fromVal = resolve(from);
      const toVal = resolve(to);

      const keys = Object.keys(fromVal) as (keyof T)[];

      if (breakpoints) {
         for (const key of keys) triggered[key] = new Set();
      }

      const start = performance.now();

      const frame = (now: number) => {
         const progress =
            duration === 0 ? 1 : Math.min((now - start) / duration, 1);

         const current: any = {} as T;

         for (const key of keys) {
            const f = forward ? fromVal[key] : toVal[key];
            const t = forward ? toVal[key] : fromVal[key];

            const eased = getEased(key, progress);
            const val = f + (t - f) * eased;
            current[key] = val;

            // breakpoints
            const bps = breakpoints?.[key];
            if (bps) {
               for (let i = 0; i < bps.length; i++) {
                  const triggeredSet = triggered[key]!;
                  if (
                     !triggeredSet.has(i) &&
                     ((f < t && val >= bps[i].value) ||
                        (f > t && val <= bps[i].value))
                  ) {
                     triggeredSet.add(i);
                     bps[i].callback();
                  }
               }
            }
         }

         onUpdate(current, progress);

         if (progress < 1) {
            rafId = requestAnimationFrame(frame);
         } else {
            const finalState = forward ? toVal : fromVal;
            onUpdate(finalState, 1);

            // fire remaining breakpoints
            if (breakpoints) {
               for (const key of keys) {
                  const bps = breakpoints[key];
                  if (!bps) continue;

                  const triggeredSet = triggered[key]!;
                  for (let i = 0; i < bps.length; i++) {
                     if (!triggeredSet.has(i)) {
                        triggeredSet.add(i);
                        bps[i].callback();
                     }
                  }
               }
            }

            cycle++;

            if (cycle <= repeat) {
               if (repeatBack) forward = !forward;
               startAnimation(); // 🔁 re-run with fresh from/to if functions
            } else {
               const finalState = forward ? toVal : fromVal;
               onDone?.(finalState);
            }
         }
      };

      rafId = requestAnimationFrame(frame);
   };

   if (delay > 0) {
      const timeout = setTimeout(startAnimation, delay);
      return () => {
         clearTimeout(timeout);
         cancelAnimationFrame(rafId);
      };
   } else {
      startAnimation();
      return () => cancelAnimationFrame(rafId);
   }
};

export default animate;