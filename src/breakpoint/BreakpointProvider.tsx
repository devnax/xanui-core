"use client";

import React, {
    ReactNode,
    useState,
    useCallback,
    useLayoutEffect,
} from "react";
import { breakpoints } from "../css";
import { BreakpointKeys } from "../css/types";
import { useDocument } from "../Document";

export const BreakpointCtx = React.createContext<BreakpointKeys>("xl");

/**
 * SSR-safe breakpoint detection
 */
const getKey = (doc: Document): BreakpointKeys => {
    if (typeof window === "undefined" || typeof document === "undefined") {
        return "xl";
    }

    const width = doc.documentElement.clientWidth || window.innerWidth;

    if (width < breakpoints.sm) return "xs";
    if (width < breakpoints.md) return "sm";
    if (width < breakpoints.lg) return "md";
    if (width < breakpoints.xl) return "lg";
    return "xl";
};

export const BreakpointProvider = ({ children }: { children?: ReactNode }) => {
    // hydrate-safe initial state
    const doc = useDocument()
    const [current, setCurrent] = useState<BreakpointKeys>(() => getKey(doc?.document));

    const handler = useCallback(() => {
        if (doc) {
            const next = getKey(doc.document)
            setCurrent(prev => (prev === next ? prev : next));
        }
    }, [doc]);

    // useLayoutEffect avoids visual flicker on first paint
    useLayoutEffect(() => {
        handler();
        window.addEventListener("resize", handler, { passive: true });
        return () => window.removeEventListener("resize", handler);
    }, [handler]);

    return (
        <BreakpointCtx.Provider value={current}>
            {children}
        </BreakpointCtx.Provider>
    );
};
