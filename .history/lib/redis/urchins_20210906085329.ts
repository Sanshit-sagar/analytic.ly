import redis from './index'

// utm_medium=meDium234&utm_term=TErm145
// zadd 0 medium1234:meDium1234 0 term145:TErm145
const utmFields = ['medium', 'source', 'term', 'campaign', 'content']

interface IUrchins {

}

export async function getAllUrchinsForUser(email: string) {
    try {
        const multiPromise = await redis.multi()
            .zrange(`urchins.medium.user.${email}`, 0, -1)
            .zrange(`urchins.source.user.${email}`, 0, -1)
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