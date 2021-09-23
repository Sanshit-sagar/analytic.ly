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

interface IUrchin {
    id: string; 
    name: string; 
    frequency: number; 
    updatedAt: Date;
};

function getDateFromIndex(i: number) {
    if(!i || i>28 || i<0) return Math.round(Math.random() * 28)
    return (new Date().getDate() + i) % 28
}

export async function getUrchinsForUserForCategory(email: string, utmCategory: string): Promise<IUrchin[]> {
    let urchins: IUrchin[] = []
    let yr = new Date().getFullYear()
    let mnth = new Date().getMonth() - 6; 

    try {
        const promise = await redis.multi()
            .smembers(`urchins.${utmCategory}.user.${email}`)
            .exec((_error: any | null, result: any) => {
                let temp = result[0][1]
                temp.map((res: string,index: number) => {
                    urchins.push({
                        id: `${index}`,
                        name: res,
                        frequency: Math.random(),
                        updatedAt: new Date(yr, mnth, getDateFromIndex(index)),
                        createdAt: new Date(yr, mnth, new Day().getDate()),
                    });
                })
            });
        return Promise.resolve(urchins); 
    } catch(error) {
        return Promise.reject(error); 
    }
}