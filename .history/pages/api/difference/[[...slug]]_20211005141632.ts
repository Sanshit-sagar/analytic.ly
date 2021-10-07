import { NextApiResponse } from 'next'
import { requireSession, users } from '@clerk/nextjs/api'

import getHandler, {  
    NextApiRequestExtended 
} from '../../../lib/utils/helpers'

import redis from '../../../lib/redis'
import stringify from 'fast-json-stable-stringify'

import { getViewsForSlug } from '../../../lib/redis/slugs'
import { getViewsForUser } from '../../../lib/redis/users'

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


const isSlugVisited = async (slug: string) => {
    return new Promise(async (resolve, reject) => {
        const views: number = await getViewsForSlug(slug)

        if(views > 0) {
            resolve(views)
        } else {
            reject()
        }
    });
}

const isSlugOwnedByUser = async (slug: string, email: string) => {
    return new Promise(async (resolve, reject) => {
        const userSlugs: string[] = await getViewsForUser(email)

        let matchedChild = !userSlugs?.length ? [] : userSlugs.find(uSlug => uSlug===slug)

        if(matchedChild) {
            resolve(matchedChild)
        } else {
            reject()
        }
    }); 
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
                res.status(401).json({ error: 'missing_one_or_more_slugs_params' })
            } else {
                let promises: Promise<any> = []
                let slugs: string[] = [slug1, slug2]
                slugs.map((slug: string, index: number) => {

                })
            }
        } catch(error) {

        }
    });