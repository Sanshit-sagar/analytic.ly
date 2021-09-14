import { useDateFormatter } from '@react-aria/i18n'

function sanitizeDateOrTimestamp(dot: Date | number): {
    if(typeof dot === 'number')
}

function sanitizeDateOrTimestampRange(start: Date | number, end: Date | number) => {
    let sanitizedStart = sanitizeDateOrTimestamp(start)
    let sanitizedEnd = sanitizeDateOrTimestamp(end)

    return { start: sanitizedStart, end: sanitizedEnd }
}

const useDateRange = (start: Date | number, end: Date | number) => {
    const formatter = useFormatter({ dateStyle: 'short', timeStyle: 'short' });

    const { start, end } = sanitizeDateOrTimestampRange(start, end)
}