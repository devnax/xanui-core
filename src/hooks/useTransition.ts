"use client"
import { useRef, useState, useCallback, useLayoutEffect } from "react"
import animate, { AnimateOptions } from "../animate"

export type UseTransitionStatus =
   | "entering"
   | "entered"
   | "exiting"
   | "exited"

export type UseTransitionProps<T extends Record<string, number>> = AnimateOptions<T> & {
   initialStatus?: "entered" | "exited"
   onEnter?: () => void
   onEntered?: () => void
   onExit?: () => void
   onExited?: () => void
}

const useTransition = <T extends Record<string, number>>(props: UseTransitionProps<T>) => {
   const {
      initialStatus = "exited",
      onEnter,
      onEntered,
      onExit,
      onExited,
      ...options
   } = props

   const resolve = (val: T | (() => T)): T =>
      typeof val === "function" ? (val as () => T)() : val

   const [open, setOpen] = useState(initialStatus === "entered")
   const [status, setStatus] = useState<UseTransitionStatus>(initialStatus)

   const stateRef = useRef<T | null>(null)
   const readyRef = useRef(false)

   const animating = useRef<null | (() => void)>(null)

   useLayoutEffect(() => {
      const from = resolve(options.from)
      const to = resolve(options.to)
      stateRef.current = initialStatus === "entered" ? to : from
      readyRef.current = true
   }, [])

   const run = useCallback(
      (nextOpen: boolean, withAnimation = true) => {
         if (!readyRef.current || !stateRef.current) return

         animating.current?.()

         const resolvedFrom = resolve(options.from)
         const resolvedTo = resolve(options.to)
         const from = stateRef.current
         const to = nextOpen ? resolvedTo : resolvedFrom

         if (nextOpen) {
            setStatus("entering")
            onEnter?.()
         } else {
            setStatus("exiting")
            onExit?.()
         }

         if (!withAnimation) {
            stateRef.current = to
            options.onUpdate?.(to, 1)

            if (nextOpen) {
               setStatus("entered")
               onEntered?.()
            } else {
               setStatus("exited")
               onExited?.()
            }

            options.onDone?.()
            return
         }

         animating.current = animate({
            ...options,
            from,
            to,
            duration: options.duration ?? 400,
            onUpdate: (value: T, progress: number) => {
               stateRef.current = value
               options.onUpdate?.(value, progress)
            },
            onDone: () => {
               if (nextOpen) {
                  setStatus("entered")
                  onEntered?.()
               } else {
                  setStatus("exited")
                  onExited?.()
               }
               options.onDone?.()
            },
         })
      },
      [options, onEnter, onEntered, onExit, onExited]
   )

   const enter = useCallback((withAnimation = true) => {
      setOpen(true)
      run(true, withAnimation)
   }, [run])

   const exit = useCallback((withAnimation = true) => {
      setOpen(false)
      run(false, withAnimation)
   }, [run])

   const toggle = useCallback((withAnimation = true) => {
      setOpen((prev) => {
         const next = !prev
         run(next, withAnimation)
         return next
      })
   }, [run])

   return {
      isEntered: open,
      status,
      state: stateRef,
      enter,
      exit,
      toggle,
      isReady: readyRef.current
   }
}

export default useTransition