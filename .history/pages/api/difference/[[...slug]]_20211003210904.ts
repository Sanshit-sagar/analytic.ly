import { NextApiResponse } from 'next'
import { requireSession, users } from '@clerk/nextjs/api'

import getHandler, {  
    NextApiRequestExtended 
} from '../../../lib/utils/helpers'

import redis from '../../../lib/redis'
import stringify from 'fast-json-stable-stringify'


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

const checkSlugOwnership = async (slug: string, email: string) => {
    return new Promise((resolve, reject) => {
        const slugOwner = await redis.
    })
}

const checkSlugValidity = async (slug1: string, slug2: string, email: string) => {
    const slug1Validity = new Promise((resolve, reject) => {
        const redisResponse1 = await isOwner(slug1, email)
        .then((resp: { views: number; slug: string; }) => {
            if(!resp.views )
            (resp.views > 0 && resp?.length) {
                resolve(resp)
            } else {
                reject(resp)
            }
        }.catch((error: any) => {
            reject(error)
        })
    }
    const slug2Validity = await isOwner(slug2, email),

    let [result1, result2] = Promise.all([ slug1Validity,  slug2Validity ])

}

export default getHandler()
    .get('/api/difference/:slug1/:slug2', requireSession(async (req: NextApiRequestExtended, res: NextApiResponse) => {
        let user = await users.getUser(req.session.userId)
        let { email } = getUserDetails(user)

        try {
            let slug1 = req.params.id
            let slug2 = req.params.id
            if(!slug1?.length || !slug2?.length) {
                return null; 
            } else {
                
                Promise.all(promises)
                    .then((results) => {
                        res.status(200).json({ results })
                    }).catch((error) => {
                        res.status(500).json({ error })
                    }); 
            }
        } catch(error) {

        }
    }));