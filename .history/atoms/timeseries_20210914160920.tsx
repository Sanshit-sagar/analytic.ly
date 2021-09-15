import {
    
}

import { 
    ZoomInIcon, 
    ZoomOutIcon, 
    ReloadIcon 
} from '@radix-ui/react-icons'
import { 
    LinearLineIcon, 
    NaturalLineIcon, 
    PiecewiseLineIcon, 
    MonotoneLineIcon 
} from '../icons'

const timeseriesZoomIndexAtom = atom(1)
const timeseriesZoomAtom = atom((get) => zoomOptions[get(timeseriesZoomIndexAtom)])

const zoomOptions = [
    { id: 0, value: 'magnify', textValue: 'zoom in', alt: undefined, icon: <ZoomInIcon /> },
    { id: 1, value: 'reduce', textValue: 'zoom out', alt: undefined, icon: <ZoomOutIcon /> },
    { id: 2, value: 'reset', textValue: 'reset', alt: undefined, icon: <ReloadIcon /> },
];

export const Zoom = () => {
    const [zoomIndex, setZoomIndex] = useAtom(timeseriesZoomIndexAtom)
    const zoomDisabled = false

    return (
        <ToggleGroup 
            type='single'
            value={`${zoomIndex}`}
            onValueChange={(value: string) => setZoomIndex(parseInt(value))}
            orientation={'horizontal'}
            dir={'ltr'}
            rovingFocus={true}
            loop={true}
            disabled={zoomDisabled}
            aria-label='zoom-selection-options'
        >
            {zoomOptions.map((zoomOption, index) => (
                <Tooltip content={zoomOption.value.toUpperCase()}>
                    <ToggleGroupButton
                        key={index}
                        value={`${zoomOption.id}`}
                    >
                        {zoomOption.icon}
                    </ToggleGroupButton>
                </Tooltip>
            ))}
        </ToggleGroup>
    )
}

const styleOptions = [
    { id: 0, value: 'linear', textValue: 'polyline', alt: undefined, icon: undefined, category: 'Curve Type' },
    { id: 1, value: 'natural', textValue: 'natural cubic spline', alt: undefined, icon: undefined, category: 'Curve Type' },
    { id: 2, value: 'monotone', textValue: 'cubic spline', alt: undefined, icon: undefined, category: 'Curve Type' },
    { id: 3, value: 'step', textValue: 'piecewise', alt: undefined, icon: undefined, category: 'Curve Type' },
];

const styleIndexAtom = atom(1)

