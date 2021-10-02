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

export function getLocaleFormat(timestamp: string | number | null): string {
    return timestamp ? new Date(timestamp).toLocaleString() : ''; 
}

export function doesExist(field: string | string[]): boolean {
    return field?.length > 1 ? true : false; 
}

export function isValidRange(startDate: number, endDate: number) {
    const dtNow = new Date().getTime(); 
    // TODO: validate against earliest date in DB which should be stored /cached
    if(startDate<endDate && endDate<dtNow && isValidDate(`${startDate}`) && isValidDate(`${endDate}`)) {
        return true;
    }
    return false; 
}

export function daysInMonth(month: number): number {
    return month===2 ? 28 : month%2===1 ? month<=7 ? 31 : 30 : month>=8 ? 31 : 30; 
}

export function getDateFromArray(dateArr: string[]): Date | null {
    let mm = parseInt(dateArr[0])-1;
    let dd = parseInt(dateArr[1])+1;
    let yyyy = parseInt(`20${dateArr[2]}`);

    if(mm >= 0 && mm <= 12 && dd >= 1 && dd <= daysInMonth(mm) && yyyy>=2021 && yyyy<=2022) {
        let dateObj = new Date()
        dateObj.setUTCFullYear(yyyy, mm, dd); 
        return dateObj;
    } else {
        return null;
    }
}

export function setTimeForDate(dateObj: Date, hour: number, minute: number, second: number): Date {
    const date = new Date(dateObj); 
    date.setHours(hour);
    date.setMinutes(minute);
    date.setSeconds(second);
    date.setMilliseconds(0); 
    return date;
}


const MILLIS_IN_A_DAY = 1000 * 60 * 60 * 24;

export function humanReadable(d: Date): string {
    let agoTimestamp = new Date(d).getTime()
    let nowTimestamp = new Date().getTime() 

    const rnd = (n: number) => Math.round(n)

    let diff = rnd((nowTimestamp - agoTimestamp) / MILLIS_IN_A_DAY)
    return diff<=1 ? `${rnd(diff * 24)} hrs ago` 
            : diff <= 7 ? `${rnd(diff)} days ago`
            : diff <= 30 ? `${rnd(diff / 7)} wks ago`
            : diff <= 356 ? `${rnd(diff / 30)} mnths ago`
            : `${rnd(diff / 365)} yrs ago`
}

