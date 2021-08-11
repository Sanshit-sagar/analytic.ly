import { NextApiResponse } from 'next'
import { NextApiRequestExtended } from '../../../lib/utils/helpers'
import getHandler from '../../../lib/utils/helpers'

import { getClicksForUser } from '../../../lib/redis/slugs'


export default getHandler()
    .get(async (req: NextApiRequestExtended, res: NextApiResponse) => {
        let useremail: string = req.email || ''
        let userslugs: any[] = await getClicksForUser(useremail);
        
        res.status(200).json({ 
            slugs: [...userslugs],
            userEmail: useremail,
        });
    })
    .post(async (req: NextApiRequestExtended, res: NextApiResponse) => {
        res.status(200).json({ message: 'POST /clicks - Authenticated' });
    })
    .put(async (req: NextApiRequestExtended, res: NextApiResponse) => {
        res.status(200).json({ message: 'PUT /clicks - Authenticated' });
    })
    .delete(async (req: NextApiRequestExtended, res: NextApiResponse) => {
        res.status(405).json({ message: 'Delete is not allowed for /clicks' });
    }); 

