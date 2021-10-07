
export const isDateValid = (...val: [any]) => {
    return !Number.isNaN(new Date(...val).valueOf())
}

export const isAfterDate = (dateA, dateB) => (
    dateA > dateB
); 

const isSameDate = (dateA: Date, dateB: Date) => (
    dateA.toISOString() === dateB.toISOString()
);
