interface HourInterval {
    start: number;
    end: number; 
}

interface TimeSeries {
    x: string;
    y: number;
    interval: HourInterval;
}

const HOURLY_INCREMENT = 60*60*1000; 
const SEC_IN_MILLIS = 1000;

export function getHourlySeries(start: Date): TimeSeries[]{

    const startDate = setTimeForDate(start, 0, 0, 0);
    const startTimestamp = start

    const hourlySeries: TimeSeries[] = new Array(24).fill(null).map((_, i) => ({
        x: `${i + 1 < 10 ? `0${i + 1}` : i + 1}:00`,
        y: 1,
        interval: { 
            start: startTimestamp + i*HOURLY_INCREMENT,
            end: startTimestamp + (i+1)*HOURLY_INCREMENT - SEC_IN_MILLIS
        }
    }));
    
    return hourlySeries
}   
