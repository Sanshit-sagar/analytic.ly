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

export function timeDifference(timestamp: string | number | null) {
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

        let dateTime = DateTime.fromMillis(timestamp)

        const diff = dateTime.diffNow().shiftTo(...units);
        const unit = units.find((unit) => diff.get(unit) !== 0) || 'second';
        const relativeFormatter = new Intl.RelativeTimeFormat('en', {
            numeric: 'auto',
        });

        return relativeFormatter.format(Math.trunc(diff.as(unit)), unit);
    } catch(error) {
        return timestamp; 
    }   
};

export const isValidDate = (date: string) => {
    return (date?.length) ? Object.prototype.toString.call(date)==='[object Date]' && isFinite(parseInt(date)) : false;
}
