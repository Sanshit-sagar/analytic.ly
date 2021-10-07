import { atom,  WritableAtom } from 'jotai' 
import { Datum } from '../components/Timeseries/interfaces'
import { IItem as ToggleItem } from '../compositions/ToggleButtonsGroup'
import { ZoomInIcon, ZoomOutIcon, ReloadIcon } from '@radix-ui/react-icons'
import { formatClickDate as fmtDate } from '../lib/utils/d3time'

interface IItem {
    id: string; 
    value: string | number; 
    textValue: string;
    alt: string | undefined;
    icon: React.ReactNode | undefined; 
}

type TsDatum = { 
    x: number; 
    y: number; 
}

type RawData = TsDatum[]; 

type FetchedTimeseriesData = { 
    data: RawData;
    start: number;
    tick: string;
}

const currentDate = new Date()

const initData: Datum[] = [{
    index: 0,
    timestamp: currentDate.getTime(),
    clickscore: 0,
    clickfmttime: currentDate.toLocaleString(),
    clickdate: currentDate, 
}]

type Timeseries = Datum[]; 

export const zoomOptions: ToggleItem[] = [
    { id: '0', value: 'zoom in', textValue: 'Magnify',  alt: undefined, icon: <ZoomInIcon /> },
    { id: '1', value: 'zoom out', textValue: 'Reduce',  alt: undefined,  icon: <ZoomOutIcon /> },
    { id: '2', value: 'reset', textValue: 'Reset', alt: undefined, icon: <ReloadIcon /> },
]

export const rangeOptions: IItem[] = [
    { id: '0', value: 1000 * 60, textValue: '1 Minute', alt: undefined, icon: undefined },
    { id: '1', value: 1000 * 60 * 10, textValue: '10 Minutes', alt: undefined, icon: undefined },
    { id: '2', value: 1000 * 60 * 30, textValue: '30 Minutes', alt: undefined, icon: undefined },
    { id: '3', value: 1000 * 60 * 60, textValue: '1 Hour', alt: '60 Minutes', icon: undefined },
    { id: '4', value: 1000 * 60 * 60 * 6, textValue: '6 Hours', alt: '360 Minutes', icon: undefined },
    { id: '5', value: 1000 * 60 * 60 * 12, textValue: '12 Hours', alt: '720 Minutes', icon: undefined },
    { id: '6', value: 1000 * 60 * 60 * 24, textValue: '1 Day', alt: '1440 Minutes (24 hours)', icon: undefined },
    { id: '7', value: 1000 * 60 * 60 * 24 * 7, textValue: '1 Week', alt: '9960 Minutes (156 hours)', icon: undefined },
    { id: '8', value: 1000 * 60 * 60 * 24 * 7 * 30, textValue: '1 Month', alt: '30 days', icon: undefined },
    { id: '9', value: 1000 * 60 * 60 * 24 * 7 * 30, textValue: '3 Months', alt: '30 days', icon: undefined },
    { id: '10', value: 1000 * 60 * 60 * 24 * 365, textValue: '1 Year', alt: '12 months (365 days)', icon: undefined }
]

export const intervalOptions: IItem[] = [
    { id: '0', value: 1000, textValue: 'second', alt: undefined, icon: undefined },
    { id: '1', value: 1000 * 60, textValue: 'minute',  alt: undefined, icon: undefined  },
    { id: '2', value: 1000 * 60 * 60, textValue: 'hour',  alt: undefined, icon: undefined  },
    { id: '3', value: 1000 * 60 * 60 * 24, textValue: 'day',  alt: undefined, icon: undefined  },
    { id: '4', value: 1000 * 60 * 60 * 24 * 7, textValue: 'week',  alt: undefined, icon: undefined  },
    { id: '5', value: 1000 * 60 * 60 * 60 * 7 * 30, textValue: 'month',  alt: undefined, icon: undefined  }
]

export const statisticOptions: IItem[] = [
    { id: '0', value: 'norm', textValue: 'Timeseries', alt: undefined, icon: undefined },
    { id: '1', value: 'cummulative', textValue: 'Cummulative', alt: undefined, icon: undefined },
    { id: '2', value: 'movingAverage', textValue: 'Moving Avg', alt: undefined, icon: undefined },
]


function initTimeseriesFactory() {
    return [{
        index: 0, 
        timestamp: new Date(new Date().getFullYear(), 1, 1).getTime(),
        clickscore: 0,
        clickdate: new Date(new Date().getFullYear(), 1, 1)
    }]; 
}

const METRICS_API = `/api/metrics/user/sanshit.sagar@gmail.com`


export const rangeIndexAtom = atom(8)
export const intervalIndexAtom = atom(3)
export const statisticIndexAtom = atom(0)

export const boundsAtom = atom({
    x0: new Date().getTime(),
    y0: 0,
    x1: new Date().getTime(), 
    y1: 10
});

export const lastUpdatedAtAtom = atom(new Date().getTime())
export const rangeStrAtom = atom((get) => rangeOptions[get(rangeIndexAtom)].textValue)

export const amountAtom = atom((get) => get(rangeStrAtom).split(' ')[0])
export const rangeAtom = atom((get) => get(rangeStrAtom).split(' ')[1].toLowerCase())
export const intervalAtom = atom((get) => intervalOptions[get(intervalIndexAtom)].textValue)
export const statisticAtom = atom((get) => statisticOptions[get(statisticIndexAtom)].textValue)

export const globalFiltersStrAtom = atom<string>(
    (get) => `/${get(amountAtom)}/${get(rangeAtom)}/${get(intervalAtom)}`
); 

export const presetClickstreamEndpointAtom  = atom<string>(
    (get) => {
        let range = get(rangeAtom)
        let amount = get(amountAtom)
        let interval = get(intervalAtom) 

        return `${METRICS_API}/tail/${amount}/${range}/${interval}`
    }
)


export const filteredDataAtom = atom(initData)
export const cummulativeDataAtom = atom(initData) 
export const movingAvgDataAtom = atom(initData)

export const windowerAtom = atom((get) => (get(boundsAtom).x1 - get(boundsAtom).x0)*INIT_WINDOW_SCALE_FACTOR);
export const windowSizeAtom = atom(
    null,
    (get, set, update: number) => { 
        // update is between 1 and 100
        // where 1 => 1 window = 1/100 of a day [INCREASED AMPLITUDES AND more movement (smaller and smaller divisors leading to more noticeable changes)]
        // where 100 => 1 window = 1 day SAME as timeseries
        // and 1000 => 1 window = 
        let prev = get(filteredDataAtom)
        
        let runningTotal = 0
        let start = 0
 
        set(windowSizeAtom, (get(boundsAtom).x1-get(boundsAtom).x0)*update/100)
        set(movingAvgDataAtom, get(filteredDataAtom).map((datum: Datum, i: number) => {
            runningTotal += datum.clickscore

            if(i > get(windowSizeAtom)) {
                runningTotal -= get(filteredDataAtom)[i-get(windowSizeAtom)].clickscore
                start++;
            }

            return {
                index: i,
                timestamp:datum.timestamp,
                clickscore: runningTotal,
                clickdate: datum.clickdate,
            }
        })); 
    } 
);
            

export const recalcDataAtom = atom(
    null,
    (get, set, update: Datum[]) => {

        if(!update?.length) return;
    
        set(filteredDataAtom, update.map((updatedValue) => ({ 
            ...updatedValue 
        })));

        let cummulation: number = 0; 
        set(cummulativeDataAtom, get(filteredDataAtom).map((datum: Datum) => {
            cummulation += datum.clickscore

            return {
                ...datum,
                clickscore: cummulation
            }
        }));

        set(boundsAtom, {
            x0: update?.length && update[0] && update[0]?.clickdate ? new Date(update[0].clickdate).getTime() : new Date(2021,1,1).getTime(),
            y0: update?.length && update[0]?.clickscore ? update[0].clickscore : 5,
            x1: update?.length && update[1] && update[1]?.clickdate ? new Date(update[1]?.clickdate).getTime() : new Date().getTime(),
            y1: update?.length && update[1]?.clickscore ? update[1].clickscore : 10,
        }); 

        let runningTotal: number = 0
        let start: number = 0
        set(movingAvgDataAtom, get(filteredDataAtom).map((datum: Datum, index: number) => {
            runningTotal += datum.clickscore

            if(index - start > get(windowSizeAtom)) {
                runningTotal -= get(filteredDataAtom)[start].clickscore
                start++
            }

            return {
                ...datum,
                clickscore: runningTotal
            }
        }))

    }
);

export const activeFilteredDataAtom = atom(
    (get) => {
        let selectedStat = get(statisticAtom).toLowerCase()

        return      selectedStat.startsWith('timeseries')   ?   get(filteredDataAtom) 
                :   selectedStat.startsWith('cummulative')  ?   get(cummulativeDataAtom) 
                :   get(movingAvgDataAtom);
    }
);


export const timeseriesAtom: WritableAtom<Timeseries, Timeseries> = atom(initTimeseriesFactory()); 

export const updateTimeseriesAtom = atom(
    null,
    (_get, set, update: FetchedTimeseriesData) => {
       
        set(timeseriesAtom,  update.data.map((datum: TsDatum, index: number) => {
            return { 
                index, 
                timestamp: fmtDate(datum.x, update.start, update.tick).timestamp,
                clickscore: datum.y, 
                clickdate: new Date(fmtDate(datum.x, update.start, update.tick).timestamp) 
            }
        }))
    }
)

// function accumulate(data: Click[]) {
//     let runningTotal = 0
//     let cummClicks: Click[] = []
//     let windowSize = data.length / 5

//     data.map((click: Click, i: number) => {
//         runningTotal += click.y
//         if(i >= windowSize) {
//             runningTotal -= cummClicks[i - windowSize].y
//         }
//         cummClicks.push({
//             x: click.x,
//             y: runningTotal/windowSize,
//         })
//     })

//     return cummClicks
// }

// export const movingAverageAtom = atom(
//     (get) => {
//         let windowSum = 0;
//         return get(timeseriesAtom).map((item: { x: number; y: number; }) => {

//         })
//     }
// )


////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

export const styleOptions: IItem[] = [
    { id: '0', value: 'linear', textValue: 'polyline', alt: undefined, icon: undefined, }, // category: 'Curve Type' },
    { id: '1', value: 'natural', textValue: 'natural cubic spline', alt: undefined, icon: undefined },
    { id: '2', value: 'monotone', textValue: 'cubic spline', alt: undefined, icon: undefined },
    { id: '3', value: 'step', textValue: 'piecewise', alt: undefined, icon: undefined },
]

export const styleIndexAtom = atom(1)
export const curveStyleAtom = atom(
    (get) => styleOptions[get(styleIndexAtom)].value
)
export const curveStyleTextValueAtom = atom(
    (get) => styleOptions[get(styleIndexAtom)].textValue
)

export const clickstreamZoomIndexAtom = atom(1)
export const clickstreamZoomTextValueAtom = atom(
    (get) => {
        let zoomIndex = parseInt(`${get(clickstreamZoomIndexAtom)}`)
        return `${zoomIndex}`
    }
)

