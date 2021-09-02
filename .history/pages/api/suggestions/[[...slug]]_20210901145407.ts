import { NextApiResponse } from 'next'
import getHandler, {  
    NextApiRequestExtended 
} from '../../../lib/utils/helpers'

import * as namor from 'namor'

function suggestRandomSlug(saltLen: number = 5, numStrings: number = 2, manly: boolean = false) {

    if(!saltLen && !numStrings) {
        return manly ? namor.generate({ subset: 'manly' }) : namor.generate();
   
    numStrings =  numStrings>5 ? Math.max(numStrings, 5) : numStrings<2 ? 2 : numStrings; 

    return namor.generate({ words: numStrings, saltLength: saltLen })
}


