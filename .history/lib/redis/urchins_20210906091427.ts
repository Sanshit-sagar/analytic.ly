import redis from './index'

// utm_medium=meDium234&utm_term=TErm145
// zadd 0 medium1234:meDium1234 0 term145:TErm145
// sadd 'urchins.${utmName}.user.${email} utmValue

type UrchinKey = 'source' | 'medium' | 'term' | 'campaign' | 'content'

 // user for order of multi() and to map results to Iurchins
const utmFields: UrchinKey[] = ['medium', 'source', 'term', 'campaign', 'content']

interface IUrchins {
    campaign: string[];
    term: string[];
    medium: string[];
    content: string[];
    source: string[];
}

export async function addUrchinPairForUser(email: string, urchinKey: string, urchinValue: string): Promise<any> {
    if(!email || !urchinKey || !urchinValue || !isValidUtm(urchinKey)) {
        Promise.reject('INVALID PROPS');
    }
    
    try {
        const multiPromise = await redis.multi()
            .sadd('urchins')
        Promise.resolve()
    } catch(error) {
        Promise.reject(error);
    }
}

export async function getAllUrchinsForUser(email: string): Promise<IUrchins> {
    let userUrchins: IUrchins = { campaign: [], term: [], medium: [], content: [], source: [] };

    try {
        const multiPromise = await redis.multi()
            .smembers(`urchins.medium.user.${email}`)
            .smembers(`urchins.source.user.${email}`)
            .smembers(`urchins.term.user.${email}`)
            .smembers(`urchins.campaign.user.${email}`)
            .smembers(`urchins.content.user.${email}`)
            .exec((error: any, result: any) => {
                if(error) {
                    console.error(error.message)
                } else {
                    result.map((utmResult: any[], i: number) => {
                        const urchinKey = utmFields[i]
                        const urchinValue = utmResult
                        
                        userUrchins[urchinKey] = urchinValue;
                    });
                }
            });

        return Promise.resolve(userUrchins)
    } catch(error) {
        return Promise.reject(error);
    }
}


