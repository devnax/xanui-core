import { TransitionElementProps } from "."

export const slideDown = (_arg: TransitionElementProps) => {
    return {
        from: {
            transform: `translateY(-${_arg.height}px)!important`,
        },
        to: {
            transform: `translateY(0)!important`,
        }
    }
}

export const slideUp = (_arg: TransitionElementProps) => {
    return {
        from: {
            transform: `translateY(${_arg.height}px)!important`,
        },
        to: {
            transform: `translateY(0)!important`,
        }
    }
}

export const slideRight = (_arg: TransitionElementProps) => {
    return {
        from: {
            transform: `translateX(-${_arg.width}px)!important`,
        },
        to: {
            transform: `translateX(0)!important`,
        }
    }
}

export const slideLeft = (_arg: TransitionElementProps) => {
    return {
        from: {
            transform: `translateX(${_arg.width}px)!important`,
        },
        to: {
            transform: `translateX(0)!important`,
        }
    }
}

export const fade = (_arg: TransitionElementProps) => {
    return {
        from: {
            opacity: 0
        },
        to: {
            opacity: 1
        }
    }
}

export const fadeDown = (_arg: TransitionElementProps) => {
    return {
        from: {
            transform: `translateY(-30px)!important`,
            opacity: 0
        },
        to: {
            transform: `translateY(0)!important`,
            opacity: 1
        }
    }
}

export const fadeUp = (_arg: TransitionElementProps) => {
    return {
        from: {
            transform: `translateY(30px)!important`,
            opacity: 0
        },
        to: {
            transform: `translateY(0)!important`,
            opacity: 1
        }
    }
}

export const fadeRight = (_arg: TransitionElementProps) => {
    return {
        from: {
            transform: `translateX(-30px)!important`,
            opacity: 0
        },
        to: {
            transform: `translateX(0)!important`,
            opacity: 1
        }
    }
}

export const fadeLeft = (_arg: TransitionElementProps) => {
    return {
        from: {
            transform: `translateX(30px)!important`,
            opacity: 0
        },
        to: {
            transform: `translateX(0)!important`,
            opacity: 1
        }
    }
}

export const grow = (_arg: TransitionElementProps) => {
    return {
        from: {
            transform: "scale(.8, .6)!important",
            opacity: 0
        },
        to: {
            transform: "scale(1)!important",
            opacity: 1
        }
    }
}

export const zoom = (_arg: TransitionElementProps) => {
    return {
        from: {
            transform: "scale(.8)!important",
            opacity: 0
        },
        to: {
            transform: "scale(1)!important",
            opacity: 1
        }
    }
}

export const zoomOver = (_arg: TransitionElementProps) => {
    return {
        from: {
            transform: "scale(1.2)!important",
            opacity: 0
        },
        to: {
            transform: "scale(1)!important",
            opacity: 1
        }
    }
}

export const collapsVerticle = (_arg: TransitionElementProps) => {
    return {
        from: {
            height: 0 + "px!important",
            overflow: "hidden"
        },
        to: {
            height: _arg?.height ? _arg?.height + "px!important" : "auto",
            overflow: "hidden"
        }
    }
}


export const collapsHorizental = (_arg: TransitionElementProps) => {
    return {
        from: {
            width: 0 + "px!important",
            overflow: "hidden"
        },
        to: {
            width: _arg?.width ? _arg?.width + "px!important" : "auto",
            overflow: "hidden"
        }
    }
}




