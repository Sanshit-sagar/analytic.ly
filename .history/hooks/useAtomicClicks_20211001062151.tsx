
import useSWR from 'swr' 
import { useAtomValue } from 'jotai/utils'
import { rangeStrAtom, presetClickstreamEndpointAtom } from '../atoms/timeseries'



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

const movingAverageAtom = atom((get) => get(rangeStrAtom))