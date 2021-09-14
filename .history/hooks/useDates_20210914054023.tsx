import { useDateFormatter } from '@react-aria/i18n'

function sanitizeDateOrTimestamp(dateOrNum: Date | number): Date {
    return typeof dateOrNum === 'number' ? new Date(dateOrNum) : dateOrNum
}

function sanitizeDateOrTimestampRange(start: Date | number, end: Date | number): { start: Date, end: Date } {
    return { 
        start: sanitizeDateOrTimestamp(start), 
        end: sanitizeDateOrTimestamp(end) 
    };
}

function formatDateOrTimestampRange(start: Date, end: Date): { sta}
const useDateRange = (rangeStart: Date | number, rangeEnd: Date | number) => {
    const formatter = useDateFormatter({ dateStyle: 'short', timeStyle: 'short' });

    const sanitizedRange = sanitizeDateOrTimestampRange(rangeStart, rangeEnd)
    const formattedRange = formatDateOrTimestampRange(santizedRange.start, sanitizedRange.end);
}