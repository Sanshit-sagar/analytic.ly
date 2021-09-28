import { NextApiResponse } from 'next'
import getHandler, {  NextApiRequestExtended } from '../../../lib/utils/helpers'

interface EncodedBody {

};

interface IExpiry {
    immortal: boolean;
    start? 
}

interface IUrchins {
    source:  string | undefined; 
    medium:  string | undefined; 
    term:  string | undefined; 
    content: string | undefined; 
    campaign: string | undefined,
    otherUrchins: string[] | undefined; 
}

interface DecodedBody {
    url: string; 
    slug: string; 
    expiry: IExpiry; 
    urchins: IUrchins;
    password: IPassword; 
    encodedUrl: string; 
}; 

export default getHandler()
    .get('/api/echinos/new/:email', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        let email = req.params.email
        let encodedParams = req.body.url

        let 

        res.status(200).json({ 
            email,
            data: reqBody
        })
    })


// import { requireSession } from '@clerk/nextjs/api'
 // .get('/api/echinos/new/:email', requireSession(async (req: NextApiRequestExtended, res: NextApiResponse) => {
        // let userId = req?.params?.userId 