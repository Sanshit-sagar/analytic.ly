import { NextApiResponse } from 'next'
import { requireSession, users } from '@clerk/nextjs/api'

import getHandler, {  
    NextApiRequestExtended 
} from '../../../lib/utils/helpers'

import redis from '../../../lib/redis'
import stringify from 'fast-json-stable-stringify'

interface IPostProps {
    email: string;
    slug: string; 
    destination: string;
    password: string;
    expiration: string;
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

async function zRangeByLexQuery(key: string, rangeStart: string, rangeEnd: string) {
    return await redis.zrangebylex(`${key}`, `${rangeStart}`, `${rangeEnd}`) 
}
async function zRangeQuery(key: string, start: number, end: number) {
    return await redis.zrange(`${key}`, start, end)
}

async function lRangeQuery(key: string) {
    return await redis.lrange(`${key}`, 0, -1)
}

async function hgetallQuery(key: string) {
    return await redis.hgetall(key)
}

async function getAllUserDestinations(email: string) {
    return await lRangeQuery(`destinations.by.user.${email}`)
}



async function getUserDestinationsPrefixedBy(prefix: string, email: string) {
    return await zRangeByLexQuery(`destination.by.user.${email}.autocomplete`, prefix, '+')
}

async function getUserDestinationsSuffixedBy(suffix: string, email: string) {
    return await zRangeByLexQuery(`destination.by.user.${email}.autocomplete`, '-', suffix)
}

interface SavedConfig { 
    email: string; 
    createdAt: Date; 
    slug: string; 
    expiration: string | undefined; 
    password: string | undefined;  
}; 

async function getConciseUserSlugConfigs(email: string) {
    let userSlugs = await lRangeQuery(`slugs.by.user.${email}`)
    return userSlugs 
}
async function getVerboseUserSlugConfigs(email: string) {
    let slugDetails = await hgetallQuery(`slug.details.by.user.${email}`)
    let sanitizedDetailedSlugs = slugDetails.map((datum: string, i: number) => {
        if(i%2===1 && i+1 < slugDetails.length) {
            let fields = JSON.parse(slugDetails[i+1])
            return {
                key: `slug-idx-${(i-1)/2}`, 
                slug: datum,
                ...fields
            }
        } else if(i%2==1) {
            return {
                key: `slug-idx-${(i-1)/2}`, 
                slug: datum,
            }
        }
    });
    return sanitizedDetailedSlugs
}

async function getDestinationsByUser(email: string) {
    let destinations = await getAllUserDestinations(email)
    return destinations
}

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

export default getHandler()
    .get('/api/config/slugs', requireSession(async (req: NextApiRequestExtended, res: NextApiResponse) => {
        let user = await users.getUser(req.session.userId)
        let { email } = getUserDetails(user)
       
        const data = await getSlugConfigurationsByUser(email)
        res.status(200).json({ data, resource: 'Slugs', user: email })
    }))
    .get('/api/config/slug/:verbosity', requireSession(async (req: NextApiRequestExtended, res: NextApiResponse) => {
        let data: CollectionItem[] = [];
        let user = await users.getUser(req.session.userId)
        let userDetails = getUserDetails(user)

        try {
            let verbosity = req.params.verbosity 
            if(verbosity!=='verbose') {
                data = getConciseUserSlugConfigs(userDetails.email)
            } else {
                data = getVerboseUserSlugConfigs(userDetails.email)
            }
            res.status(200).json({ data: userDetails})
        } catch(error) {
            res.status(500).json({ error })
        }
    }))
    .get('/api/config/destinations', requireSession(async (req: NextApiRequestExtended, res: NextApiResponse) => {
        let user = await users.getUser(req.session.userId)
        let { email } = getUserDetails(user)

        let data = await getDestinationsByUser(email)
        res.status(200).json({ data, resource: 'Destinations', user: email })
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
    