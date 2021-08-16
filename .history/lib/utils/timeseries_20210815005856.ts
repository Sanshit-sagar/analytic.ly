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

export function getHourlySeries(start: number | string): TimeSeries[]{
    const startTimestamp = parseInt(`${start}`)

    // todo add a field for right timestamp = timestamp + increment - 1000
    const hourlySeries: TimeSeries[] = new Array(24).fill(null).map((_, i) => ({
        x: `${i + 1 < 10 ? `0${i + 1}` : i + 1}:00`,
        y: 1,
        interval: { 
            start: startTimestamp + i*HOURLY_INCREMENT,
            end: startTimestamp + (i+1)*HOURLY_INCREMENT - SEC_IN_MILLIS
    }));
    
    return hourlySeries
}   
