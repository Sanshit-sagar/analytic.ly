import redis from './index'

// utm_medium=meDium234&utm_term=TErm145
// zadd 0 medium1234:meDium1234 0 term145:TErm145
// sadd 'urchins.${utmName}.user.${email} utmValue

type UrchinKey = 'source' | 'medium' | 'term' | 'campaign' | 'content'

 // user for order of multi() and to map results to Iurchins
const utms: UrchinKey[] = ['medium', 'source', 'term', 'campaign', 'content']

interface IUrchins {
    campaign: string[];
    term: string[];
    medium: string[];
    content: string[];
    source: string[];
}

export function isValidUtm(utm: string): boolean {
    return (utms.filter((validUtm) => utm===validUtm) || []).length === 1
}

export async function addUrchinPairForUser(email: string, urchinKey: string, urchinValue: string): Promise<any> {
    if(!email || !urchinKey || !urchinValue || !isValidUtm(urchinKey)) {
        Promise.reject('INVALID PROPS');
    }

    try {
        const result = await redis.sadd(`urchins.${urchinKey}.user.${email}`, `${urchinValue}`)
        Promise.resolve(result)
    } catch(error) {
        Promise.reject(error);
    }
}

export async function getAllUrchinsForUser(email: string): Promise<IUrchins> {
    let urchins: IUrchins = { campaign: [], term: [], medium: [], content: [], source: [] };

    try {
        const multiPromise = await redis.multi()
            .smembers(`urchins.medium.user.${email}`)
            .smembers(`urchins.source.user.${email}`)
            .smembers(`urchins.term.user.${email}`)
            .smembers(`urchins.campaign.user.${email}`)
            .smembers(`urchins.content.user.${email}`)
            .exec((error: any, result: any) => {
                if(error) console.error(error.message)
                else result.map((res: any[], i: number) => urchins[utms[i]] = res[1]);
            });
        return Promise.resolve(urchins)
    } catch(error) {
        return Promise.reject(error);
    }
}


export async function getAllUrchinsForUserByCategory(email: string, utmCategory: string): Promise<string[]> {
   
    try {
        const promise = await redis.pipeline()
        promise.smembers(`urchins.${utmCategory}.user.${email}`)
        promise.exec((error: any | undefined | null, results: (string | null)[][]) => {
           
        })
    }
}