import useSWR from 'swr'
import { mockViewsA, mockViewsB } from './mocks'
import { MockView } from './interfaces'

import { min, max, extent, zip } from 'd3-array'

type Bounds = [undefined, undefined] | [number, number];

function isNullable(bounds: number[]) {
    return bounds?.length && bounds[0] && bounds[1] 
}

export const useZippedClicks = () => {
    let groupAData: MockView[] = mockViewsA.views
    let groupBData: MockView[] = mockViewsB.views

    let lBounds: Bounds = extent(groupAData, (data) => parseInt(`${data.timestamp}`))
    let rBounds: Bounds = extent(groupBData, (data) => parseInt(`${data.timestamp}`))

    let now: Date = new Date()
    let nowMinusOneYear: Date = new Date(now.getFullYear() - 1, now.getMonth(), now.getUTCDate())

    return {
        bounds: { 
            lBounds, 
            rBounds, 
            now, 
            nowMinusOneYear 
        },
    }
}

export const useSlugsWithViews = () => {
    let endpoint = `/api/users/sanshit.sagar@gmail.com/rankings/frequencies`
    const { data, error } = useSWR(endpoint)

    return {
        data: data? data?.frequency : undefined,
        loading: !data && !error,
        error
    }
}

export const useResponseTimes = () => {
    let endpoint = `/api/`
}

export const dateRangeGenerator = function* (start: Date, end: Date, step: number = 1) {
    let d = start;
    while (d < end) {
        yield new Date(d);
        d.setDate(d.getDate() + step);
    }
};

export const epochRangeGenerator = function* (start: number, end: number, step: number = 1) {
    let i = start;
    while (i < end) {
        yield i;
        i += step;
    }
};

