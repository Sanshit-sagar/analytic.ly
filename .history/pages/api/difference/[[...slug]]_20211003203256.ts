import { NextApiResponse } from 'next'
import { requireSession, users } from '@clerk/nextjs/api'

import getHandler, {  
    NextApiRequestExtended 
} from '../../../lib/utils/helpers'

import redis from '../../../lib/redis'
import stringify from 'fast-json-stable-stringify'

const checkSlugOwnership = async (slug: string) => {
    return new Promise
}

export default getHandler()
    .get('/api/difference/:slug1/:slug2', requireSession(async (req: NextApiRequestExtended, res: NextApiResponse) => {
        let user = await users.getUser(req.session.userId)
        let { email } = getUserDetails(user)

        try {
            let slug1 = req.params.id
            let slug2 = req.params.id

            Promise.all([
                const slug1Ownership = await checkSlugOwnership(slug1)
                const slug2Ownership = await checkSlugOwnership(slug2)
            ])

        } catch(error) {

        }
    }));