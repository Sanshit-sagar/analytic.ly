import redis from './index'

// utm_medium=meDium234&utm_term=TErm145
// zadd 0 medium1234:meDium1234 0 term145:TErm145

export async function getAllUserUrchins(email: string) {
    try {
        const multiPromise = await redis.multi()
            .zrangebylex(`urchins.medium.user.${email}`)
            .zrangebylex(`urchins.medium.user.${email}`
            )
}