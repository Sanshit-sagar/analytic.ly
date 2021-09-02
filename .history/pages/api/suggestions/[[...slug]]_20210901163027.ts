import { NextApiResponse } from 'next'
import getHandler, {  
    NextApiRequestExtended 
} from '../../../lib/utils/helpers'

import * as namor from 'namor'
import redis from '../../../lib/redis/index'

const MANLY = 'manly'
type SaltType = 'string' | 'number' | 'mixed' | undefined

interface NamorOpts {
    words: number;
    saltLength: number;
    saltType: SaltType;
    separator: string | undefined;
    subset?: 'manly' | undefined; 
}

export default getHandler()
    .get('/api/suggestions/random', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        let saltLength: number = parseInt(`${req.query.saltLength}`) || 0
        let numStrings: number = parseInt(`${req.query.numStrings}`) || 0
        let saltType: SaltType = saltypify(req.query.saltType)
        let separator: string = charify(req.query.separator) 
        let isManly: boolean = req.params.manly || false

        if(numStrings) numStrings = boundify(numStrings)

        try {
            let suggestion = await suggestRandomUniqueSlug(saltLength, numStrings, saltType, separator, isManly)
            res.status(200).json({ suggestion })
        } catch(error) {
            res.status(500).json({ error: `${error.message}` })
        }
    });

// TODO; Run this promise in a while loop till slugInDb becomes null -> unique slug found
async function suggestRandomUniqueSlug(saltLength: number, numStrings: number, saltType: SaltType, separator: string, isManly: boolean) {
    let suggestion = suggestRandomSlug(saltLength, numStrings, saltType, separator, isManly);

    const slugInDb = await redis.get(`slug.${suggestion}.generationDate`)
    return slugInDb ? null : suggestion 
}

























