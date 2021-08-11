import { DateTime } from 'luxon'

export function getLocaleTimestring(timestamp: string | number | null) {
    return timestamp ? new Date(timestamp).toLocaleTimeString() : '';
}

export function getLocaleDatestringFromDate(date: string | null) {
    return date ? new Date(date).toLocaleDateString() : ''
}

export function getDateString(timestamp: string | number | null) {
    return timestamp ? new Date(timestamp).toDateString() : ''
}

function getThisArg(dateTime: DateTime, index: number) {
    if(index===0) return 'year';
    else if(index===1) return dateTime.diffNow().shiftTo('month');
    else if(index===2) return dateTime.diffNow().shiftTo('week');
    else if(index===3) return dateTime.diffNow().shiftTo('day');
    else if(index===4) return dateTime.diffNow().shiftTo('hour');
    else if(index===5) return dateTime.diffNow().shiftTo('minute');
    return dateTime.diffNow().shiftTo('seconds'); 
}

export function humanReadable(timestamp: string | number | null) {
    if(!timestamp) {
        return '';
    }

    try {
        const units = [
            'year',
            'month',
            'week',
            'day',
            'hour',
            'minute',
            'second',
        ];

        let dateTime = DateTime.fromMillis(parseInt(`${timestamp}`))

        const diff = dateTime.diffNow().shiftTo('year', 'month', 'week', 'day', 'hour', 'minute', 'seconds');

        const unit = units.find((predicate: string, index: number) =>  diff.get(getThisArg(dateTime, index)) !== 0) || 'second';
        
        const relativeFormatter = new Intl.RelativeTimeFormat('en', {
            numeric: 'auto',
        });

        return relativeFormatter.format(Math.trunc(diff.as(unit)), unit);
    } catch(error) {
        return timestamp; 
    }   
};

export const isValidDate = (date: string) => {
    let isDateObject = Object.prototype.toString.call(date)==='[object Date]'
    let isFiniteAsInt = isFinite(parseInt(date))
    let isNotNull = date?.length

    return isNotNull ? isDateObject && isFiniteAsInt : false;
}
