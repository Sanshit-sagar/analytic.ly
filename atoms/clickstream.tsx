import { atom } from 'jotai'

import { 
    ZoomInIcon, 
    ZoomOutIcon, 
    ReloadIcon 
} from '@radix-ui/react-icons'

export const styleOptions = [
    { id: 0, value: 'linear', textValue: 'polyline', alt: undefined, icon: undefined, category: 'Curve Type' },
    { id: 1, value: 'natural', textValue: 'natural cubic spline', alt: undefined, icon: undefined, category: 'Curve Type' },
    { id: 2, value: 'monotone', textValue: 'cubic spline', alt: undefined, icon: undefined, category: 'Curve Type' },
    { id: 3, value: 'step', textValue: 'piecewise', alt: undefined, icon: undefined, category: 'Curve Type' },
]

export const zoomOptions = [
    { id: '0', value: 'magnify', textValue: 'zoom in', alt: undefined, icon: <ZoomInIcon /> },
    { id: '1', value: 'reduce', textValue: 'zoom out', alt: undefined, icon: <ZoomOutIcon /> },
    { id: '2', value: 'reset', textValue: 'reset', alt: undefined, icon: <ReloadIcon /> },
]

export const styleIndexAtom = atom(1)
export const curveStyleAtom = atom(
    (get) => styleOptions[get(styleIndexAtom)].value
)
export const curveStyleTextValueAtom = atom(
    (get) => styleOptions[get(styleIndexAtom)].textValue
)

export const clickstreamZoomIndexAtom = atom(1)
export const clickstreamZoomTextValueAtom = atom(
    (get) => {
        let zoomIndex = parseInt(`${get(clickstreamZoomIndexAtom)}`)
        return `${zoomIndex}`
    }
)