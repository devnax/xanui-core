"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { breakpoints } from "../css";
import { BreakpointKeys } from "../css/types";

export const BreakpointCtx = React.createContext<BreakpointKeys>("xl");

const queries: Record<BreakpointKeys, string> = {
    xs: `(max-width:${breakpoints.sm - 0.02}px)`,
    sm: `(min-width:${breakpoints.sm}px) and (max-width:${breakpoints.md - 0.02}px)`,
    md: `(min-width:${breakpoints.md}px) and (max-width:${breakpoints.lg - 0.02}px)`,
    lg: `(min-width:${breakpoints.lg}px) and (max-width:${breakpoints.xl - 0.02}px)`,
    xl: `(min-width:${breakpoints.xl}px)`
};

const getCurrent = (): BreakpointKeys => {
    if (typeof window === "undefined") return "xs";
    const entries = Object.entries(queries) as [BreakpointKeys, string][];
    for (const [key, query] of entries) {
        if (window.matchMedia(query).matches) {
            return key;
        }
    }
    return "xs";
};

export const BreakpointProvider = ({ children }: { children?: ReactNode }) => {
    const [current, setCurrent] = useState<BreakpointKeys>(() => getCurrent());

    useEffect(() => {
        if (typeof window === "undefined") return;
        const mqls = Object.entries(queries).map(([key, query]) => {
            const mql = window.matchMedia(query);

            const handler = () => {
                if (mql.matches) {
                    setCurrent(key as BreakpointKeys);
                }
            };

            mql.addEventListener("change", handler);

            return () => mql.removeEventListener("change", handler);
        });

        return () => {
            mqls.forEach(fn => fn());
        };
    }, []);

    return (
        <BreakpointCtx.Provider value={current}>
            {children}
        </BreakpointCtx.Provider>
    );
};