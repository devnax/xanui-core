"use client";

import React, { ReactNode, useState, useCallback, useLayoutEffect } from "react";
import { breakpoints } from "../css";
import { BreakpointKeys } from "../css/types";
import { useDocument } from "../Document";

type BreakpointCtxType = {
    key: BreakpointKeys;
    width: number;
};

export const BreakpointCtx = React.createContext<BreakpointCtxType>({
    key: "xl",
    width: 1920,
});

/**
 * SSR-safe breakpoint detection
 */
const getKey = (width: number): BreakpointKeys => {
    if (width < breakpoints.sm) return "xs";
    if (width < breakpoints.md) return "sm";
    if (width < breakpoints.lg) return "md";
    if (width < breakpoints.xl) return "lg";
    return "xl";
};

export const BreakpointProvider = ({ children }: { children?: ReactNode }) => {
    const doc = useDocument();

    const getWidth = () => {
        if (!doc) return 1920; // SSR fallback
        return doc.document.documentElement.clientWidth || window.innerWidth;
    };

    const [state, setState] = useState<BreakpointCtxType>(() => {
        const width = getWidth();
        return { width, key: getKey(width) };
    });

    const handler = useCallback(() => {
        const width = getWidth();
        const key = getKey(width);

        setState(prev => (prev.key === key ? prev : { key, width }));
    }, [doc]);

    useLayoutEffect(() => {
        handler(); // set correct initial value
        window.addEventListener("resize", handler, { passive: true });
        return () => window.removeEventListener("resize", handler);
    }, [handler]);

    return <BreakpointCtx.Provider value={state}>{children}</BreakpointCtx.Provider>;
};