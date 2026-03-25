
const getY = (rect?: DOMRect) =>
    rect ? Math.min(rect.height / 2, 40) : 20

const getX = (rect?: DOMRect) =>
    rect ? Math.min(rect.width / 2, 40) : 20



export const slideDown = (rect?: DOMRect) => {
    const y = getY(rect)

    return {
        from: {
            transform: `translateY(-${y}px)`,
        },
        to: {
            transform: `translateY(0)`,
        }
    }
}

export const slideUp = (rect?: DOMRect) => {
    const y = getY(rect)

    return {
        from: {
            transform: `translateY(${y}px)`,
        },
        to: {
            transform: `translateY(0)`,
        }
    }
}

export const slideRight = (rect?: DOMRect) => {
    const x = getX(rect)

    return {
        from: {
            transform: `translateX(-${x}px)`,
        },
        to: {
            transform: `translateX(0)`,
        }
    }
}

export const slideLeft = (rect?: DOMRect) => {
    const x = getX(rect)

    return {
        from: {
            transform: `translateX(${x}px)`,
        },
        to: {
            transform: `translateX(0)`,
        }
    }
}

export const scaleYDown = () => ({
    from: {
        transform: "scaleY(0.8)",
        opacity: 0,
        transformOrigin: "top"
    },
    to: {
        transform: "scaleY(1)",
        opacity: 1,
        transformOrigin: "top"
    }
})

export const scaleYUp = () => ({
    from: {
        transform: "scaleY(0.8)",
        transformOrigin: "bottom",
        opacity: 0
    },
    to: {
        transform: "scaleY(1)",
        transformOrigin: "bottom",
        opacity: 1
    }
})

export const fade = () => {
    return {
        from: {
            opacity: 0
        },
        to: {
            opacity: 1
        }
    }
}


export const fadeDown = (rect?: DOMRect) => {
    const y = getY(rect)

    return {
        from: {
            transform: `translateY(-${y}px) scale(0.98)`,
            opacity: 0
        },
        to: {
            transform: `translateY(0) scale(1)`,
            opacity: 1
        }
    }
}

export const fadeUp = (rect?: DOMRect) => {
    const y = getY(rect)

    return {
        from: {
            transform: `translateY(${y}px) scale(0.98)`,
            opacity: 0
        },
        to: {
            transform: `translateY(0) scale(1)`,
            opacity: 1
        }
    }
}

export const fadeRight = (rect?: DOMRect) => {
    const x = getX(rect)

    return {
        from: {
            transform: `translateX(-${x}px) scale(0.98)`,
            opacity: 0
        },
        to: {
            transform: `translateX(0) scale(1)`,
            opacity: 1
        }
    }
}

export const fadeLeft = (rect?: DOMRect) => {
    const x = getX(rect)

    return {
        from: {
            transform: `translateX(${x}px) scale(0.98)`,
            opacity: 0
        },
        to: {
            transform: `translateX(0) scale(1)`,
            opacity: 1
        }
    }
}

export const grow = () => {
    return {
        from: {
            transform: "scale(.8, .6)",
            opacity: 0
        },
        to: {
            transform: "scale(1)",
            opacity: 1
        }
    }
}

export const zoom = () => {
    return {
        from: {
            transform: "scale(.8)",
            transformOrigin: "center",
            opacity: 0
        },
        to: {
            transform: "scale(1)",
            transformOrigin: "center",
            opacity: 1
        }
    }
}

export const zoomOver = () => {
    return {
        from: {
            transform: "scale(1.2)",
            transformOrigin: "center",
            opacity: 0
        },
        to: {
            transform: "scale(1)",
            transformOrigin: "center",
            opacity: 1
        }
    }
}

export const collapseVertical = (rect: DOMRect) => {
    return {
        from: {
            maxHeight: "0px",
            overflow: "hidden"
        },
        to: {
            maxHeight: rect.height + "px",
            overflow: "hidden"
        }
    }
}


export const collapseHorizontal = (rect: DOMRect) => {
    return {
        from: {
            width: "0px",
            overflow: "hidden"
        },
        to: {
            width: rect.width + "px",
            overflow: "hidden"
        }
    }
}




