import { NextApiResponse } from 'next'
import getHandler, {  
    NextApiRequestExtended 
} from '../../../lib/utils/helpers'

import * as namor from 'namor'


const BAD_REQUEST = 'BADLY FORMED REQUEST'

export default getHandler()
    .get('/api/suggestions/:saltLength/:numStrings/:subset', async (req: NextApiRequestExtended, res: NextApiResponse) => {
        const saltLength: string = req.params.saltLength
        const numStrings: string = req.params.numStrings
        const subset: string = req


    });


function suggestRandomSlug(saltLength: number = 5, numStrings: number = 2, manly: boolean = false) {
    if(!saltLength && !numStrings) {
        return manly ? namor.generate({ subset: 'manly' }) : namor.generate()
    }
    numStrings =  numStrings>5 ? Math.max(numStrings, 5) : numStrings<2 ? 2 : numStrings
    return namor.generate({ words: numStrings, saltLength })
}