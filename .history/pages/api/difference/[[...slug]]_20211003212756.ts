import { NextApiResponse } from 'next'
import { requireSession, users } from '@clerk/nextjs/api'

import getHandler, {  
    NextApiRequestExtended 
} from '../../../lib/utils/helpers'

import redis from '../../../lib/redis'
import stringify from 'fast-json-stable-stringify'

import { getViewsForSlug, getViewsForUser } from '../../../lib/redis/slugs'

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

interface ApiResponseSlugViews {
    views: number; 
    slug: string;
};

const checkSlugHasViews = async (slug: string) => {
    return new Promise(async (resolve, reject) => {
        const views: number = await getViewsForSlug(slug)
        if(views > 0) {
            resolve(views);
        } else {
            reject(views); 
        }
    });
}

const confirmSlugOwnership = async (slug: string, email: string) => {
    return new Promise(async (resolve, reject) => {
        const use
    })
}

// let [result1, result2] = Promise.all([ slug1Validity,  slug2Validity ])
export default getHandler()
    .get('/api/difference/:slug1/:slug2', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        // let user = await users.getUser(req.session.userId)
        // let { email } = getUserDetails(user)
        let email = 'sanshit.sagar@gmail.com'

        try {
            let slug1 = req.params.slug1
            let slug2 = req.params.slug2

            if(!slug1?.length || !slug2?.length) {
                res.status(401).json({ error: 'BAD_REQUEST_INVALID_PARAMS' })
            } else {

                let promises = [
                    await checkSlugHasViews(slug1),
                    await checkSlugHasViews(slug2),
                    await confirmSlugOwnership(slug1, email),
                    await confirmSlugOwnership(slug2, email)
                ]
                
                Promise.all(promises)
                .then((results) => {
                    res.status(200).json({ results })
                }).catch((error) => {
                    res.status(500).json({ error })
                });
            }
        } catch(error) {

        }
    });