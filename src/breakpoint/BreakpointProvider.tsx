"use client";
import React, { ReactNode, useState, useCallback } from "react";
import { breakpoints } from "../css";
import { BreakpointKeys } from "../css/types";

export const BreakpointCtx = React.createContext<BreakpointKeys>("xs");

/**
 * SSR-safe breakpoint detection
 */
const getKey = (): BreakpointKeys => {
    if (typeof window === 'undefined') {
        return "xl";
    }

    const width = window.innerWidth;

    if (width < breakpoints.sm) return "xs";
    if (width < breakpoints.md) return "sm";
    if (width < breakpoints.lg) return "md";
    if (width < breakpoints.xl) return "lg";
    return "xl";
};

export const BreakpointProvider = ({ children }: { children?: ReactNode }) => {
    const [current, setCurrent] = useState<BreakpointKeys>("xl");

    const handler = useCallback(() => {
        const newKey = getKey();
        setCurrent(prev => (prev === newKey ? prev : newKey));
    }, []);

    React.useEffect(() => {
        window.addEventListener("resize", handler);
        handler(); // detect on mount
        return () => window.removeEventListener("resize", handler);
    }, [handler]);

    return (
        <BreakpointCtx.Provider value={current}>
            {children}
        </BreakpointCtx.Provider>
    );
};
