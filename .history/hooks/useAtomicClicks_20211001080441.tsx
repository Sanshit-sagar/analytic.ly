
import useSWR from 'swr' 
import { atom } from 'jotai'
import { useAtomValue } from 'jotai/utils'
import { rangeStrAtom, presetClickstreamEndpointAtom } from '../atoms/timeseries'


const mappedData: Datum[] = clicks.map((click: Datum, i: number) => {
      
    const timestamp = formatClickDate(click.x, start, interval).timestamp;
    const clickscore = click.y    
    const clickdate = new Date(timestamp)

    return { index: i, timestamp, clickscore, clickdate }
}) : [];

const graphDetails: GraphDetails =({ start, now, interval });  => {
    start: new Date(start),
    end: new Date(now),
    durationInMs: (now-start),
    numIntervals: (now-start)/parseInt(interval),
    tickSizeInMs: parseInt(interval),
}


export const usePresetClickstream = () => {
    const presetClickstreamEndpoint = useAtomValue(presetClickstreamEndpointAtom)
    const { data, error } = useSWR(presetClickstreamEndpoint)

    let mappedDataArray = mappedData

    return {
        clicks: data?.mergedIntervals || {},
        details: data?.viewsByIntervals || null,
        endpoint: presetClickstreamEndpoint,
        bounds: data?.bounds || [],
        range: data?.range || '',
        interval: data?.interval || '',
        numPeriods: data?.numPeriods || 0,
        numClicks: data?.numClicks || 0, 
        minTimestamp: data?.minTimestamp, 
        maxTimestamp: data?.maxTimestamp,
        loading: !data && !error,
        error
    }
}