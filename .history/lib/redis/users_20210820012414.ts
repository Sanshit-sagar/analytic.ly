import redis from './index'

import {
    sanitizeSlug,
    ScoredSlug,
    SlugRankings,
    formatClickstream,
    formatAndSortSlugs,
} from '../utils/formatters'
import {
    daysInMonth
} from '../utils/dateUtils'

export async function getViewsForUser(email: string) {
    const slugs = await redis.zrange(`user.${email}.clickcount`, 0, -1);
    return slugs;
}

export async function getClickstreamForUser(email: string, limit?:number): Promise<any[]> {
    const clickstream = await redis.lrange(`clickstream.user.${email}`, 0, -1); 
    return formatClickstream(clickstream)
} 

export async function getUniqueViewsForUser(email: string): Promise<number> {
    const uniqueViews = await redis.zcard(`user.${email}.clickcount`)
    return uniqueViews
}

// use zcard to get slugs give range of views
export async function getUniqueVisitorsForUser(email: string, limit?: number): Promise<any>  {
    
    const slugs: string[] = await redis.zrevrange(`user.${email}.clickcount`, 0, -1, 'WITHSCORES');
    const rankings: ScoredSlug[] = formatAndSortSlugs(slugs, limit); 
    
    const firstSeenAt: any = {}; 
    const details: any = await redis.lrange(`clickstream.user.${email}`, 0, -1); 
    // MAKE THIS REDUNDANT BY USING MESSAGE QUEUE TO CACHE slug.firstSeenAt.set(slug, timestamp)
    details.map(function(detail, i) {
        let clickEvent = JSON.parse(detail); 

        if(!firstSeenAt[clickEvent.slug]) {
            firstSeenAt[clickEvent.slug] = clickEvent.timestamp;
        }
    });
    
    return {
        category: `Views for ${email}'s Slugs`,
        rankings,
        firstSeenAt
    }
}

export async function getFrequenciesByCategoryForUser(email: string, category: string): Promise<SlugRankings> {
    let frequencies: string[] = await redis.zrange(`${category}.by.user.${email}`, 0, -1, 'WITHSCORES');
    let rankings: ScoredSlug[] = formatAndSortSlugs(frequencies); 

    return {
        category: `Frequecies for ${email}'s ${category}`,
        rankings
    };
}

export interface Point {
    key: string;
    x: number;
    y: number;
    slug: string; 
    msOfDay: number;
    secOfDay: number; 
    minOfDay: number; //  Min in day >= 0 && <= 1440
    minOfWeek: number;
    hourOfDay: number;
    dayOfYear: number; 
    dateOfMonth: number;
    dayOfWeek: number;
    score: number; 
    pagevisits: number;
    uniques: number;
    timestamp: number;
    localizedDatetime: string;
}

export interface Voronoi {
    points: Point[];
    category: string; 
    rangeX: number[]; 
    rangeY: number[]; 
    rangeZ: number[]; 
    size: number;           // TODO: change to pagevisits **
    mostViews: number;
    mostViewed: string;
    uniques: number;
    mostUniques: number
    mostFrequentVisitorIp: string;
    lastSeenAt: Map<string, number>;
    user: string;
}

const MINS_IN_HOUR = 60;
const SECS_IN_MIN = 60; 
const MILLIS_IN_DAY = 86400000; // 60 * 60 * 24 * 1000

function localizeDate(ts: number) {
    return `${new Date(ts).toLocaleString()}`;
}

function generateCategoryStr(minTimestamp: number, maxTimestamp: number, email: string): string {
    return `Varanoi from ${localizeDate(minTimestamp)} to ${localizeDate(maxTimestamp)} for ${email}`;
}

export async function generateVoronoi(email: string): Promise<Voronoi> {
    let clickstream = await getClickstreamForUser(email)
    let points: Point[] = []; 
    let minTimestamp: number = new Date().getTime() + MILLIS_IN_DAY;
    let maxTimestamp: number = 0; 
    let uniques: number = 0;
    let maxScore: number = 0; 
    let maxScoreIndex: number = -1; 
    let maxUniques: number = 0; 
    let maxUniquesIndex: number = -1;
    let viewsForSlugInPeriod = new Map<number, number>(); 
    let uniquesForSlugs = new Map<string, Set<string>>(); 
    let lastSeenAt: Map<string, number> = new Map<string, number>(); 

    clickstream.map(function(click: any, index: number) { 
        const timestamp = parseInt(click.timestamp.timeAgo);
        const datetime = new Date(timestamp); 

        maxTimestamp = Math.max(maxTimestamp, timestamp);
        minTimestamp = Math.min(minTimestamp, timestamp);

        const day: number = datetime.getDay();
        const date: number = datetime.getDate();
        const month: number = datetime.getMonth(); 
        const hours: number = datetime.getHours();
        const mins: number = datetime.getMinutes();
        const secs: number = datetime.getSeconds();
        const msecs: number = datetime.getMilliseconds();

        let currScore = 0; 
        if(viewsForSlugInPeriod.has(click.slug)) {
            let slugViews = viewsForSlugInPeriod.get(click.slug);
            if(slugViews) {
                viewsForSlugInPeriod.set(click.slug, slugViews + 1); 
                currScore = slugViews + 1;
            }
        } else {
            // mark these as uniques and highlight them 
            // in the graphs by adding cfray to a set
            viewsForSlugInPeriod.set(click.slug, 1);
            currScore = 1; 
            ++uniques; 
        }
   
        maxScore = Math.max(maxScore, currScore); 
        if(maxScore===currScore)  maxScoreIndex = index; 

        if(!uniquesForSlugs.has(click.slug)) {
            uniquesForSlugs.set(click.slug, new Set<string>());
        }
        let updatedSet: Set<string> = uniquesForSlugs.get(click.slug) || new Set<string>();
        updatedSet.add(click.ip);
        let userUniqueCount: number = updatedSet.size;
        maxUniquesIndex = Math.max(maxUniquesIndex, userUniqueCount);
        uniquesForSlugs.set(click.slug, updatedSet);

        maxUniques = Math.max(maxUniques, userUniqueCount); 
        if(maxUniques===userUniqueCount) maxUniquesIndex = index
        
        let i = 1;
        let daysPast = 0;
        for(i=1; i<=12 && i<month; i++) {
            daysPast += daysInMonth(i);
        }
        daysPast += date;

        lastSeenAt.set(click.slug, parseInt(`${click.timestamp}`))

        let point: Point = {
            key: click.cfRay,
            x: timestamp,
            y: (hours*60*60*1000) + (mins*60*1000) + (secs*1000) + (msecs),
            slug: click.slug,
            msOfDay: (SECS_IN_MIN*(MINS_IN_HOUR + mins) + secs)*1000 + msecs,
            secOfDay: SECS_IN_MIN*(MINS_IN_HOUR + mins) + secs,
            minOfDay: MINS_IN_HOUR*hours + mins,  
            hourOfDay: hours,
            minOfWeek: MINS_IN_HOUR* (day-1) * 24 + (hours * MINS_IN_HOUR) + mins,
            dayOfWeek: day,
            dateOfMonth: date,
            dayOfYear: daysPast,
            score: currScore,
            pagevisits: currScore,
            uniques: userUniqueCount,
            timestamp: parseInt(`${timestamp}`),
            localizedDatetime: new Date(timestamp).toLocaleString()
        }
        points.push(point); 
    });


    points.map((pt, _) =>  pt.x = pt.x - minTimestamp);
    points.reverse(); 

    return {
        points,
        size: points.length, 
        rangeX: [minTimestamp, maxTimestamp],
        rangeY: [0, 24*60*60*1000],
        rangeZ: [1, maxScore],
        user: email,
        uniques: uniques,
        mostViews: maxScore,
        mostUniques: maxUniques,
        mostFrequentVisitorIp: points[maxUniquesIndex].slug,
        mostViewed: points[maxScoreIndex].slug,
        lastSeenAt,
        category: generateCategoryStr(minTimestamp, maxTimestamp, email),
    }
}