
export const isDateValid = (...val: [any]) => {
    return !Number.isNaN(new Date(...val).valueOf())
}

export const isAfterDate = (dateA, dateB) => dateA > dateB;
