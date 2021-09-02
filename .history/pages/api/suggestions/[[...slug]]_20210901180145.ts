import { NextApiResponse } from 'next'
import getHandler, {  
    NextApiRequestExtended 
} from '../../../lib/utils/helpers'

import {
    suggestRandomUniqueSlug,
    boundify,
    charify,
    saltypify,
    SaltType
} from '../../../lib/utils/suggestions'

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
    })
    .get('/api/suggestions/custom', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        let separator = charify(req.query.separator) 
        let lang = 'en'
        let symbols = []
        let maintainCase = false
        let titleCase = false
        let truncate = false
        let uric = false
        let uricNoSlash = false
        let mark = false

        try {
            let suggestion = await generateCustomizedSlug(separator, lang, symbols, maintainCase, titleCase, truncate, uric, uricNoSlash, mark, wordsTo)
        }
    });


























