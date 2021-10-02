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
    pipeline.lpush(`slugs.by.user.${data.email}`, slugDetails)
    pipeline.lpush(`destinations.by.user.${data.email}`, slugDetails) 
    pipeline.set(`destination.for.slug.${data.slug}`, data.destination)
    pipeline.zadd(`slugs.by.user.${data.email}.autocomplete`, 0, data.slug)
    pipeline.zadd(`destination.by.user.${data.email}.autocomplete`, 0, data.destination) 
    pipeline.zadd(`slugs.for.destination.${data.destination}.by.user.${data.email}`, 1, data.slug) 
    pipeline.exec((err: any, results: any) => {
        console.log(results)
    });

    return slugDetails;
}

async function zRangeByLexQuery(key: string, rangeStart: string, rangeEnd: string) {
    return await redis.zrange(`${key}`, `${rangeStart}`, `${rangeEnd}`) 
}
async function getListBetweenIndicesQuery(key: string, indexStart: number, indexEnd: number) {
    return await redis.lrange(`${key}`, indexStart, indexEnd)
}

async function getUserDestinationsPrefixedBy(prefix: string, email: string) {
    return await zRangeByLexQuery(`destination.by.user.${email}.autocomplete`, prefix, '+')
}

async function getUserDestinationsSuffixedBy(suffix: string, email: string) {
    return await zRangeByLexQuery(`destination.by.user.${email}.autocomplete`, '-', suffix)
}

async function getSlugConfigurationsByUser(email: string, startIndex: number, pageSize: number) {
    return await getListBetweenIndicesQuery(`slugs.by.user.${email}`, startIndex, startIndex + pageSize)
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

interface Cursors {
    previous: string | undefined;
    cursor: string | undefined; 
    next: string | undefined;
}

export default getHandler()
    .get('/api/config/list', requireSession(async (req: NextApiRequestExtended, res: NextApiResponse) => {
        const PAGE_SIZE = 20
        
        let user = await users.getUser(req.session.userId)
        let { email } = getUserDetails(user)
        const { 
            previous, 
            cursor, 
            next 
        }: Cursors = req.body.data
     
        const userSlugConfigs = await getSlugConfigurationsByUser(email, 0, PAGE_SIZE) 

        res.status(200).json({ 
            data: userSlugConfigs.slice(0, 0 + PAGE_SIZE), 
            previous: cursor, 
            cursor: next,
            next: userSlugConfigs[userSlugConfigs.length - 1]
        })
    }))
    .post('/api/config/new', requireSession(async (req: NextApiRequestExtended, res: NextApiResponse) => {
      
        let user = await users.getUser(req.session.userId) 
        let userDetails = getUserDetails(user)
        let inputFields = req.body.data
        
        const data = { 
            url: inputFields.url,
            slug: inputFields.slug,
            password: inputFields.password,
            expiration: inputFields.expiration,
            destination: inputFields.destination,
            email: userDetails.email,
            createdAt: new Date().getTime()
        }
        try {
            const results= await postSlugConfiguration(data)
            res.status(200).json({ results })
        } catch(error) {
            console.log(error)
            
        }
    }))
    