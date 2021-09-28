import { NextApiResponse } from 'next'
import getHandler, {  NextApiRequestExtended } from '../../../lib/utils/helpers'
// import { requireSession } from '@clerk/nextjs/api'

export default getHandler()
    .get('/api/echinos/new/:email', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        let email = req.params.email
        let reqBody = {...req.body}

        res.status(200).json({ 
            email,
            data: reqBody
        })
    })

