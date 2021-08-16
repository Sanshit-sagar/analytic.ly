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

interface IPeriodStats {
    periodStart: number,
    progressInPeriod: number;
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

function getPeriodStats(currentTs: number, increment: number, startTs: number): IPeriodStats {
    let numPreviousPeriods: number = (currentTs - startTs)/increment
    let progressInPeriod: number = (currentTs - startTs)%increment
    return {
        periodStart: startTs + (increment * numPreviousPeriods),
        progressInPeriod: progressInPeriod,
    }
}

export function aggregateClicksForTimeseries(timeseries: TimeSeries, clickstream: any): TimeSeries {
    let aggregatedClicks: Map<Number, Number> = new Map();
    let incrementPerPeriod = timeseries.duration/timeseries.numPeriods;

    clickstream.map((click: any, _: number) => {
        let periodStats: IPeriodStats = getPeriodStats(click.timestamp, incrementPerPeriod, timeseries.start);
        let nearestreviousHour: number = periodStats.periodStart;
        let currentCount: Number | 0 | undefined = aggregatedClicks.has(nearestreviousHour) ? aggregatedClicks.get(nearestreviousHour)  : 0; 
        let updatedCount: number = (currentCount===undefined) ? 1 : parseInt(`${currentCount}`) + 1; 
        aggregatedClicks.set(nearestreviousHour, updatedCount); 
    })

    timeseries.timeseries.map((period, _) => {
        let periodStart: number = period.interval.start;
        let periodClickCount: Number | undefined = aggregatedClicks.has(periodStart) ? aggregatedClicks.get(periodStart) : 0; 
        let pcc = periodClickCount===undefined ? 0 : parseInt(`${periodClickCount}`);
        period.y = pcc; 
    })  

    return timeseries;
}
