"use client"
const getY = (rect: DOMRect) => (rect.height / 2, 40)
const getX = (rect: DOMRect) => (rect.width / 2, 40)

// ------------------ Variants ------------------

export const slideDown = (el: HTMLElement, rect: DOMRect) => {
    const y = getY(rect)
    return {
        from: { y: -y },
        to: { y: 0 },
        onUpdate: ({ y }: any) => (el.style.transform = `translateY(${y}px)`),
    }
}

export const slideUp = (el: HTMLElement, rect: DOMRect) => {
    const y = getY(rect)
    return {
        from: { y },
        to: { y: 0 },
        onUpdate: ({ y }: any) => (el.style.transform = `translateY(${y}px)`),
    }
}

export const slideRight = (el: HTMLElement, rect: DOMRect) => {
    const x = getX(rect)
    return {
        from: { x: -x },
        to: { x: 0 },
        onUpdate: ({ x }: any) => (el.style.transform = `translateX(${x}px)`),
    }
}

export const slideLeft = (el: HTMLElement, rect: DOMRect) => {
    const x = getX(rect)
    return {
        from: { x },
        to: { x: 0 },
        onUpdate: ({ x }: any) => (el.style.transform = `translateX(${x}px)`),
    }
}

export const fade = (el: HTMLElement, rect: DOMRect) => ({
    from: { opacity: 0 },
    to: { opacity: 1 },
    onUpdate: ({ opacity }: any) => (el.style.opacity = opacity),
})

export const fadeDown = (el: HTMLElement, rect: DOMRect) => {
    const y = getY(rect)
    return {
        from: { y: -y, scale: 0.98, opacity: 0 },
        to: { y: 0, scale: 1, opacity: 1 },
        onUpdate: ({ y, scale, opacity }: any) => {
            el.style.transform = `translateY(${y}px) scale(${scale})`
            el.style.opacity = String(opacity)
        }
    }
}

export const fadeUp = (el: HTMLElement, rect: DOMRect) => {
    const y = getY(rect)
    return {
        from: { y, scale: 0.98, opacity: 0 },
        to: { y: 0, scale: 1, opacity: 1 },
        onUpdate: ({ y, scale, opacity }: any) => {
            el.style.transform = `translateY(${y}px) scale(${scale})`
            el.style.opacity = String(opacity)
        }
    }
}

export const fadeRight = (el: HTMLElement, rect: DOMRect) => {
    const x = getX(rect)
    return {
        from: { x: -x, scale: 0.98, opacity: 0 },
        to: { x: 0, scale: 1, opacity: 1 },
        onUpdate: ({ x, scale, opacity }: any) => {
            el.style.transform = `translateX(${x}px) scale(${scale})`
            el.style.opacity = String(opacity)
        }
    }
}

export const fadeLeft = (el: HTMLElement, rect: DOMRect) => {
    const x = getX(rect)
    return {
        from: { x, scale: 0.98, opacity: 0 },
        to: { x: 0, scale: 1, opacity: 1 },
        onUpdate: ({ x, scale, opacity }: any) => {
            el.style.transform = `translateX(${x}px) scale(${scale})`
            el.style.opacity = String(opacity)
        }
    }
}

export const zoom = (el: HTMLElement, rect: DOMRect) => ({
    from: { scale: 0.8, opacity: 0 },
    to: { scale: 1, opacity: 1 },
    onUpdate: ({ scale, opacity }: any) => {
        el.style.transform = `scale(${scale})`
        el.style.opacity = String(opacity)
    },
})

export const zoomOver = (el: HTMLElement, rect: DOMRect) => ({
    from: { scale: 1.2, opacity: 0 },
    to: { scale: 1, opacity: 1 },
    onUpdate: ({ scale, opacity }: any) => {
        el.style.transform = `scale(${scale})`
        el.style.opacity = String(opacity)
    },
})

export const grow = (el: HTMLElement, rect: DOMRect) => ({
    from: { scaleX: 0.8, scaleY: 0.6, opacity: 0 },
    to: { scaleX: 1, scaleY: 1, opacity: 1 },
    onUpdate: ({ scaleX, scaleY, opacity }: any) => {
        el.style.transform = `scale(${scaleX}, ${scaleY})`
        el.style.opacity = String(opacity)
    }
})

export const collapseVertical = (el: HTMLElement, rect: DOMRect) => {
    const height = rect.height
    return {
        from: { maxHeight: 0 },
        to: { maxHeight: height },
        onUpdate: ({ maxHeight }: any) => {
            el.style.maxHeight = `${maxHeight}px`
        },
    }
}

export const collapseHorizontal = (el: HTMLElement, rect: DOMRect) => {
    const width = rect.width
    return {
        from: { width: 0 },
        to: { width },
        onUpdate: ({ width }: any) => {
            el.style.width = `${width}px`
        },
    }
}