// import { setTimeForDate } from './dateUtils'

interface HourInterval {
    start: number;
    end: number; 
}

interface TimeSeries {
    x: string;
    y: number;
    interval: HourInterval;
}

const SEC_IN_MILLIS = 1000;
const HOUR_IN_MILLIS = 60*60*1000; 

export function getHourlySeries(startTimestamp: number, endTimestamp: number): TimeSeries[]{
    // const startDate: Date = setTimeForDate(start, 0, 0, 0);
    // const startTimestamp = start.getTime();
    // const endTimestamp = end.getTime();
    const numIncrements = (endTimestamp - startTimestamp)/HOUR_IN_MILLIS

    const hourlySeries: TimeSeries[] = new Array(numIncrements).fill(null).map((_, i) => ({
        x: `${i + 1 < 10 ? `0${i + 1}` : i + 1}:00`,
        y: 1,
        interval: { 
            start: startTimestamp + i*HOUR_IN_MILLIS,
            end: startTimestamp + (i+1)*HOUR_IN_MILLIS - SEC_IN_MILLIS
        }
    }));
    
    return hourlySeries
}   
