import { getHourlySeries } from './timeseries'
import { getDoubleEndedClickstream } from '../redis/clicks'

export function generateFrequencies(clickstream) {
    let freqs = {};
    
    clickstream.map((click, i) => {

        let dateObj = new Date(parseInt(click.timestamp));
        let hour = dateObj.getHours(); 
        let date = dateObj.getUTCDate() - 1; 

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
    let populatedTimeseries = []; 

    const populate = (updatedX, updatedY) => {
        populatedTimeseries.push({ x: updatedX, y: updatedY })
    }    

    timeseries.map((period, index) => {
        let hour = parseInt(period.hour);
        let date = parseInt(period.date);


        if(freqs[date]) {
            if(freqs[date][hour] && parseInt(freqs[date][hour])>0) {
                populate(period.x, parseInt(freqs[date][hour]));

                timeseries[index] =  {
                    x: period.x, 
                    y: parseInt(freqs[date][hour]),
                    hour: hour,
                    date: date,
                    interval: {
                        ...period.interval
                    },
                }
            } else {
                let updatedX = period.x
                let updatedY = period.y
                let updatedInterval = {...period.interval}

                if(parseInt(freqs[date][hour]) > 0) {
                    populate(updatedX, updatedY + 1);
                    timeseries[index] =  { updatedX,  y: updatedY + 1, hour, date,  updatedInterval  };
                } else {
                    populate(updatedX, updatedY)
                    timeseries[index] =  { updatedX,  y: updatedY, hour, date,  updatedInterval  };
                }
            }
        } else {
            populate(period.x, period.y)
        }
    })
    return timeseries; 
}


export async function generateTimeseries(start, end) {
    // todo -> sanitize start and end
    let clickstream = await getDoubleEndedClickstream(start, end, true); 
    let emptyTimeseries = await getHourlySeries(start, end).timeseries;
    // todo -> sanitize clickstream and timeseries
    let freqs = generateFrequencies(clickstream); 
    let timeseries = populateTimeseries(freqs, emptyTimeseries)
    // todo -> check null conditions before returning 
    return { timeseries, freqs }; 
}