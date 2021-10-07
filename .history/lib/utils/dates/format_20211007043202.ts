

export const formatDuration = (ms: number) => {
    if (ms < 0) ms = -ms;
    const time = {
        day: Math.floor(ms / 86400000),
        hour: Math.floor(ms / 3600000) % 24,
        minute: Math.floor(ms / 60000) % 60,
        second: Math.floor(ms / 1000) % 60,
        millisecond: Math.floor(ms) % 1000
    };

    return Object.entries(time)
        .filter(val => val[1] !== 0)
        .map(([key, val]) => `${val} ${key}${val !== 1 ? 's' : ''}`)
        .join(', ')
};

export const formatSeconds = (s: number) => {
    const [hour, minute, second, sign] = (s > 0)
        ? [ s / 3600, (s  / 60) % 60, s % 60, '']
        : [-s / 3600, (-s / 60) % 60, -s % 60, '-'];
  
    return (
        sign + [hour, minute, second].map((v: number) => {
            `${Math.floor(v)}`.padStart(2, '0')
        }).join(':')); 
}


export const toISOStringWithTimezone = (date: Date) => {
    const tzOffset = -date.getTimezoneOffset()
    const diff = tzOffset >= 0 ? '+' : '-'

    const pad = (paddedDays: number) => {
        return `${Math.floor(Math.abs(paddedDays))}`.padStart(2, '0')
    }

    return              date.getFullYear()      +
        '-'     +   pad(date.getMonth()+ 1)     +
        '-'     +   pad(date.getDate())         +
        'T'     +   pad(date.getHours())        +
        ':'     +   pad(date.getMinutes())      +
        ':'     +   pad(date.getSeconds())      +
        diff    +   pad(tzOffset / 60)          +
        ':'     +   pad(tzOffset % 60);
};