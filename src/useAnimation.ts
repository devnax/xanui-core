import { css } from './css'
import { useId } from 'react'
import { CSSProps } from './css/types'

export const animationEases = {
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
    linear: "cubic-bezier(0, 0, 1, 1)",
    easeBounceOut: "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
}

export interface UseAnimationProps {
    delay?: number;
    duration?: number;
    from: CSSProps;
    to: CSSProps;
    ease?: keyof typeof animationEases;
}

const useAnimation = ({ from, to, delay, ease, duration }: UseAnimationProps) => {
    let _delay = delay || 0;
    let _duration = duration || 600;
    let _ease = ease || "easeBounceOut"
    const id = "anim" + useId().replace(/:/g, "")
    const anim = css({
        animationName: id,
        animationDelay: _delay + "ms",
        animationDuration: _duration + "ms",
        animationTimingFunction: animationEases[_ease] || animationEases.easeBounceOut,
        [`@keyframes ${id}`]: {
            from: from as any,
            to: to as any
        }
    })
    return anim.classname
}

export default useAnimation