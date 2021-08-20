import { getCountableInterval } from '../utils/d3time'

import * as d3 from 'd3'

export function merge(views: any[], bounds: number[], ticks :number[], interval: string) {
    let merged: any[] = [];
    let freqs: any = {};
    let viewsOnDate: any = {};
    let maxFreq: number = 0; 

    let cti: d3.CountableTimeInterval | undefined = getCountableInterval(interval)
    ticks.map((tick: number, _) => freqs[tick] = 0);

    views.map((view: any, _: number) => {
        let l: number = Math.min(parseInt(`${view.timestamp}`), bounds[0]);
        let r: number = Math.max(parseInt(`${view.timestamp}`), bounds[0]);
        let diff: number | undefined = cti?.count( new Date(l), new Date(r))
        
        if(diff!==undefined && diff>=0 && diff<=ticks[ticks.length - 1]) {
            if(!viewsOnDate[diff]) viewsOnDate[diff] = []; 
            viewsOnDate[diff].push(view);  
        }
    });
    
    Object.entries(viewsOnDate).map((view: any, _) => {
        if(view[1]) freqs[view[0]] = view[1].length || freqs[view[0]]; 
        maxFreq =  Math.max(maxFreq, (view[1].length || 0));
    });

    Object.entries(freqs).map(function(freq, _) {
        merged.push({  x: freq[0], y: freq[1] });
    });

    merged.sort((a,b) => a.x - b.x);
    return { 
        mergedIntervals: merged, 
        viewsByIntervals: viewsOnDate, 
        bounds: [0, merged.length], 
        numPeriods: merged.length,
        numClicks: Object.entries(viewsOnDate).length
    };
}

// console.log(JSON.stringify(merged))
// console.log(`${ticks[ticks.length - 1]}`)
