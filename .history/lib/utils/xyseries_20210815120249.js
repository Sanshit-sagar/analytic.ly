import { getHourlySeries } from './timeseries'
import { getDoubleEndedClickstream } from '../redis/clicks'

export function generateFrequencies(clickstream) {
    let freqs = {};
    
    clickstream.map((click, i) => {

        let dateObj = new Date(parseInt(click.timestamp));
        let hour = dateObj.getHours(); 
        let date = dateObj.getDate(); 

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
    let emptyTimeseries = [];
    if(unit==='hours' || 'hour') {
        emptyTimeseries = await getHourlySeries(start, end).timeseries;
    } else if(unit==='minutes' || 'minute') {
        emptyTimeseries = await getMinutelySeries(start, end).timeseries;
    }
   
    let freqs = generateFrequencies(clickstream); 
    let timeseries = populateTimeseries(freqs, emptyTimeseries)
   
    return { timeseries, start, end }; 
}