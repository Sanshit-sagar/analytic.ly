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
        const saltLength: number = parseInt(`${req.query.saltLength}`) || 0
        const numStrings: number = parseInt(`${req.query.numStrings}`) || 0
        const saltType: SaltType = saltypify(req.query.saltType)
        const separator: string = charify(req.query.separator) 
        const isManly: boolean = req.params.manly || false

        console.log(`saltLength: ${saltLength} -- numStrings: ${numStrings} -- isManly: ${isManly}`)

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


function suggestRandomSlug(saltLength: number = 5, numStrings: number = 2, saltType: SaltType, separator: string | undefined, isManly: boolean = false) {
    numStrings =  numStrings>8 ? Math.max(numStrings, 8) : numStrings<2 ? 2 : numStrings

    let namorOpts: NamorOpts = { words: numStrings, saltLength, saltType, separator }
    if(isManly) namorOpts = { ...namorOpts, subset: `${MANLY}`}
    return namor.generate(namorOpts)
}

function charify(separatorInput: string | string[] | null | undefined): string {
    return separatorInput?.length 
            ? typeof(separatorInput)==='string' 
            ? separatorInput.charAt(0) 
            : separatorInput.join('').charAt(0)
            : '-'
}

function saltypify(saltTypeInput: string | string[] | null | undefined): SaltType {
    return saltTypeInput?.length 
            ? typeof(saltTypeInput)==='string' 
            ? saltyBelongsTo(saltTypeInput) 
            : saltyBelongsTo(saltTypeInput.join('')) 
            : 'mixed'
}

function boundify(unboundedNum: number) {
    return numStrings && typeof(parseInt(numStrings))==='number' ?  Math.max(2, Math.min(numStrings,8)
    } else {
        return 3;
    }
}

function saltyBelongsTo(saltType: string) {
    return saltType.startsWith('num') ? 'number' : saltType.startsWith('str') ? 'string' : 'mixed';
}