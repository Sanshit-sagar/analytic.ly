import Redis from 'ioredis'
Redis.Promise = require("bluebird");

const redis = new Redis(REDIS_ENDPOINT)

export default redis
// enableAutoPipelining: true