import { useDateFormatter } from '@react-aria/i18n'


const sanitizeDateRange

const useDateRange = (start: Date | number, end: Date | number) => {
    const formatter = useFormatter({ dateStyle: 'short', timeStyle: 'short' });

    const { start, end } = sanitizeDateRange(start, end)
}