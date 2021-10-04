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

const checkSlugValidity = async (slug: string, email: string) => {
    return new Promise((resolve, reject) => {
        const { views, slug } = await getViewsForSlug(slug)
        .then((response) => {

        })
    ])
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
                const slug1Validity = await checkSlugValidity(slug1, email),
                const slug2Validity = await checkSlugValidity(slug2, email),

                let [result1, result2] = Promise.all([ slug1Validity,
                   
                    slug2Validity
                ]);

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