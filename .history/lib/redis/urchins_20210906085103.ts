import redis from './index'

// utm_medium=meDium234&utm_term=TErm145
// zadd 0 medium1234:meDium1234 0 term145:TErm145

export async function getAllUserUrchins(email: string) {
    try {
        const multiPromise = await redis.multi()
            .zrange(`urchins.medium.user.${email}`)
            .zrange(`urchins.source.user.${email}`)
            .zrange(`urchins.term.user.${email}`)
            .zrange(`urchins.campaign.user.${email}`)
            .zrange(`urchins.content.user.${email}`, 0, -1)
            .exec((error: any, result: any) => {
                if(error) {
                    console.error(error.message)
                } else {
                    c
                }
}