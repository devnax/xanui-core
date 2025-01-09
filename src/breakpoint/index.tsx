import React, { ReactNode, useState } from "react";
import isWindow from "../isWindow";
import { breakpoints } from "../css";
import { BreakpointKeys } from "../css/types";

export const BreakpointCtx = React.createContext<BreakpointKeys>("xl")

const getKey = (): BreakpointKeys => {
    const isWin = isWindow()
    if (isWin) {
        const width = window.innerWidth
        if (width < breakpoints.sm) {
            return 'xs'
        } else if (width > breakpoints.xs && width < breakpoints.md) {
            return 'sm'
        } else if (width > breakpoints.sm && width < breakpoints.lg) {
            return 'md'
        } else if (width > breakpoints.md && width < breakpoints.xl) {
            return 'lg'
        } else {
            return 'xl'
        }
    } else {
        return 'xl'
    }
}

export const BreakpointProvider = ({ children }: { children?: ReactNode }) => {
    const [current, setCurrent] = useState<BreakpointKeys>(getKey)

    const handler = () => {
        let c = getKey()
        if (current !== c) {
            setCurrent(c)
        }
    }

    React.useEffect(() => {
        window.removeEventListener("resize", handler)
        window.addEventListener("resize", handler)
        handler()
        return () => {
            window.removeEventListener("resize", handler)
        }
    }, [current])

    return (
        <BreakpointCtx.Provider value={current}>
            {children}
        </BreakpointCtx.Provider>
    )
}
