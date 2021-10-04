import { scaleLinear, scaleOrdinal } from '@visx/scale'

const NUM_LAYERS = 20
const SAMPLES_PER_LAYER = 25
const BUMPS_PER_LAYER = 10
const BACKGROUND = '#000'

const range = (n: number) => Array.from(new Array(n), (_, i) => i)
const keys = range(NUM_LAYERS)

// scales
const xScale = scaleLinear<number>({
  domain: [0, SAMPLES_PER_LAYER - 1],
})

const yScale = scaleLinear<number>({
  domain: [-30, 50],
})

const zScale = scaleOrdinal({
    domain: keys,
    range: ['#ff777f', '#580040', '#9cfaff', '#bc5399', '#c84653']
})
const patternScale = scaleOrdinal({
domain: keys,
range: ['mustard', 'cherry', 'navy', 'transparent', 'transparent', 'transparent', 'transparent']
})

const colorScale = scaleOrdinal<number, string>({
  domain: keys,
  range: ['#ffc409', '#f14702', '#262d97', 'white', '#036ecd', '#9ecadd', '#51666e'],
})

const patternScale = scaleOrdinal<number, string>({
  domain: keys,
  range: ['mustard', 'cherry', 'navy', 'circles', 'circles', 'circles', 'circles'],
})
