import useSWR from 'swr'
import { mockViewsA, mockViewsB } from './mocks'
import { MockView } from './interfaces'

import { extent, zip } from 'd3-array'

const useZippedClicks = () => {
    let groupAData: MockView[] = mockViewsA.views
    let groupBData: MockView[] = mockViewsB.views

    let lBounds: [undefined, undefined] | [number, number] = extent(groupAData, (data) => parseInt(`${data.timestamp}`))
    let rBounds: [undefined, undefined] | [number, number] = extent(groupBData, (data) => parseInt(`${data.timestamp}`))

    let now: Date = new Date()
    let nowMinusOneYear = new Date(now.getFullYear() - 1, now.getMonth(), now.getUTCDate())

    let bounds = {
        start: lBounds[0] && lBounds[1] ? Math.min(...lBounds) : nowMinusOneYear,
        end: rBounds[0] && rBounds[1] ? Math.max(...rBounds) : now
    }

    let testData = zip(groupAData, groupBData)

    return {
        
    }

}