import useSWR from 'swr'
import { mockViewsA, mockViewsB } from './mocks'
import { MockView } from './interfaces'

import { extent, zip } from 'd3-array'

type Bounds = [undefined, undefined] | [number, number];

const useZippedClicks = () => {
    let groupAData: MockView[] = mockViewsA.views
    let groupBData: MockView[] = mockViewsB.views

    let lBounds: Bounds = extent(groupAData, (data) => parseInt(`${data.timestamp}`))
    let rBounds: Bounds = extent(groupBData, (data) => parseInt(`${data.timestamp}`))

    let now: Date = new Date()
    let nowMinusOneYear: Date = new Date(now.getFullYear() - 1, now.getMonth(), now.getUTCDate())

    let bounds = {
        start: lBounds[0] && lBounds[1] ? Math.min(...lBounds) : nowMinusOneYear,
        end: rBounds[0] && rBounds[1] ? Math.max(...rBounds) : now
    }

    return {
        
    }

}