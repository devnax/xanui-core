"use client"
const getY = (el?: HTMLElement) => (el ? Math.min(el.getBoundingClientRect().height / 2, 40) : 20)
const getX = (el?: HTMLElement) => (el ? Math.min(el.getBoundingClientRect().width / 2, 40) : 20)

// ------------------ Variants ------------------

export const slideDown = (el: HTMLElement) => {
    const y = getY(el)
    return {
        from: { y: -y },
        to: { y: 0 },
        onUpdate: ({ y }: any) => (el.style.transform = `translateY(${y}px)`),
    }
}

export const slideUp = (el: HTMLElement) => {
    const y = getY(el)
    return {
        from: { y },
        to: { y: 0 },
        onUpdate: ({ y }: any) => (el.style.transform = `translateY(${y}px)`),
    }
}

export const slideRight = (el: HTMLElement) => {
    const x = getX(el)
    return {
        from: { x: -x },
        to: { x: 0 },
        onUpdate: ({ x }: any) => (el.style.transform = `translateX(${x}px)`),
    }
}

export const slideLeft = (el: HTMLElement) => {
    const x = getX(el)
    return {
        from: { x },
        to: { x: 0 },
        onUpdate: ({ x }: any) => (el.style.transform = `translateX(${x}px)`),
    }
}

export const fade = (el: HTMLElement) => ({
    from: { opacity: 0 },
    to: { opacity: 1 },
    onUpdate: ({ opacity }: any) => (el.style.opacity = opacity),
})

export const fadeDown = (el: HTMLElement) => {
    const y = getY(el)
    return {
        from: { y: -y, scale: 0.98, opacity: 0 },
        to: { y: 0, scale: 1, opacity: 1 },
        onUpdate: ({ y, scale, opacity }: any) => {
            el.style.transform = `translateY(${y}px) scale(${scale})`
            el.style.opacity = String(opacity)
        }
    }
}

export const fadeUp = (el: HTMLElement) => {
    const y = getY(el)
    return {
        from: { y, scale: 0.98, opacity: 0 },
        to: { y: 0, scale: 1, opacity: 1 },
        onUpdate: ({ y, scale, opacity }: any) => {
            el.style.transform = `translateY(${y}px) scale(${scale})`
            el.style.opacity = String(opacity)
        }
    }
}

export const fadeRight = (el: HTMLElement) => {
    const x = getX(el)
    return {
        from: { x: -x, scale: 0.98, opacity: 0 },
        to: { x: 0, scale: 1, opacity: 1 },
        onUpdate: ({ x, scale, opacity }: any) => {
            el.style.transform = `translateX(${x}px) scale(${scale})`
            el.style.opacity = String(opacity)
        }
    }
}

export const fadeLeft = (el: HTMLElement) => {
    const x = getX(el)
    return {
        from: { x, scale: 0.98, opacity: 0 },
        to: { x: 0, scale: 1, opacity: 1 },
        onUpdate: ({ x, scale, opacity }: any) => {
            el.style.transform = `translateX(${x}px) scale(${scale})`
            el.style.opacity = String(opacity)
        }
    }
}

export const zoom = (el: HTMLElement) => ({
    from: { scale: 0.8, opacity: 0 },
    to: { scale: 1, opacity: 1 },
    onUpdate: ({ scale, opacity }: any) => {
        el.style.transform = `scale(${scale})`
        el.style.opacity = String(opacity)
    },
})

export const zoomOver = (el: HTMLElement) => ({
    from: { scale: 1.2, opacity: 0 },
    to: { scale: 1, opacity: 1 },
    onUpdate: ({ scale, opacity }: any) => {
        el.style.transform = `scale(${scale})`
        el.style.opacity = String(opacity)
    },
})

export const grow = (el: HTMLElement) => ({
    from: { scaleX: 0.8, scaleY: 0.6, opacity: 0 },
    to: { scaleX: 1, scaleY: 1, opacity: 1 },
    onUpdate: ({ scaleX, scaleY, opacity }: any) => {
        el.style.transform = `scale(${scaleX}, ${scaleY})`
        el.style.opacity = String(opacity)
    }
})

export const collapseVertical = (el: HTMLElement) => {
    const height = el.getBoundingClientRect().height
    return {
        from: { maxHeight: 0 },
        to: { maxHeight: height },
        onUpdate: ({ maxHeight }: any) => {
            el.style.maxHeight = `${maxHeight}px`
        },
    }
}

export const collapseHorizontal = (el: HTMLElement) => {
    const width = el.getBoundingClientRect().width
    return {
        from: { width: 0 },
        to: { width },
        onUpdate: ({ width }: any) => {
            el.style.width = `${width}px`
        },
    }
}