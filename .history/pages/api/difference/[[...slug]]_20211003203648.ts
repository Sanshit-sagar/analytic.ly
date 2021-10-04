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

export default getHandler()
    .get('/api/difference/:slug1/:slug2', requireSession(async (req: NextApiRequestExtended, res: NextApiResponse) => {
        let user = await users.getUser(req.session.userId)
        let { email } = getUserDetails(user)

        try {
            let slug1 = req.params.id
            let slug2 = req.params.id

            Promise.all([
                const slug1OwnershipValid = await checkSlugOwnership(slug1, email)
                const slug2Ownership = await checkSlugOwnership(slug2, email)
            ])

        } catch(error) {

        }
    }));