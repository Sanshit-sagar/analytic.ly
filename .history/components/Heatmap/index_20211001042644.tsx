import React from 'react'

import { Group } from '@visx/group'
import { scaleLinear } from '@visx/scale'
import { HeatmapCircle, HeatmapRect } from '@visx/heatmap'

import genBins, { Bins, Bin } from '@visx/mock-data/lib/generators/genBins'
import { getSeededRandom } from '@visx/mock-data'

const hot1 = '#77312f'
const hot2 = '#f33d15'
const cool1 = '#122549'
const cool2 = '#b4fbde'
export const background = '#28272c'

const seededRandom = getSeededRandom(0.41)
const binData = genBins(16, 16, (idx: number) => 150 * idx, (i, number) => 25 * (number - i) * seededRandom())

function max<Datum>(data: Datum[], value: (d: Datum) => number): number {
    return Math.max(...data.map(value))
}
function min<Datum>(data: Datum[], value: (d: Datum) => number): number {
    return Math.min(...data.map(value))
}

const bins = (d: Bins) => d.bins
const count = (d: Bin) => d.count

const colorMax = max(binData, d => max(bins(d), count))
const bucketSizeMax = max(binData, d => bins(d).length)

const xScale = scaleLinear<number>({
    domain: [0, binData.length]
})
const yScale = scaleLinear<number>({
    domain: [0, bucketSizeMax]
})
const circleColorScale = scaleLinear<string>({
    range: [cool1, cool2],
    domain: [0, colorMax],
})
const rectColorScale = scaleLinear<string>({
    range: [hot1, hot2],
    domain: [0, colorMax]
})
const opacityScale = scaleLinear<number>({
    range: [0.1, 1],
    domain: [0, colorMax]
})

export type HeatmapProps = {
    width: number;
    height: number;
    margin?: {
        top: number;
        right: number; 
        bottom: number; 
        eft: number
    };
    separation?: number;
    events?: boolean;
}

const defaultMargin = { 
    top: 10,
    right: 20,
    bottom: 20,
}   left3