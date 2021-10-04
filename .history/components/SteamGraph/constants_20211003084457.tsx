import { scaleOrdinal } from '@visx/scale'
import { useGloballyConsistentColors } from '../../hooks/useColors'

export const NUM_LAYERS = 20
export const SAMPLES_PER_LAYER = 25
export const BUMPS_PER_LAYER = 10

export const BACKGROUND = () => {
    const colors = useGloballyConsistentColors();
    return colors.loContrast
}

const range = (n: number) => Array.from(new Array(n), (_, i) => i)
const keys = range(NUM_LAYERS)


export const colorScale = scaleOrdinal({
    domain: keys,
    range: ['#55412', '#fff', '#66789', '#bc5399', '#c84653']
})
export const patternScale = scaleOrdinal({
    domain: keys,
    range: ['mustard', 'cherry', 'navy', 'transparent', 'transparent', 'transparent', 'transparent']
})