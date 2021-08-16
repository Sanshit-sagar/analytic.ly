import { setTimeForDate } from './dateUtils'

// interface HourInterval {
//     start: number;
//     end: number; 
// }

interface TimePeriod {
    x: string;
    y: number;
    hour: number;
    date: number; 
    // interval: HourInterval;
}

interface TimeSeries {
    timeseries: TimePeriod[];
    duration: number;
    numPeriods: number;
    start: number
}

// interface IPeriodStats {
//     periodStart: number,
//     progressInPeriod: number;
// }

const SEC_IN_MILLIS = 1000;
const HOUR_IN_MILLIS = 60*60*1000; 

// TODO : loop through and add any remaining clicks that occoured after the end of the hour
// eg: /recent/10/hours called at 10:03PM, currently gets clicks b/w 12PM and 10PM. 
// 10:00PM to 10:03PM is missing
export function getHourlySeries(startTimestamp: number, endTimestamp: number): TimeSeries{
    const duration: number = endTimestamp - startTimestamp
    const numPeriods: number = duration/HOUR_IN_MILLIS
    const startHour = new Date(startTimestamp).getHours(); 
    const startDate = new Date(startTimestamp).getUTCDate();
    // const flooredStart = setTimeForDate(new Date(startTimestamp), startHour, 0, 0).getTime(); 

    const timeseries: TimePeriod[] = new Array(numPeriods).fill(null).map((_, i) => ({
        x: `${((startHour + i + 1)%24) < 10 ? `0${((startHour + i + 1)%24)}` : ((startHour + i + 1)%24)}:00`,
        y: 0,
        // interval: { 
        //     start: flooredStart + i*HOUR_IN_MILLIS,
        //     end: flooredStart + (i+1)*HOUR_IN_MILLIS - SEC_IN_MILLIS
        // },
        hour: ((startHour + i + 1)%24),
        date: Math.floor(startDate + ((startHour + i + 1)/24))
    }));

    return { timeseries, duration, numPeriods, start: new Date(startTimestamp).getTime() }
}   

// export function aggregateClicksForTimeseries(timeseries: TimeSeries, clickstream: any):  Map<number, Map<number, number>> {
//     let freqs = new Map<number, Map<number, number>>(); 

//     clickstream.map((click: any, i: number) => {
//         let dateObj = new Date(parseInt(click.timestamp));
//         let hour = dateObj.getHours(); 
//         let date = dateObj.getUTCDate(); 
//         if(!freqs.get(date)) {
//             freqs.set(date, new Map<number, number>());
//         }
//         if(!freqs.get(date)?.get(hour)) {
//             freqs.get(date)?.set(hour, 0);
//         }
//         let currFreq = freqs.get(date)?.get(hour) || 0
//         freqs.get(date)?.set(hour, currFreq + 1);  
//     });

//     return freqs
// }

// function getPeriodStats(currentTs: number, increment: number, startTs: number): IPeriodStats {
//     let numPreviousPeriods: number = (currentTs - startTs)/increment
//     let progressInPeriod: number = (currentTs - startTs)%increment
//     let flooredStart: Date = setTimeForDate(new Date(startTs + (increment * numPreviousPeriods)), 0, 0, 0); 
//     return {
//         periodStart: flooredStart.getTime(),
//         progressInPeriod: progressInPeriod,
//     }
// }

// export interface IAggregatedClicks {
//     aggregatedTimeseries: TimeSeries;
//     phsArr: any[];
// }

// export function aggregateClicksForTimeseries(timeseries: TimeSeries, clickstream: any): IAggregatedClicks {
//     let aggregatedClicks: Map<Number, Number> = new Map();
//     let incrementPerPeriod = timeseries.duration/timeseries.numPeriods;

//     let phsArr: any[] = [];

//     clickstream.map((click: any, _: number) => {
//         let periodStats: IPeriodStats = getPeriodStats(click.timestamp, incrementPerPeriod, timeseries.start);
//         let nearestreviousHour: number = periodStats.periodStart;
//         phsArr.push(nearestreviousHour);
        
//         let currentCount: Number | 0 | undefined = aggregatedClicks.has(nearestreviousHour) ? aggregatedClicks.get(nearestreviousHour)  : 0; 
//         let updatedCount: number = (currentCount===undefined) ? 1 : parseInt(`${currentCount}`) + 1; 
//         aggregatedClicks.set(nearestreviousHour, updatedCount); 
//     })

//     timeseries.timeseries.map((period, _) => {
//         let periodStart: number = period.interval.start;
//         let periodClickCount: Number | undefined = aggregatedClicks.has(periodStart) ? aggregatedClicks.get(periodStart) : 0; 
//         let pcc = periodClickCount===undefined ? 0 : parseInt(`${periodClickCount}`);
//         period.y = pcc; 
//     })  

//     return { aggregatedTimeseries: timeseries, phsArr }
// }
