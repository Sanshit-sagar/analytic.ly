import Redis from 'ioredis'
Redis.Promise = require("bluebird")

const REDIS_ENDPOINT = 'redis://:5edce20ee1674f20ab5a6637e3e32008@usw1-sought-jennet-31323.upstash.io:31323'
const redis = new Redis(REDIS_ENDPOINT)

export default redis
// enableAutoPipelining: true