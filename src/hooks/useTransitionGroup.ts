"use client"
import { useRef, useState, useCallback } from "react"
import animate from "../animate"
import { UseTransitionStatus } from "./useTransition"

export type UseTransitionGroupItem<T extends Record<string, number>> = {
   key: string | number
   from: T
   to: T
}

export type UseTransitionGroupProps<T extends Record<string, number>> = {
   items: UseTransitionGroupItem<T>[]
   duration?: number
   stagger?: number // delay between items in ms
   mountOnEnter?: boolean
   unmountOnExit?: boolean
   onUpdate?: (value: T, key: string | number, progress: number) => void
   onEnter?: (key: string | number) => void
   onEntered?: (key: string | number) => void
   onExit?: (key: string | number) => void
   onExited?: (key: string | number) => void
}

/**
 * useTransitionGroup - staggered animations for multiple items
 */
function useTransitionGroup<T extends Record<string, number>>(
   options: UseTransitionGroupProps<T>
) {
   // status of each item
   const [statuses, setStatuses] = useState<
      Record<string | number, UseTransitionStatus>
   >(
      () =>
         Object.fromEntries(
            options.items.map((item) => [
               item.key,
               options.mountOnEnter ? "exited" : "entered",
            ])
         )
   )

   // refs to cancel per-item animations
   const animatingRefs = useRef<Record<string | number, (() => void) | null>>({})

   // track mounted items (for mount/unmount)
   const [mounted, setMounted] = useState<Record<string | number, boolean>>(
      () =>
         Object.fromEntries(
            options.items.map((item) => [
               item.key,
               !options.mountOnEnter,
            ])
         )
   )

   // animate a single item
   const animateItem = useCallback(
      (item: UseTransitionGroupItem<T>, entering: boolean, delay = 0) => {
         // cancel previous
         animatingRefs.current[item.key]?.()

         if (entering) setStatuses((s: any) => ({ ...s, [item.key]: "entering" }))
         else setStatuses((s: any) => ({ ...s, [item.key]: "exiting" }))

         if (entering && options.mountOnEnter) {
            setMounted((m) => ({ ...m, [item.key]: true }))
         }

         // start animation after delay
         const timeout = setTimeout(() => {
            if (entering) options.onEnter?.(item.key)
            else options.onExit?.(item.key)

            animatingRefs.current[item.key] = animate({
               from: entering ? item.from : item.to,
               to: entering ? item.to : item.from,
               duration: options.duration ?? 400,
               onUpdate: (value, progress) =>
                  options.onUpdate?.(value, item.key, progress),
               onDone: () => {
                  if (entering) {
                     setStatuses((s: any) => ({ ...s, [item.key]: "entered" }))
                     options.onEntered?.(item.key)
                  } else {
                     setStatuses((s: any) => ({ ...s, [item.key]: "exited" }))
                     options.onExited?.(item.key)
                     if (options.unmountOnExit) {
                        setMounted((m) => ({ ...m, [item.key]: false }))
                     }
                  }
               },
            })
         }, delay)

         return () => clearTimeout(timeout)
      },
      [options]
   )

   // run staggered animation on array of items
   const run = useCallback(
      (entering: boolean) => {
         options.items.forEach((item, index) => {
            const delay = (options.stagger ?? 100) * index
            const status = statuses[item.key]

            // skip if already animating in same direction
            if (entering && (status === "entering" || status === "entered")) return
            if (!entering && (status === "exiting" || status === "exited")) return

            animateItem(item, entering, delay)
         })
      },
      [options.items, options.stagger, animateItem, statuses]
   )

   const enter = useCallback(() => run(true), [run])
   const exit = useCallback(() => run(false), [run])
   const toggle = useCallback(() => {
      const anyEntered = Object.values(statuses).some(
         (s) => s === "entering" || s === "entered"
      )
      run(!anyEntered)
   }, [run, statuses])

   return {
      statuses,
      mounted,
      enter,
      exit,
      toggle,
   }
}

export default useTransitionGroup