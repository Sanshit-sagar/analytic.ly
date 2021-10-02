
import useSWR from 'swr' 
import { atom } from 'jotai'
import { useAtomValue } from 'jotai/utils'
import { rangeStrAtom, presetClickstreamEndpointAtom } from '../atoms/timeseries'


const mappedData: Datum[] = clicks?.length ? clicks?.map((click: IClick, i: number) => {
      
    const timestamp: TimeStamp = formatClickDate(click.x, start, interval).timestamp;
    const clickscore: ClickScore = click.y
    
    const clickdat = new Date(timestamp)
    const clickfmttime = fmtTimestampObj.fmtTimestamp;
    return { index: i, timestamp, clickscore, clickfmttime, clickdate }
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