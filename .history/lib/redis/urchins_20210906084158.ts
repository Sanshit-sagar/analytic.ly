import redis from './index'

// utm_medium=medium234&utm_term=M
// zadd 

export async function getAllUserUrchins(userEmail: string) {
    try {
        const userUrchins = await redis.
}