interface TimeSeries {
    x: string;
    y: number;
    timestamp: number;
}

export function getHourlySeries(start: number | string): TimeSeries[]{
    const HOURLY_INCREMENTS = 60*60*1000; 
    const startTimestamp = parseInt(`${start}`)

    // todo add a field for right timestamp = timestamp + increment - 1000
    const hourlySeries: TimeSeries[] = new Array(24).fill(null).map((_, i) => ({
        x: `${i + 1 < 10 ? `0${i + 1}` : i + 1}:00`,
        y: 1,
        timestamp: startTimestamp + i*HOURLY_INCREMENTS,
    }));
    
    return hourlySeries
}   
