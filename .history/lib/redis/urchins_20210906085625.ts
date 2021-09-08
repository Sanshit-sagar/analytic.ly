import redis from './index'

// utm_medium=meDium234&utm_term=TErm145
// zadd 0 medium1234:meDium1234 0 term145:TErm145
// sadd 'urchins.${utmName}.user.${email} utmValue
const utmFields = ['medium', 'source', 'term', 'campaign', 'content']

interface IUrchins {
    campaign: string[];
    term: string[];
    medium: 
}

export async function getAllUrchinsForUser(email: string) {
    try {
        const multiPromise = await redis.multi()
            .smembers(`urchins.medium.user.${email}`)
            .zrange(`urchins.source.user.${email}`)
            .zrange(`urchins.term.user.${email}`, 0, -1)
            .zrange(`urchins.campaign.user.${email}`, 0, -1)
            .zrange(`urchins.content.user.${email}`, 0, -1)
            .exec((error: any, result: any) => {
                if(error) {
                    console.error(error.message)
                } else {
                    result.map
                }
}