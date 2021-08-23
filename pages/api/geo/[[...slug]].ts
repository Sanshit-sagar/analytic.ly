import { NextApiResponse } from 'next'

import getHandler, { 
    NextApiRequestExtended 
} from '../../../lib/utils/helpers'

import { 
    getUserGeoClickstream,
    getUserGeoClickstreamStats
} from '../../../lib/redis/geo'

const NO_MATCHES_FOUND = 'No Matches found for the given range'
const BAD_REQUEST_INVALID_EMAIL = 'Bad Request, Invalid date format. please use the format: mm-dd-yy'
const BAD_REQUEST_INVALID_MODE = 'Bad Request, Invalid mode provided. please use either more or less'

export default getHandler()
    .get('/api/geo/clicks/user/:email', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        const email = req.params.email

        if(email) {
            try {
                const geodata = await getUserGeoClickstream(email, );
                res.status(200).json({ geodata }) 
            } catch(error) {
                res.status(500).json({ error: `${error.message}` })
            }
        } else {
            res.status(403).json({ error: BAD_REQUEST_INVALID_EMAIL })
        }      
    })
    .get('/api/geo/clicks/user/:email/stats/:mode', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        const email = req.params.email
        const more = req.params.mode.startsWith('more') ? true : false 

        if(email) {
            try {
                const geodata = await getUserGeoClickstreamStats(email, more);
                res.status(200).json({ geodata });
            } catch(error) {
                res.status(500).json({ error: `${error.message}` })
            }
        } else {
            const errorMessage: string = email ? BAD_REQUEST_INVALID_MODE : BAD_REQUEST_INVALID_EMAIL;
            res.status(403).json({ error: errorMessage });
        }      
    });