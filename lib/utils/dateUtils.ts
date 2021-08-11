// import { DateTime } from 'luxon'

export function getLocaleTimestring(timestamp: string | number | null) {
    return timestamp ? new Date(timestamp).toLocaleTimeString() : '';
}

export function getLocaleDatestringFromDate(date: string | null) {
    return date ? new Date(date).toLocaleDateString() : ''
}

export function getDateString(timestamp: string | number | null) {
    return timestamp ? new Date(timestamp).toDateString() : ''
}

export const isValidDate = (date: string) => {
    let isDateObject = Object.prototype.toString.call(date)==='[object Date]'
    let isFiniteAsInt = isFinite(parseInt(date))
    let isNotNull = date?.length

    return isNotNull ? isDateObject && isFiniteAsInt : false;
}


// const regexp = /(second|minute|hour|day|week|month|year)s?/;

export function humanReadable(time: number | string | null) {
    return time;
};