import { useDateFormatter } from '@react-aria/i18n'


function sanitizeDateRange(start: Date | number, end: Date | number) => {
    
}

const useDateRange = (start: Date | number, end: Date | number) => {
    const formatter = useFormatter({ dateStyle: 'short', timeStyle: 'short' });

    const { start, end } = sanitizeDateRange(start, end)
}