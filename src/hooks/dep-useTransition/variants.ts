
export const slideDown = (rect: DOMRect) => {

    return {
        from: {
            transform: `translateY(-${rect.height}px)`,
        },
        to: {
            transform: `translateY(0)`,
        }
    }
}

export const slideUp = (rect: DOMRect) => {
    return {
        from: {
            transform: `translateY(${rect.height}px)`,
        },
        to: {
            transform: `translateY(0)`,
        }
    }
}

export const slideRight = (rect: DOMRect) => {
    return {
        from: {
            transform: `translateX(-${rect.width}px)`,
        },
        to: {
            transform: `translateX(0)`,
        }
    }
}

export const slideLeft = (rect: DOMRect) => {
    return {
        from: {
            transform: `translateX(${rect.width}px)`,
        },
        to: {
            transform: `translateX(0)`,
        }
    }
}

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

export const fadeDown = () => {
    return {
        from: {
            transform: `translateY(-30px)`,
            opacity: 0
        },
        to: {
            transform: `translateY(0)`,
            opacity: 1
        }
    }
}

export const fadeUp = () => {
    return {
        from: {
            transform: `translateY(30px)`,
            opacity: 0
        },
        to: {
            transform: `translateY(0)`,
            opacity: 1
        }
    }
}

export const fadeRight = () => {
    return {
        from: {
            transform: `translateX(-30px)`,
            opacity: 0
        },
        to: {
            transform: `translateX(0)`,
            opacity: 1
        }
    }
}

export const fadeLeft = () => {
    return {
        from: {
            transform: `translateX(30px)`,
            opacity: 0
        },
        to: {
            transform: `translateX(0)`,
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
            opacity: 0
        },
        to: {
            transform: "scale(1)",
            opacity: 1
        }
    }
}

export const zoomOver = () => {
    return {
        from: {
            transform: "scale(1.2)",
            opacity: 0
        },
        to: {
            transform: "scale(1)",
            opacity: 1
        }
    }
}

export const collapseVertical = (rect: DOMRect) => {

    return {
        from: {
            maxHeight: 0 + "px",
            overflow: "hidden"
        },
        to: {
            maxHeight: rect.height,
            overflow: "hidden"
        }
    }
}


export const collapseHorizontal = (rect: DOMRect) => {
    return {
        from: {
            width: 0 + "px",
            overflow: "hidden"
        },
        to: {
            width: rect?.width ? rect?.width + "px" : "auto",
            overflow: "hidden"
        }
    }
}




