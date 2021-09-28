import { NextApiResponse } from 'next'
import getHandler, {  NextApiRequestExtended } from '../../../lib/utils/helpers'

export default getHandler()
    .get('/api/echinos/new/:email', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        let email = req.params.email
        let encodedParams = req.body.url

        let { url, slug, expiry, urchins: {source, medium, term, content, campaign, ...otherUrchins }, password }

        res.status(200).json({ 
            email,
            data: reqBody
        })
    })


// import { requireSession } from '@clerk/nextjs/api'
 // .get('/api/echinos/new/:email', requireSession(async (req: NextApiRequestExtended, res: NextApiResponse) => {
        // let userId = req?.params?.userId 