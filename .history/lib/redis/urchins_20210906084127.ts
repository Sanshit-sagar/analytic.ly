import redis from './index'


// zadd xy

export async function getAllUserUrchins(userEmail: string) {
    try {
        const userUrchins = await redis.
}