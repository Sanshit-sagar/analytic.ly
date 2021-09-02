import { NextApiResponse } from 'next'
import getHandler, {  
    NextApiRequestExtended 
} from '../../../lib/utils/helpers'

import * as namor from 'namor'
import redis from '../../../lib/redis/index'

const MANLY_PREFIX = 'manly'

export default getHandler()
    .get('/api/suggestions/random', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        const saltLength: number = parseInt(`${req.query.saltLength}`) || 0
        const numStrings: number = parseInt(`${req.query.numStrings}`) || 0
        const isManly: boolean = req.params.manly || false

        console.log(`saltLength: ${saltLength} -- numStrings: ${numStrings} -- isManly: ${isManly}`)

        try {
            let suggestion = suggestRandomUniqueSlug(saltLength, numStrings, isManly)
            res.status(200).json({ suggestion })
        } catch(error) {
            res.status(500).json({ error: `Encountered an internal error. ${error.message}` })
        }
    });

async function suggestRandomUniqueSlug(saltLength: number, numStrings: number, isManly: boolean) {
    let suggestedRandomSlug = suggestRandomSlug(saltLength, numStrings, isManly);
    await redis.hget(`slug.${suggestedRandomSlug}`).then((response) => {
        if(response===null) {} 
    })
}

function suggestRandomSlug(saltLength: number = 5, numStrings: number = 2, isManly: boolean = false) {
    if(!saltLength && !numStrings) return isManly ? namor.generate({ subset: 'manly' }) : namor.generate()

    numStrings =  numStrings>5 ? Math.max(numStrings, 8) : numStrings<2 ? 2 : numStrings
    return namor.generate({ words: numStrings, saltLength });
}