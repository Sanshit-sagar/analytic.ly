import { useDateFormatter } from '@react-aria/i18n'

function sanitizeDateOrTimestamp(dateOrNum: Date | number): Date {
    return typeof dateOrNum === 'number' ? new Date(dateOrNum) : dateOrNum
}

function sanitizeDateOrTimestampRange(start: Date | number, end: Date | number): { start: Date, end: Date } {
    return { 
        start: sanitizeDateOrTimestamp(start), end: sanitizeDateOrTimestamp(end) }
}

const useDateRange = (start: Date | number, end: Date | number) => {
    const formatter = useFormatter({ dateStyle: 'short', timeStyle: 'short' });

    const { start, end } = sanitizeDateOrTimestampRange(start, end)
}