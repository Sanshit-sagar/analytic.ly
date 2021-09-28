import { NextApiResponse } from 'next'
import getHandler, {  NextApiRequestExtended } from '../../../lib/utils/helpers'


export default getHandler()
    .get('/api/echinos/new/:email', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        let email = req.params.email
        let encodedParams = req.body.url

        // TODO: call the decode(code: string) {} here

        res.status(200).json({ 
            email,
            data: encodedParams
        })
    });
    