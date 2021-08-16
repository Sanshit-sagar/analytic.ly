import { getHourlySeries } from './timeseries'
import { getDoubleEndedClickstream } from '../redis/clicks'

export function createFrequencyMap(timeseries, clickstream) {
    let freqs = {};
    
    clickstream.map((click, i) => {

        let dateObj = new Date(parseInt(click.timestamp));
        let hour = dateObj.getHours(); 
        let date = dateObj.getUTCDate(); 

        if(freqs[date]) {
            let freqsOnDate = freqs[date]

            if(!freqsOnDate[hour]) {
                freqsOnDate[hour] = 1; 
            } else {
                freqsOnDate[hour] = freqsOnDate[hour] + 1;
            }
            freqs[date] = freqsOnDate;
        } else {
            freqs[date] = {};
            freqs[date][hour] = 1; 
        }
    });

    return freqs; 
}

export function populateTimeseriesWithFreqs(freqs, timeseries) {
    timeseries.timeseries.map((period, index) => {
        let x = period.x;
        let y = period.y; 
        let hour = period.hour;
        let date = period.date;
        let interval = {...period.interval}; 

        if(freqs[date]) {
            if(freqs[date][hour] && freqs[date][hour]>0) {
                let updatedY = y + 1;
                let updatedPeriod = { x, y: updatedY, hour, date, interval }
                freqs[date][hour] = updatedPeriod;
            }
        }
    })
    return timeseries; 
}


export async function generateTimeseries(start, end) {
    
    let clickstream = await getDoubleEndedClickstream(start, end, true); 
    let timeseries = await getHourlySeries(start, end).timeseries;
    let freqs = generateFrequencies(timeseries, clickstream); 
    let timeseries = populateTimeseries(freqs, timeseries)
    return timeseries; 
}