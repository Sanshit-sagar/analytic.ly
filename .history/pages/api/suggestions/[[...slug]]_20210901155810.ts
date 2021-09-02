import { NextApiResponse } from 'next'
import getHandler, {  
    NextApiRequestExtended 
} from '../../../lib/utils/helpers'

import * as namor from 'namor'
import redis from '../../../lib/redis/index'

const MANLY = 'manly'

export default getHandler()
    .get('/api/suggestions/random', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        const saltLength: number = parseInt(`${req.query.saltLength}`) || 0
        const numStrings: number = parseInt(`${req.query.numStrings}`) || 0
        const saltType: string = saltypify(req.query.saltType) || 'mixed'
        const separator: string = charify(req.query.separator) || '-'
        const isManly: boolean = req.params.manly || false

        console.log(`saltLength: ${saltLength} -- numStrings: ${numStrings} -- isManly: ${isManly}`)

        try {
            let suggestion = await suggestRandomUniqueSlug(saltLength, numStrings, isManly)
            res.status(200).json({ suggestion })
        } catch(error) {
            res.status(500).json({ error: `${error.message}` })
        }
    });

// TODO; Run this promise in a while loop till slugInDb becomes null -> unique slug found
async function suggestRandomUniqueSlug(saltLength: number, numStrings: number, isManly: boolean) {
    let suggestion = suggestRandomSlug(saltLength, numStrings, isManly);

    const slugInDb = await redis.get(`slug.${suggestion}.generationDate`)
    return slugInDb ? null : suggestion 
}

function suggestRandomSlug(saltLength: number = 5, numStrings: number = 2, isManly: boolean = false) {
    if(!saltLength && !numStrings) return isManly ? namor.generate({ subset: `${MANLY}` }) : namor.generate()

    numStrings =  numStrings>5 ? Math.max(numStrings, 8) : numStrings<2 ? 2 : numStrings
    return namor.generate({ words: numStrings, saltLength });
}

function charify(separatorInput: string | string[] | null | undefined) {
    return separatorInput?.length ? separatorInput.charAt(0) : ''
}

function saltypify(saltTypeInput: string | string[] | null | undefined) {
    return saltTypeInput?.length ? 
            typeof(saltTypeInput)==='string' ? saltyBelongsTo(saltTypeInput) : saltyBelongsTo(saltTypeInput.join('') : 'mixed'
}

function saltyBelongsTo(saltType: string | string[]) {
    return saltType.startsWith('num') ? 'number' : saltType.startsWith('str') ? 'string' : 'mixed';
}