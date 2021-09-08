import redis from './index'

// utm_medium=meDium234&utm_term=TErm145
// zadd 0 medium1234:meDium1234 0 term145:TErm145

export async function getAllUserUrchins(userEmail: string) {
    try {
        const userUrchins = await redis.zrangebylex(`urchins.medium.user.${email}`, )
}