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
} from '../../../lib/utils/suggestions/random'
import { 
    normalizeOptions,
    SpeakingURLOptions,
    slugifyString
} from '../../../lib/utils/suggestions/custom'

const BAD_INPUT_NO_SLUG_PROVIDED = 'Bad Request. Invalid userInput - could not slugify. Please provide a valid string for the parameter userInput'

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
            res.status(500).json({ error })
        }
    })
    .get('/api/suggestions/custom', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        let userInput: string | string[] = req.query.userInput || ''
        let separator = charify(req.query.separator) || '-'

        if(userInput && typeof(userInput)!=='string')  userInput = userInput.join('')
    
        let symbols = false, 
            maintainCase = false, 
            titleCase = false, 
            uric = false, 
            uricNoSlash = false, 
            mark = false
        let wordsToMantainCaseFor: string[] = [], truncate = undefined, lang = 'en'

        if(userInput) {
            try {
                let speakingUrlOpts: SpeakingURLOptions = await normalizeOptions({ 
                    separator, 
                    lang,
                    symbols, 
                    wordsToMantainCaseFor, 
                    maintainCase, 
                    titleCase, 
                    truncate, 
                    uric, 
                    uricNoSlash,  
                    mark 
                }); 
                let slugifiedInput = slugifyString(userInput, speakingUrlOpts);
                res.status(200).json({ slugifiedInput })
            } catch(error) {
                res.status(500).json({ error })
            }
        } else {
            res.status(403).json({ error: BAD_INPUT_NO_SLUG_PROVIDED })
        }
    });


























