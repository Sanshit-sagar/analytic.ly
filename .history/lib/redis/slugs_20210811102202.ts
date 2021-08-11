import redis from './index'

export function formatSlugs(unformattedSlugs: any[]): any[] {
    let userslugs: any[] = []; 

    unformattedSlugs.map(function(value: any, index: number) {
        let sluginfo = JSON.parse(value);
        userslugs.push({
            slug: sluginfo,
            index,
        });
    });

    return userslugs; 
}

export async function getClicksForUser(email: string): Promise<any[]> {
    const userslugsRaw: any[] = await redis.lrange(`clickstream.user.${email}`, 0, -1);
    return formatSlugs(userslugsRaw);
}
