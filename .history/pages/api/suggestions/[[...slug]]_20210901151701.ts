import { NextApiResponse } from 'next'
import getHandler, {  
    NextApiRequestExtended 
} from '../../../lib/utils/helpers'

import * as namor from 'namor'

const MANLY_PREFIX = 'manly'

export default getHandler()
    .get('/api/suggestions/random', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        const saltLength: number = parseInt(`${req.params.saltLength}`) || 0
        const numStrings: number = parseInt(`${req.params.numStrings}`) || 0
        const isManly: boolean = req.params.manly

        try {
            let suggestion = suggestRandomSlug(saltLength, numStrings, isManly)
            res.status(200).json({ suggestion })
        } catch(error) {
            res.status(500).json({ error: `Encountered an internal error. ${error.message}` })
        }
    });


function suggestRandomSlug(saltLength: number = 5, numStrings: number = 2, manly: boolean = false) {
    if(!saltLength && !numStrings) {
        return manly ? namor.generate({ subset: 'manly' }) : namor.generate()
    }
    numStrings =  numStrings>5 ? Math.max(numStrings, 8) : numStrings<2 ? 2 : numStrings

    

slug: namor.generate({ words: numStrings, saltLength })
}
}