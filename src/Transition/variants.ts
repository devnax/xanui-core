
export const slideDown = (rect: DOMRect) => {

    return {
        from: {
            transform: `translateY(-${rect.height}px)!important`,
        },
        to: {
            transform: `translateY(0)!important`,
        }
    }
}

export const slideUp = (_arg: DOMRect) => {
    return {
        from: {
            transform: `translateY(${_arg.height}px)!important`,
        },
        to: {
            transform: `translateY(0)!important`,
        }
    }
}

export const slideRight = (_arg: DOMRect) => {
    return {
        from: {
            transform: `translateX(-${_arg.width}px)!important`,
        },
        to: {
            transform: `translateX(0)!important`,
        }
    }
}

export const slideLeft = (_arg: DOMRect) => {
    return {
        from: {
            transform: `translateX(${_arg.width}px)!important`,
        },
        to: {
            transform: `translateX(0)!important`,
        }
    }
}

export const fade = (_arg: DOMRect) => {
    return {
        from: {
            opacity: 0
        },
        to: {
            opacity: 1
        }
    }
}

export const fadeDown = (_arg: DOMRect) => {
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

export const fadeUp = (_arg: DOMRect) => {
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

export const fadeRight = (_arg: DOMRect) => {
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

export const fadeLeft = (_arg: DOMRect) => {
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

export const grow = (_arg: DOMRect) => {
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

export const zoom = (_arg: DOMRect) => {
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

export const zoomOver = (_arg: DOMRect) => {
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

export const collapsVerticle = (rect: DOMRect) => {

    return {
        from: {
            maxHeight: 0 + "px!important",
            overflow: "hidden"
        },
        to: {
            maxHeight: rect.height,
            overflow: "hidden"
        }
    }
}


export const collapsHorizental = (_arg: DOMRect) => {
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




