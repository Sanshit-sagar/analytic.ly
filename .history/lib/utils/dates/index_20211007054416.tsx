// converts days + ranges into human readable text

export const dayOfYear = (date: Date) => {
    let diff = date.getTime() - new Date(date.getFullYear(), 0, 0).getDate();
    return Math.floor(diff / 1000 / 60 / 60 / 24)
}

export const quarterOfYear = (date: Date = new Date()) => [
    Math.ceil((date.getMonth() + 1) / 3),
    date.getFullYear()
];

const weekOfYear = date => {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    startOfYear.setDate(startOfYear.getDate() + (startOfYear.getDay() % 7));
    return Math.round((date - startOfYear) / (7 * 24 * 3600 * 1000));
  };

  
export const daysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate()
}

export const daysFromNow = (futureDayCount: number) => {
    let d = new Date()
    d.setDate(d.getDate() + Math.abs(futureDayCount))
    return d.toISOString().split('T')[0];
}

export const daysAgo = (pastDayCount: number) => {
    let d = new Date();
    d.setDate(d.getDate() - Math.abs(pastDayCount))
    return d.toISOString().split('T')[0];
}
  

/// Date Arthmetic 

/** 
* Jumps (independent variable) from one [(day, date, min, etc) - dependent] to another
* Performing the jumps from one node to another as a result of a given measurement
*/
export const addDaysToDate = (date: number, additionalDaysCount: number) => {
    const d = new Date(date)
    d.setDate(d.getDate() + additionalDaysCount)

    return d.toISOString().split('T')[0]
}

export const addMinutesToDate = (date: number, additionalMinutesCount: number) => {
    const d = new Date(date)
    d.setTime(d.getTime() + additionalMinutesCount * 60000)

    return d.toISOString().split('.')[0].replace('T',' ')
};

export const addWeekDays = (startDate: Date, additionalDaysCount: number) => {
    return Array.from({ length: additionalDaysCount }).reduce((date: Date) => {
        
        date = new Date(date.setDate(date.getDate() + 1))
        
        if (date.getDay() % 6 === 0) {
            let cycledDate = date.getDate() + (date.getDay() / 6 + 1)
            date = new Date(date.setDate(cycledDate))
        }
        
        return date
    }, startDate)
}

/*
* Measuring the jump between two nodes i.e. finding path lengths bw/away from/into nodes 
*/
export const getMonthsDiffBetweenDates = (dateInitial: Date, dateFinal: Date) => {
    let diff = (dateFinal.getFullYear() - dateInitial.getFullYear()) * 12 
    diff += dateFinal.getMonth() 
    diff -= dateInitial.getMonth()

    return Math.max(diff, 0)
}

export const getDaysDiffBetweenDates = (dateInitial: Date, dateFinal: Date) => {
    return (dateFinal.getTime() - dateInitial.getTime()) / (1000 * 3600 * 24)
}

export const getHoursDiffBetweenDates = (dateInitial: Date, dateFinal: Date) => {
  (dateFinal.getTime() - dateInitial.getTime()) / (1000 * 3600)
}

export const countWeekDaysBetween = (startDate: Date, endDate: Date) =>
  Array
    .from({ length: (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24) })
    .reduce((count: number) => {
        if (startDate.getDay() % 6 !== 0) {
            count++
        }
        startDate = new Date(startDate.setDate(startDate.getDate() + 1));
        return count;
    }, 0)