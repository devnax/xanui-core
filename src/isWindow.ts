
const isWindow = (): Window | void => typeof window !== 'undefined' ? window : undefined
export default isWindow