import redis from './index'


// zadd 

export async function getAllUserUrchins(userEmail: string) {
    try {
        const userUrchins = await redis.
}