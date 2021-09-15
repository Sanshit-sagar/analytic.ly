import useSWR from 'swr' 
import { atom } from 'jotai'
import { useAtomValue } from 'jotai/utils'
import {
    rangeIndexAtom,
    intervalIndexAtom,
} from '../pages/index'


export const rangeOptions = [
    { id: 0, value: 1000 * 60, textValue: '1 Minute', alt: undefined, icon: undefined },
    { id: 1, value: 1000 * 60 * 10, textValue: '10 Minutes', alt: undefined, icon: undefined },
    { id: 2, value: 1000 * 60 * 30, textValue: '30 Minutes', alt: undefined, icon: undefined },
    { id: 3, value: 1000 * 60 * 60, textValue: '1 Hour', alt: '60 Minutes', icon: undefined },
    { id: 4, value: 1000 * 60 * 60 * 6, textValue: '6 Hours', alt: '360 Minutes', icon: undefined },
    { id: 5, value: 1000 * 60 * 60 * 12, textValue: '12 Hours', alt: '720 Minutes', icon: undefined },
    { id: 6, value: 1000 * 60 * 60 * 24, textValue: '1 Day', alt: '1440 Minutes (24 hours)', icon: undefined },
    { id: 7, value: 1000 * 60 * 60 * 24 * 7, textValue: '1 Week', alt: '9960 Minutes (156 hours)', icon: undefined },
    { id: 8, value: 1000 * 60 * 60 * 24 * 7 * 30, textValue: '1 Month', alt: '30 days', icon: undefined },
    { id: 9, value: 1000 * 60 * 60 * 24 * 365, textValue: '1 Year', alt: '12 months (356 days)', icon: undefined }
];

export const intervalOptions = [
    { id: 0, value: 1000, textValue: 'second', alt: undefined, icon: undefined },
    { id: 1, value: 1000 * 60, textValue: 'minute',  alt: undefined, icon: undefined  },
    { id: 2, value: 1000 * 60 * 60, textValue: 'hour',  alt: undefined, icon: undefined  },
    { id: 3, value: 1000 * 60 * 60 * 24, textValue: 'day',  alt: undefined, icon: undefined  },
    { id: 4, value: 1000 * 60 * 60 * 24 * 7, textValue: 'week',  alt: undefined, icon: undefined  },
    { id: 5, value: 1000 * 60 * 60 * 60 * 7 * 30, textValue: 'month',  alt: undefined, icon: undefined  }
]

const METRICS_API = `/api/metrics/user/sanshit.sagar@gmail.com`

const rangeStrAtom = atom((get) => rangeOptions[get(rangeIndexAtom)].textValue)

const amountAtom = atom((get) => get(rangeStrAtom).split(' ')[0])
const rangeAtom = atom((get) => get(rangeStrAtom).split(' ')[1])
const intervalAtom = atom((get) => intervalOptions[get(intervalIndexAtom)].textValue)

const presetClickstreamEndpointAtom = atom(
    (get) => {
        let range = get(rangeAtom)
        let amount = get(amountAtom)
        let interval = get(intervalAtom) 

        return `${METRICS_API}/tail/${amount}/${range}/${interval}`
    }
)

export const usePresetClickstream = () => {
    const presetClickstreamEndpoint = useAtomValue(presetClickstreamEndpointAtom)
   
    const { data, error } = useSWR(presetClickstreamEndpoint);

    return {
        clicks: data?.mergedIntervals || {},
        details: data?.viewsByIntervals || null,
        bounds: data?.bounds || [],
        range: data?.range || '',
        interval: data?.interval || '',
        numPeriods: data?.numPeriods || 0,
        numClicks: data?.numClicks || 0, 
        minTimestamp: data?.minTimestamp, 
        maxTimestamp: data?.maxTimestamp,
        error,
        endpoint
    }
}
    // const { data, error } = useSWR(presetClickstreamEndpoint)

    // return {
        // clickstream: data ? data : error,
        // loading: !data && !error,
        // error
    // };
// }
