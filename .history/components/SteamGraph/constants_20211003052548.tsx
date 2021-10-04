import { scaleOrdinal } from '@visx/scale'

const NUM_LAYERS = 20


const range = (n: number) => Array.from(new Array(n), (_, i) => i)
const keys = range(NUM_LAYERS)


export const colorScale = scaleOrdinal({
    domain: keys,
    range: ['#ff777f', '#580040', '#9cfaff', '#bc5399', '#c84653']
})
export const patternScale = scaleOrdinal({
    domain: keys,
    range: ['mustard', 'cherry', 'navy', 'transparent', 'transparent', 'transparent', 'transparent']
})