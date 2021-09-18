import { useRef, useEffect } from 'react'

export function usePrevious<T>(value: T) {
    const ref = useRef<T>()
    useEffect(() => (
        return void (ref.current = value)
    ), [value])
    return ref.current
}
