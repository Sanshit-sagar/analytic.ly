
import * as d3 from 'd3'
import { daysInMonth } from './dateUtils';

const formatMillisecond = d3.timeFormat(".%L");
const formatSecond = d3.timeFormat(":%S");
const formatMinute = d3.timeFormat("%I:%M");
const formatHourMinute = d3.timeFormat('%H:%I:%M');
const formateHourMinuteSecond = d3.timeFormat('%H:%M:%S');
const formatHour = d3.timeFormat("%d-%H%p");
const formatHourHash = d3.timeFormat("%j-%H%p");
const formatDay = d3.timeFormat("%a %d");
const formatDayHour = d3.timeFormat("%a %d %H %p");
const formatDayHourMinute = d3.timeFormat("%a %d %H:%M");
const formatWeek = d3.timeFormat("%b %d");
const formatWeekDayHourMinute = d3.timeFormat("%b %a %H:%M %d"); 
const formatMonth = d3.timeFormat("%B");
const formatYear = d3.timeFormat("%Y");

const MILLIS_PER_SEC = 1000;
const SECS_PER_MIN = 60; 
const MINS_PER_HOUR = 60;
const HOURS_PER_DAY = 24;
const DAYS_PER_WEEK = 7;

const MILLI_VALUES = {
    'sec': MILLIS_PER_SEC,
    'min': MILLIS_PER_SEC * SECS_PER_MIN,
    'hour': MILLIS_PER_SEC * SECS_PER_MIN * MINS_PER_HOUR,
    'day': MILLIS_PER_SEC * SECS_PER_MIN * MINS_PER_HOUR * HOURS_PER_DAY,
    'week': MILLIS_PER_SEC * SECS_PER_MIN * MINS_PER_HOUR * HOURS_PER_DAY * DAYS_PER_WEEK,
    'month': MILLIS_PER_SEC * SECS_PER_MIN * MINS_PER_HOUR * HOURS_PER_DAY * DAYS_PER_WEEK * daysInMonth(new Date().getMonth())
}

export function getTicksInRange(start: number, end: number, interval?: string, outputfmt?: string): number[] {
    if(!start || !end) return [];

    let output: number[] | undefined = [];
    let fmtresult: number | undefined = 0;
    let cti: d3.CountableTimeInterval | undefined = getCountableInterval(interval)
    
    if(cti !== undefined) {
        cti.every(1)?.range(new Date(start), new Date(end)).map((val: Date, _: number) => {
            fmtresult = cti?.count(new Date(start), new Date(val)) 
            if(fmtresult) output?.push(fmtresult);
        });
    } else {
        output = [];
    }
    return output || [];
}

export function getRangeBoundaries(amount: number, range: string, interval: string): number[] {
    let start: number = new Date().getTime();
    let end: number = start; 

    if(range==='hour') {
        start -= amount*MILLI_VALUES['hour'];
    } else if(range==='day') {
        start -= amount*MILLI_VALUES['day'];
    }if(range==='week') {
        start -= amount*MILLI_VALUES['week'];
    } else if(range==='month') {
        start -= amount*MILLI_VALUES['month'];
    }

    return [start, end]; 
}

export function getCountableInterval(interval: string | undefined): d3.CountableTimeInterval | undefined {
    if(!interval) return undefined;
    if(isSecondInterval(interval)) return d3.timeSecond;
    else if(isMinuteInterval(interval)) return d3.timeMinute;
    else if(isHourInterval(interval)) return d3.timeHour;
    else return undefined;
}

function isSecondInterval(interval: string): boolean {
    return interval.startsWith('sec');
}

function isMinuteInterval(interval: string): boolean {
    return interval.startsWith('min');
}
function isHourInterval(interval: string): boolean {
    return interval.startsWith('hour');
}

export function format(date: Date, fmt?: string) {
    if(!fmt) return formateHourMinuteSecond(date);

    if(fmt==='ms') {
        return formatMillisecond(date); 
    } else if(fmt==='sec') {
        return formatSecond(date);
    } else if(fmt==='min') {
        return formatMinute(date)
    } else if(fmt==='hourmin') {
        return formatHourMinute(date)
    } else if(fmt==='hourminsec') {
        return formateHourMinuteSecond(date);
    } else if(fmt==='hour') {
        return formatHour(date);
    } else if(fmt==='day') {
        return formatDay(date);
    } else if(fmt==='dayhour') {
        return formatDayHour(date);
    } else if(fmt==='dayhourmin') {
        return formatDayHourMinute(date);
    } else if(fmt==='week') {
        return formatWeek(date);
    } else if(fmt==='weekdayhourmin') {
        return formatWeekDayHourMinute(date); 
    }
}
