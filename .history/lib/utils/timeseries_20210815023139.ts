// import { setTimeForDate } from './dateUtils'

interface HourInterval {
    start: number;
    end: number; 
}

interface TimePeriod {
    x: string;
    y: number;
    interval: HourInterval;
}

interface TimeSeries {
    timeseries: TimePeriod[];
    duration: number;
    numPeriods: number;
    start: number
}

const SEC_IN_MILLIS = 1000;
const HOUR_IN_MILLIS = 60*60*1000; 

// TODO : loop through and add any remaining clicks that occoured after the end of the hour
// eg: /recent/10/hours called at 10:03PM, currently gets clicks b/w 12PM and 10PM. 
// 10:00PM to 10:03PM is missing
export function getHourlySeries(startTimestamp: number, endTimestamp: number): TimeSeries{
    const duration: number = endTimestamp - startTimestamp
    const numPeriods: number = duration/HOUR_IN_MILLIS
    const startHour = new Date(startTimestamp).getHours(); 

    const timeseries: TimePeriod[] = new Array(numPeriods).fill(null).map((_, i) => ({
        x: `${((startHour + i + 1)%24) < 10 ? `0${((startHour + i + 1)%24)}` : ((startHour + i + 1)%24)}:00`,
        y: 1,
        interval: { 
            start: startTimestamp + i*HOUR_IN_MILLIS,
            end: startTimestamp + (i+1)*HOUR_IN_MILLIS - SEC_IN_MILLIS
        }
    }));

    return { timeseries, duration, numPeriods, start: startHour%24 }
}   

export function aggregateClicksForTimeseries(timeseries: TimeSeries, clickstream: any): TimeSeries[] {
    let aggregatedClicksForPeriod: Map<Number, any> = new Map();
    let incrementPerPeriod = duration/numPeriods;

    clickstream.map((click: any, index: number) => {
        let nearestHour: number = roundToPeriodStart(click.timestamp, incrementPerPeriod); 

    })

    return timeseries;
}
