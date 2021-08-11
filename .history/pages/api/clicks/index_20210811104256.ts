import { NextApiResponse } from 'next'
import { NextApiRequestExtended } from '../../../lib/utils/helpers'
var parser = require('ua-parser');

import getHandler from '../../../lib/utils/helpers'
import redis from '../../../lib/redis'

// function formatSlugs(unformattedSlugs: any[]) {
//     let userslugs: any[] = []; 

//     unformattedSlugs.map(function(value: any, index: number) {
//         let sluginfo = JSON.parse(value);
//         userslugs.push({
//             slug: sluginfo,
//             index,
//         });
//     });

//     return userslugs; 
// }
import { getClicksForUser } from '../../../lib/redis/slugs'


export default getHandler()
    .get(async (req: NextApiRequestExtended, res: NextApiResponse) => {
        let useremail: string = req.email || ''
        let userslugs: any[] = await getClicksForUser(useremail);
        res.status(200).json({ slugs: [...userslugs] });
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

