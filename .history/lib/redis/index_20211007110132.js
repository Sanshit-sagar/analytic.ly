import Redis from 'ioredis'
Redis.Promise = require("bluebird");

const redis = new Redis('redis://:5edce20ee1674f20ab5a6637e3e32008@usw1-sought-jennet-31323.upstash.io:31323')

export default redis
// enableAutoPipelining: true