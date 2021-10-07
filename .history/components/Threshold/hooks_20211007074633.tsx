import useSWR from 'swr'
import { mockViewsA, mockViewsB } from './mocks'
import { MockView } from './interfaces'

import { extent, zip } from 'd3-array'

const useZippedClicks = () => {
    let groupAData: MockView[] = mockViewsA.views
    let groupBData: MockView[] = mockViewsB.views

    let [aMin, aMax] = extent(groupAData, (data) => parseInt(`${data.timestamp}`))
    let rangeE = extent(groupBData, (data) => parseInt(`${data.timestamp}`))

    let bounds = {
        start: Math.min(aMin, bMin),
        end: Math.max(aMax, bMax)
    }

    let testData = zip(groupAData, groupBData)

    return {
        
    }

}