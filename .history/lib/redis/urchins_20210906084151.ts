import redis from './index'

// utm_medium=medium234&
// zadd 

export async function getAllUserUrchins(userEmail: string) {
    try {
        const userUrchins = await redis.
}