import redis from './index'

// utm_medium=medium234&utm_term=TErm145
// zadd 

export async function getAllUserUrchins(userEmail: string) {
    try {
        const userUrchins = await redis.
}