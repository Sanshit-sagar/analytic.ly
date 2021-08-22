import redis from './index'

import { 
    ScoredSlug,
    SlugRankings, 
    sanitizeSlug, 
    formatAndSortSlugs,
    formatClickstream 
} from '../utils/formatters'

// zscore user.sanshit.sagar@gmail.com.clickcount /brave-delay-damage-7rgys
export async function getViewsForSlug(slug: string): Promise<number> {
    const views = await redis.llen(`clickstream.slug.${sanitizeSlug(slug)}`);
    return views
}

export async function getClickstreamForSlug(slug: string, limit?:number): Promise<any[]> {
    const clickstream = await redis.lrange(`clickstream.slug.${sanitizeSlug(slug)}`, 0, -1); 
    // TODO: add limit feature for clickstream 
    return formatClickstream(clickstream)
}

export async function getUniqueViewsForSlug(slug: string): Promise<number> {
    const uniqueViews = await redis.zcard(`slug.${sanitizeSlug(slug)}.clickcount`)
    return uniqueViews
}

export async function getUniqueVisitorsForSlug(slug: string, limit?: number): Promise<SlugRankings> {
    const uniques = await redis.zrevrange(`slug.${sanitizeSlug(slug)}.clickcount`, 0, -1, 'WITHSCORES'); 
    const rankings: ScoredSlug[] = formatAndSortSlugs(uniques, limit);

    return {
        category: `Unique Visitors for Slug: ${slug}`,
        rankings,
    }    
}

export async function getUniqueVisitorsFromSlugs(userSlugsWithScores: any[]): Promise<any[]> {
    const slugsToFetch: string[] = [];
    console.log(JSON.stringify(userSlugsWithScores)); 
    userSlugsWithScores.map((uu, _) => {
        slugsToFetch.push(uu.title);
    });

    if(!slugsToFetch.length) {
        return slugsToFetch;
    }

    let userUniquesBySlug: any = {};
    slugsToFetch.map(async function(stf: string, _) {
        const slugUniques = await getUniqueVisitorsForSlug(stf)
        if(!userUniquesBySlug[stf]) {
            userUniquesBySlug[stf] = [
                ...slugUniques.rankings
            ];
        } else {
            userUniquesBySlug[stf] = [
                ...userUniquesBySlug[stf],
                ...slugUniques.rankings
            ];
        }
    }); 

    console.log(`%*(#### Done!!! ${userUniquesBySlug}`);
    return userUniquesBySlug;
}


