import { NextApiResponse } from 'next'

import getHandler, {  
    NextApiRequestExtended 
} from '../../../lib/utils/helpers'


// ADD: GET /api/seo/user/:email/[all, recent, top/[source, medoum,term,campaign, all/*]

export default getHandler()
    .get('/api/urchins/user/:email', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        
    });