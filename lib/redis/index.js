import Redis from 'ioredis'

const redis = new Redis('redis://:51f764b2da8f4466972ac4d7ed2610f6@us1-enabled-mudfish-33256.upstash.io:33256')

export default redis