
export const isDateValid = (...val: [any]) => {
    return !Number.isNaN(new Date(...val).valueOf())
};

export const isAfterDate = (dateA:Date , dateB: Date) => (
    dateA > dateB
); 

export const isSameDate = (dateA: Date, dateB: Date) => (
    dateA.toISOString() === dateB.toISOString()
);

export const isLeapYear = (year: number) => (
    new Date(year, 1, 29).getMonth() === 1
);

export const 