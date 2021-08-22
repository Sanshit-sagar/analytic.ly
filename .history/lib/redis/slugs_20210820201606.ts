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


export async function getUniqueVisitorsFromSlugs(userSlugsWithScores: { props: string[], rankings: SlugRankings[] } ): Promise<any> {
    const slugsToFetch: string[] = [];
    console.log(JSON.stringify(userSlugsWithScores)); 
    console.log('Checkpoint 1 ');
    
    userSlugsWithScores?.rankings?.map((uu: SlugRankings, _: number) => {
        uu.rankings.map((ranking, _) => {
            slugsToFetch.push(ranking.title);
        });
    }) ?? [];

    console.log(`%%%%%%%%%%%%%%${JSON.stringify(slugsToFetch)}`)

    let userUniquesBySlug: any = {}; 
    let totalUniqueViews: number = 0;

    slugsToFetch.map(async function(stf: string, _) {
        let uniqueViews: number = await redis.zcard(`slug.${sanitizeSlug(stf)}.clickcount`);
        userUniquesBySlug[`${sanitizeSlug(stf)}`] = uniqueViews
        totalUniqueViews += uniqueViews; 
    }); 
   
    console.log(`**************${JSON.stringify(userUniquesBySlug)}`); 
    return { viewsByUniques: {...userUniquesBySlug}, total: totalUniqueViews };
}


