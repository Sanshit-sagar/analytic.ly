import { NextApiResponse } from 'next'
import getHandler, {  
    NextApiRequestExtended 
} from '../../../lib/utils/helpers'

import * as namor from 'namor'


const BAD_REQUEST = 'BADLY FORMED REQUEST'
const MANLY_PREFIX = 'manly'

export default getHandler()
    .get('/api/suggestions/:saltLength/:numStrings/:subset', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        const saltLength: number = parseInt(`${req.params.saltLength}`);
        const numStrings: number = parseInt(`${req.params.numStrings}`);
        const subset: string = req.params.subset

        try {
            const isManly = subset.startsWith(MANLY_PREFIX); 
            let suggestion = suggestRandomSlug(saltLength, numStrings, isManly)
            res.status(200).json({ suggestion })
        }
    });


function suggestRandomSlug(saltLength: number = 5, numStrings: number = 2, manly: boolean = false) {
    if(!saltLength && !numStrings) {
        return manly ? namor.generate({ subset: 'manly' }) : namor.generate()
    }
    numStrings =  numStrings>5 ? Math.max(numStrings, 5) : numStrings<2 ? 2 : numStrings
    return namor.generate({ words: numStrings, saltLength })
}