import { NextApiResponse } from 'next'
import getHandler, {  NextApiRequestExtended } from '../../../lib/utils/helpers'

export default getHandler()
    .get('/api/echinos/new/:email', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        let email = req.params.email
        let reqBody = { ...req.body }

        res.status(200).json({ 
            email,
            data: reqBody
        })
    })


// import { requireSession } from '@clerk/nextjs/api'
 // .get('/api/echinos/new/:email', requireSession(async (req: NextApiRequestExtended, res: NextApiResponse) => {
        // let userId = req?.params?.userId 