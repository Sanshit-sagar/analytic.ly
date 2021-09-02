import { NextApiResponse } from 'next'
import getHandler, {  
    NextApiRequestExtended 
} from '../../../lib/utils/helpers'

import * as namor from 'namor'



const BAD_REQUEST = 'BADLY FORMED REQUEST'

export default getHandler()
    .get('/api/slugs/:slug/views', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        const slug: string = req.params.slug