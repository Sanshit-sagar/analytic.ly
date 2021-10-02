import { NextApiResponse } from 'next'
import { requireSession, users } from '@clerk/nextjs/api'

import getHandler, {  
    NextApiRequestExtended 
} from '../../../lib/utils/helpers'

import redis from '../../../lib/redis'
import stringify from 'fast-json-stable-stringify'

type VerbosityType = 'verbose' | 'concise'

interface IPostProps {
    email: string;
    slug: string; 
    destination: string;
    password: string;
    expiration: string;
}

interface SavedConfig { 
    email: string; 
    createdAt: Date; 
    slug: string; 
    expiration: string | undefined; 
    password: string | undefined;  
}; 

function getUserDetails(user: any) {
    return {
        userId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: `${user.firstName} ${user.lastName}`,
        image: user.imageUrl,
        lastUpdatedAt: user.lastUpdatedAt,
        accounts: [],
    }; 
}

// TODO encode URLs and strip them of wonky chars 
async function postSlugConfiguration(data: IPostProps) {
    let slugDetails = stringify(data)

    const pipeline = redis.pipeline()
    pipeline.set(`slug.${data.slug}.details`, slugDetails)
    pipeline.hmset(`slug.details.by.user.${data.email}`, `${data.slug}`, slugDetails)
    pipeline.lpush(`slugs.by.user.${data.email}`, data.slug)
    pipeline.lpush(`destinations.by.user.${data.email}`, data.destination) 
    pipeline.set(`destination.for.slug.${data.slug}`, data.destination)
    pipeline.zadd(`slugs.by.user.${data.email}.autocomplete`, 0, data.slug)
    pipeline.zadd(`destination.by.user.${data.email}.autocomplete`, 0, data.destination) 
    pipeline.zadd(`slugs.for.destination.${data.destination}.by.user.${data.email}`, 1, data.slug) 
    pipeline.exec((_: any, results: any) => console.log(results))
    return data
}

async function lRangeQuery(key: string) {
    return await redis.lrange(`${key}`, 0, -1)
}

async function zRangeQuery(key: string, start: number, end: number) {
    return await redis.zrange(`${key}`, start, end)
}

async function hgetallQuery(key: string) {
    return await redis.hgetall(key)
}

async function hmgetQuery(primaryKey: string, secondaryKey: string) {
    return await redis.hmget(primaryKey, secondaryKey)
}

async function getAllUserDestinations(email: string) {
    return await lRangeQuery(`destinations.by.user.${email}`)
}

async function getConciseUserDestinations(email: string) {
    return await getAllUserDestinations(email)
}

async function getVerboseUserDestinations(email: string) {
    let promises: Promise<any>[] = [];
    let destinations = await getAllUserDestinations(email)
    
    destinations.map(async (dest: string) => {
        promises.push(new Promise(function(resolve: any, reject: any) {  
            redis.zrange(`slugs.for.destination.${dest}.by.user.${email}`, 0, -1)
            .then((response: any) => resolve(response))
            .catch((error: any) =>  reject(error));
        }))
    });

    return { 
        keys: destinations, 
        promises
    }; 
}

function decodeExpiration()

async function getUserSlugConfig(email: string, slug: string) {
    let slugDetailsRaw = await hmgetQuery(`slug.details.by.user.${email}`, slug)
    let slugDetails = JSON.parse(slugDetailsRaw)
    return slugDetails
}

async function getConciseUserSlugConfigs(email: string) {
    let userSlugsRaw = await lRangeQuery(`slugs.by.user.${email}`)
    return userSlugsRaw 
}
async function getVerboseUserSlugConfigs(email: string) {
    let userSlugs = await hgetallQuery(`slug.details.by.user.${email}`)
   
    let verboseUserSlugs = userSlugs ? Object.entries(userSlugs).map((d: any, i: number) => {
        let fields = JSON.parse( d[1])
       return {
           "slug": d[0], 
           "expiration": decodeExpiration(fields.expiration),
           "password": fields.password,
           "destination": new URL(fields.destination).hostname
       };
    }) : {}

    return verboseUserSlugs
}

export default getHandler()
    .get('/api/config/slug/:id', requireSession(async (req: NextApiRequestExtended, res: NextApiResponse) => {
        let user = await users.getUser(req.session.userId)
        let { email } = getUserDetails(user)

        try {
            let slug = req.params.id
            const data = await getUserSlugConfig(email, slug)

            res.status(200).json({ 
                data, 
                resource: 'Slug', 
                user: email,
            })
        } catch(error) {
            res.status(500).json({ error })
        }
    }))
    .get('/api/config/slugs/:verbosity', requireSession(async (req: NextApiRequestExtended, res: NextApiResponse) => {
        let user = await users.getUser(req.session.userId)
        let { email } = getUserDetails(user)

        if(req.params.verbosity==='verbose') {
            let conciseData = await getConciseUserSlugConfigs(email)
            res.status(200).json({ data: conciseData })
        } else {
            let verboseData = await getVerboseUserSlugConfigs(email)
            res.status(200).json({ data: verboseData })
        }
    }))
    .get('/api/config/destinations/:verbosity', requireSession(async (req: NextApiRequestExtended, res: NextApiResponse) => {
        let data: { [key: string]: string[] } = {}
        let user = await users.getUser(req.session.userId)
        let { email } = getUserDetails(user)

        if(req.params.verbosity==='verbose') {
            let { keys, promises } = await getVerboseUserDestinations(email)

            Promise.all(promises)
            .then((promisedValue: any) => {
                keys.map((d: string, i: number) => (
                    data[new URL(d).hostname] = promisedValue[i]
                ))
                res.status(200).json({ data })
            })
            .catch((error: any) => res.status(500).json({ error }));
        } else {
            let data = await getConciseUserDestinations(email)
            res.status(200).json({ data })
        }
    }))
    .post('/api/config/new', requireSession(async (req: NextApiRequestExtended, res: NextApiResponse) => {
      
        let user = await users.getUser(req.session.userId) 
        let userDetails = getUserDetails(user)

        try {
            let inputFields = req.body.data
            
            const inputData = {
                url: inputFields.url,
                slug: inputFields.slug,
                password: inputFields.password,
                expiration: inputFields.expiration,
                destination: inputFields.destination,
                email: userDetails.email,
                createdAt: new Date().getTime()
            }

            const data = await postSlugConfiguration(inputData)
            res.status(200).json({ data })
        } catch(error) {
            res.status(500).json({ error })
        }
    }))
    