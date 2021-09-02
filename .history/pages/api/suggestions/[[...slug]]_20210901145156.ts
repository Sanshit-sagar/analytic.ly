import { NextApiResponse } from 'next'
import getHandler, {  
    NextApiRequestExtended 
} from '../../../lib/utils/helpers'

import * as namor from 'namor'

function suggestRandomSlug(saltLen: number = 5, numStrings: number = 2, manly: boolean = false) {

    if(!saltLen && !numStrings) {
        return manly ? namor.generate({ subset: 'manly' }) : namor.generate();
    } else {
        saltLen = saltLen || 0;
        numStrings =  numString >  || 3;

        if(numStrings > 5)
    }

}


