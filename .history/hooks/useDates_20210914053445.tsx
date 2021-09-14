import { useDateFormatter } from '@react-aria/i18n'


function sanitizeDateOrTimestampRange(start: Date | number, end: Date | number) => {
    let sanitizedStart = sanitizeDateOrTimestamp
}

const useDateRange = (start: Date | number, end: Date | number) => {
    const formatter = useFormatter({ dateStyle: 'short', timeStyle: 'short' });

    const { start, end } = sanitizeDateOrTimestampRange(start, end)
}