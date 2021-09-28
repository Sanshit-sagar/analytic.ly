import NextApiResponse from 'next'
import getHandler, {  NextApiRequestExtended } from '../../../lib/utils/helpers'
import { requireSession, WithSessionProp } from '@clerk/nextjs/api'

export default getHandler()
    .post('/api/echinos/new/:email', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        let userId = req?.session?.userId  ?? '' 
        let email = req.params.email
        let reqBody = {...req.body}

        res.status(200).json({ 
            userId,
            email,
            data: reqBody
        }); 
    })); 