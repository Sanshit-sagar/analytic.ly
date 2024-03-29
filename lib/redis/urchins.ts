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

export async function addUrchinForUser(email: string, key: string, value: string): Promise<any> {
    if(!email || !key || !value || !isValidUtm(key)) {
        return Promise.reject('INVALID PROPS');
    }

    try {
        const data = await redis.sadd(`urchins.${key}.user.${email}`, `${value}`)
        return Promise.resolve(data)
    } catch(error) {
        return Promise.reject(error)
    }
}

export async function deleteUrchinForUser(email: string, key: string, value: string): Promise<boolean> {
    if(!email || !key || !value || !isValidUtm(key)) return Promise.reject('INVALID PROPS')

    try {
        const data = await redis.srem(`urchins.${key}.user.${email}`, `${value}`)
        return Promise.resolve(data === 0 ? false : true)
    } catch (error) {
        return Promise.reject(error)
    }
}

export async function getAllUrchinsForUser(email: string): Promise<IUrchins> {
    let urchins: IUrchins = { 
        campaign: [], 
        term: [], 
        medium: [], 
        content: [], 
        source: [] 
    }

    try {
        const multiPromise = await redis.multi()
            .smembers(`urchins.medium.user.${email}`)
            .smembers(`urchins.source.user.${email}`)
            .smembers(`urchins.term.user.${email}`)
            .smembers(`urchins.campaign.user.${email}`)
            .smembers(`urchins.content.user.${email}`)
            .exec((error: any, result: any) => {
                if(error) console.error(error.message)
                else result.map((res: any[], i: number) => {
                    urchins[utms[i]] = res[1];
                })
            })
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
    slugs: string[]; 
};

function getDateFromIndex(i: number) {
    if(!i || i>28 || i<0) return Math.round(Math.random() * 28)
    return (new Date().getDate() + i) % 28
}

export async function getUrchinsForUser(email: string, utmCategory: string): Promise<IUrchin[]> {
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
                        slugs: [],
                    })
                })
            })
        return Promise.resolve(urchins); 
    } catch(error) {
        return Promise.reject(error); 
    }
}