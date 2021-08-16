import { setTimeForDate, daysInMonth  } from './dateUtils'


interface HourInterval {
    start: number;
    end: number; 
}

export interface TimePeriod {
    x: string;
    y: number;
    hour: number;
    date: number;
    month: number;
    interval: HourInterval;
}

export interface TimeSeries {
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
const MINUTE_IN_MILLIS = 60*SEC_IN_MILLIS; 
const HOUR_IN_MILLIS = 60*MINUTE_IN_MILLIS; 

// TODO : loop through and add any remaining clicks that occoured after the end of the hour
// eg: /recent/10/hours called at 10:03PM, currently gets clicks b/w 12PM and 10PM. 
// 10:00PM to 10:03PM is missing
export function getHourlySeries(startTimestamp: number, endTimestamp: number): TimeSeries{
    const duration: number = endTimestamp - startTimestamp
    const numPeriods: number = duration/HOUR_IN_MILLIS

    const start = new Date(startTimestamp);
    const startHour = start.getHours(); 
    const startDate = start.getDate();
    const startMonth = start.getMonth();

    const flooredStart = setTimeForDate(new Date(startTimestamp), startHour, 0, 0).getTime(); 

    const timeseries: TimePeriod[] = new Array(numPeriods).fill(null).map((_, i) => ({
        x: `${((startHour + i + 1)%24) < 10 ? `0${((startHour + i + 1)%24)}` : ((startHour + i + 1)%24)}:00`,
        y: 0,
        interval: { 
            start: flooredStart + i*HOUR_IN_MILLIS,
            end: flooredStart + (i+1)*HOUR_IN_MILLIS - SEC_IN_MILLIS
        },
        hour: (startHour + i + 1)%24,
        date: Math.floor(startDate + ((startHour + i + 1)/24)), 
        month: Math.floor(startMonth + (startDate + ((startHour + i + 1)/24)) % daysInMonth(startMonth + (startDate + ((startHour + i + 1)/24))))
    })); 

    return { timeseries, duration, numPeriods, start: new Date(startTimestamp).getTime() }
}   

export function getMinutelySeries(startTimestamp: number, endTimestamp: number): any[] {
    const duration: number = endTimestamp - startTimestamp
    const numMinutes: number = duration/MINUTE_IN_MILLIS

    const start = new Date(startTimestamp);
    const startMinute = start.getMinutes();
    const startHour = start.getHours(); 
    const startDate = start.getDate();
    const startMonth = start.getMonth();

    let timeseries: any[] = [];

    let i; 
    for(i = startTimestamp; i <= endTimestamp; i+= 60*1000) {
        timeseries.push({ 
            x: startTimestamp, 
            y: 0,
            minute: (startMinute + i + 1) % 60,
            hour: Math.floor((startHour + (startMinute + i + 1)/60)) % 24,
            date: Math.floor((startDate + (startHour + i + 1)/60)/24) % (daysInMonth(new Date(i).getMonth())),
        }); 
    }

    return timeseries; 

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
