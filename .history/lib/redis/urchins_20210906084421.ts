import redis from './index'

// utm_medium=meDium234&utm_term=TErm145
// zadd 0 medium1234:meDium1234 0 

export async function getAllUserUrchins(userEmail: string) {
    try {
        const userUrchins = await redis.
}