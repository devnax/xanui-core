import { UseTransitionElementProps } from "."

export const slideDown = (_arg: UseTransitionElementProps) => {
    return {
        from: {
            transform: `translateY(-${_arg.height}px)`,
        },
        to: {
            transform: `translateY(0)`,
        }
    }
}

export const slideUp = (_arg: UseTransitionElementProps) => {
    return {
        from: {
            transform: `translateY(${_arg.height}px)`,
        },
        to: {
            transform: `translateY(0)`,
        }
    }
}

export const slideRight = (_arg: UseTransitionElementProps) => {
    return {
        from: {
            transform: `translateX(-${_arg.width}px)`,
        },
        to: {
            transform: `translateX(0)`,
        }
    }
}

export const slideLeft = (_arg: UseTransitionElementProps) => {
    return {
        from: {
            transform: `translateX(${_arg.width}px)`,
        },
        to: {
            transform: `translateX(0)`,
        }
    }
}

export const fade = (_arg: UseTransitionElementProps) => {
    return {
        from: {
            opacity: 0
        },
        to: {
            opacity: 1
        }
    }
}

export const fadeDown = (_arg: UseTransitionElementProps) => {
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

export const fadeUp = (_arg: UseTransitionElementProps) => {
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

export const fadeRight = (_arg: UseTransitionElementProps) => {
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

export const fadeLeft = (_arg: UseTransitionElementProps) => {
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

export const grow = (_arg: UseTransitionElementProps) => {
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

export const zoom = (_arg: UseTransitionElementProps) => {
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

export const zoomOver = (_arg: UseTransitionElementProps) => {
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

export const collapsVerticle = (_arg: UseTransitionElementProps) => {
    return {
        from: {
            height: 0 + "px",
            overflow: "hidden"
        },
        to: {
            height: _arg?.height ? _arg?.height + "px" : "auto",
            overflow: "hidden"
        }
    }
}


export const collapsHorizental = (_arg: UseTransitionElementProps) => {
    return {
        from: {
            width: 0 + "px",
            overflow: "hidden"
        },
        to: {
            width: _arg?.width ? _arg?.width + "px" : "auto",
            overflow: "hidden"
        }
    }
}




