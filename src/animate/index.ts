"use client";
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

   const triggered: Partial<Record<keyof T, Set<number>>> = {};
   const lastValues: Partial<Record<keyof T, number>> = {};

   const resolve = (val: T | (() => T)): T =>
      typeof val === "function" ? (val as () => T)() : val;

   const getEased = (key: keyof T, t: number) => {
      let e: number;
      if (typeof easing === "function") e = easing(t);
      else if (easing[key]) e = easing[key]!(t);
      else e = t;
      return Math.max(0, Math.min(1, e)); // clamp
   };

   const startAnimation = () => {
      const fromVal = resolve(from);
      const toVal = resolve(to);

      const keys = Object.keys(fromVal) as (keyof T)[];

      if (breakpoints) {
         for (const key of keys) {
            triggered[key] = new Set();
            lastValues[key] = forward ? fromVal[key] : toVal[key];
         }
      }

      // first frame exact start
      onUpdate({ ...fromVal }, 0);

      const start = performance.now();

      const frame = (now: number) => {
         const elapsed = now - start;
         const progress = duration === 0 ? 1 : Math.min(elapsed / duration, 1);

         const current = {} as T;

         for (const key of keys) {
            const f = forward ? fromVal[key] : toVal[key];
            const t = forward ? toVal[key] : fromVal[key];

            const eased = getEased(key, progress);
            const val = f + (t - f) * eased;

            (current as any)[key] = val;

            // ✅ breakpoints: only trigger if inside from..to
            const bps = breakpoints?.[key];
            if (bps) {
               const last = lastValues[key]!;
               for (let i = 0; i < bps.length; i++) {
                  if (triggered[key]!.has(i)) continue;

                  const bp = bps[i].value;

                  // skip if breakpoint outside from..to
                  if (!((f < t && bp >= f && bp <= t) || (f > t && bp <= f && bp >= t))) continue;

                  // trigger only if crossed this frame
                  if ((f < t && last < bp && val >= bp) || (f > t && last > bp && val <= bp)) {
                     triggered[key]!.add(i);
                     bps[i].callback();
                  }
               }

               lastValues[key] = val;
            }
         }

         if (progress < 1) {
            onUpdate(current, progress);
            rafId = requestAnimationFrame(frame);
         } else {
            const finalState = forward ? toVal : fromVal;
            onUpdate({ ...finalState }, 1);

            cycle++;
            if (cycle <= repeat) {
               if (repeatBack) forward = !forward;
               startAnimation();
            } else {
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