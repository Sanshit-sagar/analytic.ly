import { NextApiResponse } from 'next'

import getHandler, {  
    NextApiRequestExtended 
} from '../../../lib/utils/helpers'




export default getHandler()
    .get('/api/urchins/user/:email', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        
    });