import { DateFormatterOptions, useDateFormatter } from '@react-aria/i18n'

const DEFAULT_OPTIONS: DateFormatterOptions = { dateStyle: 'short' }

function sanitizeDateOrTimestamp(dateOrNum: Date | number): Date {
    return typeof dateOrNum === 'number' ? new Date(dateOrNum) : dateOrNum
}

function sanitizeDateOrTimestampRange(start: Date | number, end: Date | number): { start: Date, end: Date } {
    return { 
        start: sanitizeDateOrTimestamp(start), 
        end: sanitizeDateOrTimestamp(end) 
    };
}

function formatDateOrTimestampRange(start: Date, end: Date, options?: DateFormatterOptions): { start: string, end: string } {
    const formatter = useDateFormatter(DEFAULT_OPTIONS)

    return { 
        start: formatter.format(start),
        end: formatter.format(end)
    };
}

export const useFormattedDate = (value: Date | number | undefined) => {
    if(!value || value===undefined) return 'n/a'
    const formatter = useDateFormatter(DEFAULT_OPTIONS)
    return  formatter.format(value)
}

export const useFormattedDateRange = (rangeStart: Date | number, rangeEnd: Date | number) => {
    const sanitizedRange = sanitizeDateOrTimestampRange(rangeStart, rangeEnd)
    return formatDateOrTimestampRange(sanitizedRange.start, sanitizedRange.end, DEFAULT_OPTIONS)
}