import redis from './index'

import { 
    formatClick,
    formatClickstream
} from '../utils/formatters';

import { setTimeForDate } from '../utils/dateUtils'
// interface Point {
//     x: number;
//     y: number;
//     slug: string; 
//     msOfDay: number;
//     secOfDay: number; 
//     minOfDay: number; //  Min in day >= 0 && <= 1440
//     hourOfDay: number;
//     dayOfYear: number; 
//     dateOfMonth: number;
//     dayOfWeek: number;
//     timestamp: number;
//     localizedDatetime: string;
// }

// interface Voronoi {
//     points: Point[];
//     size: number;
//     start: number;
//     end: number; 
//     category: string;
//     user: string;
// }

export const getClickstream = async (email: string | string[]): Promise<any[] | null> => {
    let clickstream: any[] = [];

    if(!email) {
        clickstream = await redis.lrange(`clickstream`, 0, -1); // DONE
    } else  {
        clickstream = await redis.lrange(`clickstream.user.${email}`, 0, -1); // DONEL
    } 
    return formatClickstream(clickstream);
}

export const getClickByCfRay = async (cfRay: string | string[]): Promise<any> => {
    // console.log('Getting clicks by cfRay');
    const clickWithCfRay: any = await redis.hget('cfray.to.click', cfRay); 
    // console.log(`Got the value ${clickWithCfRay.requestHeaders}`); 

    return !clickWithCfRay ? [] : formatClick(clickWithCfRay); 
}

export const getClickFromField = async (fieldName: string | string[], fieldValue: string | string[]): Promise<any> => {
    
    if(fieldName?.length && fieldValue?.length) {
        if(fieldName==='cfRay') {
            return getClickByCfRay(fieldValue);
        } else {
            return null; 
        }
    }
    return null; 
}

export async function getClickstreamStartingAt(start: number, isAsc?: boolean | null): Promise<string[]>  {
    const startTimestamp = new Date(start).getTime(); 
    return await redis.zrangebylex('clickstream.chronological', `-`, `(${startTimestamp}`);
}

export async function getClickstreamEndingAt(end: number, isAsc?: boolean | null): Promise<string[]> {
    const endTimestamp = new Date(end).getTime(); 
    return await redis.zrangebylex('clickstream.chronological', `-`, `(${endTimestamp}`);
}

export async function getClickstreamOnDate(date: Date, isAsc: boolean): Promise<any[] | any> {
    let dateObj = new Date(date);
    
    let dateStart = setTimeForDate(dateObj, 0, 0, 0); 
    let timestampStart = dateStart.getTime();
    let dateEnd = setTimeForDate(dateObj,23,59,59); 
    let timestampEnd = dateEnd.getTime();

    return await getDoubleEndedClickstream(timestampStart, timestampEnd, undefined, isAsc); 
}

const MILLIS_IN_DAY = 60*60*1000*24; 

function filterClickstreamBySlugOrUser(results: any[], filterValue: string, filterColumn: string) {
    let output: any[] = [];
    let frequencies: Map<string, number> = new Map<string, number>();
    let dates = {}
    let minTimestamp = new Date().getTime();
    let maxTimestamp = new Date(1,1,1970).getTime();

    results.map(function(result, index) {
        let fragments = result.split(':');

        const id: number = index;
        const timestamp: number = parseInt(fragments[0])
        const cfRay: string = fragments[1];
        const slug: string = fragments[2];
        const user: string = fragments[4];

        maxTimestamp = Math.max(maxTimestamp, timestamp);
        minTimestamp = Math.min(minTimestamp, timestamp);

        if((filterColumn==='slug' && slug===filterValue) || (filterColumn==='user' && user===filterValue)) {
            output.push({
                id,
                cfRay,
                timestamp,
                slug,
                user
            });

            let dateHashStr: string = `${new Date(timestamp).getDate()}/${new Date(timestamp).getMonth()}`;
            if(!frequencies.has(dateHashStr)) frequencies.set(dateHashStr, 0);
            let updatedFrequency = frequencies.get(dateHashStr) || 0;
            frequencies.set(dateHashStr, updatedFrequency + 1); 
            dates[dateHashStr] = true
        }
    });
    return { output, frequencies, minTimestamp, maxTimestamp, dates };
}

export async function getDoubleEndedClickstream(start?: number, end?: number, filterValue?: string, filterName?: string, isAsc?: boolean | null): Promise<any> {
    
    let lexResults: any[] = [];
    if(filterValue && filterName && filterName==='slug') {
        let slug: string = filterValue;
        if(start && end) {
            console.log('hit3')
            lexResults = await redis.zrangebylex('clickstream.chronological.by.slug', `[${start}`, `(${end}`);
        } else {
            console.log('hit4')
            lexResults = await redis.zrangebylex('clickstream.chronological.by.slug', `[${new Date(1,1,1970).getTime()}`, `(${new Date().getTime()}`);
        }
        let { output, frequencies, minTimestamp, maxTimestamp, dates } = filterClickstreamBySlugOrUser(lexResults, slug, 'slug'); 
        
        return { views: [...output], minTimestamp, maxTimestamp }
    } else if(filterValue && filterName && filterName==='user') {
        
        let user: string = filterValue; 
        if(start && end && start!==0 && end!==-1) {
            console.log('hit1')
            lexResults = await redis.zrangebylex(`clickstream.chronological.by.slug`, `[${start}`, `(${end}`);
        } else {
            console.log('hit2')
            lexResults = await redis.zrangebylex(`clickstream.chronological.by.slug`,`[${new Date(1,1,1970).getTime()}`, `(${new Date().getTime()}`);
        }

        let { output, frequencies, minTimestamp, maxTimestamp, dates } = filterClickstreamBySlugOrUser(lexResults, user, 'user'); 
        lexResults = [...output]; 
        return { views: [...output], minTimestamp, maxTimestamp }
    } else {
        lexResults = await redis.zrangebylex('clickstream.chronological', `[${start}`, `(${end}`);
    }
    
    const clickstream: any[] = [];
    lexResults.forEach(function(value: string, index: number) {
        let fragments = value.split(':'); 
        
        clickstream.push({
            id: index,
            timestamp: fragments[0],
            cfRay: fragments[1],
            click: fragments[2], 
            localDatetime: `${new Date(parseInt(fragments[0])).toLocaleString()}`,
        }); 
    });

    return clickstream
}