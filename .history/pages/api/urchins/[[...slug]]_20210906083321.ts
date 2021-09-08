import { NextApiResponse } from 'next'

import getHandler, {  NextApiRequestExtended } from '../../../lib/utils/helpers'

import { getUserUrchins } from '../../../lib/re'


// ADD: GET /api/seo/user/:email/[all, recent, top/[source, medium,term,campaign, all/*]

export default getHandler()
    .get('/api/urchins/user/:email', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        const email = req.params.email

        if(email) {
            const userUrchins = await 
        }
    });