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
    return await redis.llen(`clickstream.slug.${sanitizeSlug(slug)}`);
}

export async function getClickstreamForSlug(slug: string, limit?:number): Promise<any[]> {
    const clickstream = await redis.lrange(`clickstream.slug.${sanitizeSlug(slug)}`, 0, -1); 
    return formatClickstream(clickstream)
}

export async function getUniqueViewsForSlug(slug: string): Promise<number> {
    return await redis.zcard(`slug.${sanitizeSlug(slug)}.clickcount`)
}

export async function getUniqueVisitorsForSlug(slug: string, limit?: number): Promise<SlugRankings> {
    const uniques = await redis.zrevrange(`slug.${sanitizeSlug(slug)}.clickcount`, 0, -1, 'WITHSCORES'); 
    const rankings: string[] | ScoredSlug[] = formatAndSortSlugs(uniques, limit);

    return {
        category: `Unique Visitors for Slug: ${slug}`,
        rankings,
    }    
}

export async function getUniqueVisitorsFromSlugs(userSlugsWithScores: { props: string[], rankings: SlugRankings[] } ): Promise<any> {
    let slugsToFetch: string[] = [];
    let totalUniqueViews: number = 0;

    let userUniquesBySlug: any = userSlugsWithScores?.rankings.map((sr: SlugRankings, _: number) => {
        return sr.rankings.map((srr) => {
            let uniqueSlug = typeof srr==='string' ? srr : srr.title
            return slugsToFetch.push(uniqueSlug) ?? [];
        });
    });

    slugsToFetch.map(async function(stf: string, _) {
        let uniqueViews: number = await redis.zcard(`slug.${sanitizeSlug(stf)}.clickcount`);
        userUniquesBySlug[`${sanitizeSlug(stf)}`] = uniqueViews
        totalUniqueViews += uniqueViews; 
    }); 
   
    return { 
        viewsByUniques: {...userUniquesBySlug},
        total: totalUniqueViews 
    };
}


