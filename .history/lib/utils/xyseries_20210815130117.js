import { getHourlySeries, getMinutelySeries } from './timeseries'
import { getDoubleEndedClickstream } from '../redis/clicks'

export function generateFrequencies(clickstream) {
    let freqs = {};
    let freqsForMinute = {}; 
    
    clickstream.map((click, i) => {

        let dateObj = new Date(parseInt(click.timestamp));
        let minute = dateObj.getMinutes(); 
        let hour = dateObj.getHours(); 
        let date = dateObj.getDate(); 
        let month = dateObj.getMonth(); 
        let year = dateObj.getFullYear(); 

        if(freqs[date]) {
            let freqsOnDate = freqs[date]

            if(!freqsOnDate[hour]) {
                freqsOnDate[hour] = 1; 
            } else {
                freqsOnDate[hour] = freqsOnDate[hour] + 1;

                let key = `${minute}:${hour}_on_${date}-${month}-${year}`;
                if(freqsForMinute[key]) {
                    freqsForMinute[key] = freqsForMinute[key] + 1; 
                } else {
                    freqsForMinute[key] = 1; 
                }
            }
            freqs[date] = freqsOnDate;
        } else {
            freqs[date] = {};
            freqs[date][hour] = 1; 
        }
    });
    return { freqs, freqsForMinute }
}


export function populateTimeseries(freqs, timeseries) {

    timeseries.map((period, index) => {
        let hour = parseInt(period.hour);
        let date = parseInt(period.date);
        let month = parseInt(period.month);

        if(freqs[date] && parseInt(freqs[date][hour])>0) {
            timeseries[index] =  {
                x: period.x, 
                y: parseInt(freqs[date][hour]),
                hour: hour, 
                date: date, 
                month: month,
                // interval: {
                //     ...period.interval
                // },
            }
        }
    });
    return timeseries; 
}


export async function generateTimeseries(start, end, unit) {
 
    let clickstream = await getDoubleEndedClickstream(start, end, true); 
    let emptyTimeseries = await getHourlySeries(start, end).timeseries;

    let freqs = generateFrequencies(clickstream); 
    let timeseries = populateTimeseries(freqs, emptyTimeseries)
   
    return { timeseries, start, end }
}