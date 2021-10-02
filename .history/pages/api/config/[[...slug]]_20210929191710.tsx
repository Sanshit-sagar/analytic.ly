import { NextApiResponse } from 'next'
import { requireSession, users } from '@clerk/nextjs/api'

import getHandler, {  
    NextApiRequestExtended 
} from '../../../lib/utils/helpers'

import redis from '../../../lib/redis'

interface IPostProps {
    email: string;
    slug: string; 
    destination: string;
    password: string;
    expiration: string;
}

// TODO encode URLs and strip them of wonky chars 
async function postSlugConfiguration(data: IPostProps) {
    let slugDetails = JSON.stringify(data)

    const pipeline = redis.pipeline()
    pipeline.set(`slug.${data.slug}.details`, slugDetails)
    pipeline.lpush(`slugs.by.user.${data.email}`, data.slug)
    pipeline.lpush(`destinations.by.user.${data.email}`, data.destination) 
    pipeline.set(`destination.for.slug.${data.slug}`, data.destination)
    pipeline.zadd(`slugs.by.user.${data.email}.autocomplete`, 0, data.slug)
    pipeline.zadd(`destination.by.user.${data.email}.autocomplete`, 0, data.destination) 
    pipeline.zadd(`slugs.for.destination.${data.destination}.by.user.${data.email}`, 1, data.slug) 
    pipeline.exec((_: any, results: any) =>  console.log(results)
    });

    return slugDetails;
}

async function zRangeByLexQuery(key: string, rangeStart: string, rangeEnd: string) {
    return await redis.zrangebylex(`${key}`, `${rangeStart}`, `${rangeEnd}`) 
}
async function zRangeQuery(key: string, start: number, end: number) {
    return await redis.zrange(`${key}`, start, end)
}

async function lRangeQuery(key: string, start: number, end: number) {
    return await redis.lrange(`${key}`, start, end)
}

async function getUserDestinationsPrefixedBy(prefix: string, email: string) {
    return await zRangeByLexQuery(`destination.by.user.${email}.autocomplete`, prefix, '+')
}

async function getUserDestinationsSuffixedBy(suffix: string, email: string) {
    return await zRangeByLexQuery(`destination.by.user.${email}.autocomplete`, '-', suffix)
}

async function getSlugConfigurationsByUser(email: string, startIndex: number, pageSize: number) {
    return await lRangeQuery(`slugs.by.user.${email}`, startIndex, startIndex + pageSize)
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
    .get('/api/config/list/:cursor/:pageSize', requireSession(async (req: NextApiRequestExtended, res: NextApiResponse) => {
        let user = await users.getUser(req.session.userId)
        let { email } = getUserDetails(user)

        try {
            const cursor = Math.max(parseInt(req.params.cursor), 0) // the smallest the cursor can be is 0
            const pageSize = Math.max(parseInt(req.params.pageSize), 5) // all queries must be for >= 5 items 
        
            const userSlugConfigs = await getSlugConfigurationsByUser(email, cursor, pageSize + 1) 

            res.status(200).json({ 
                data: userSlugConfigs
            })
        } catch(error) {
            res.status(500).json({ error })
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
    