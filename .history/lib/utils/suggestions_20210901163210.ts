import * as namor from 'namor'
import redis from '../

const MANLY = 'manly'
type SaltType = 'string' | 'number' | 'mixed' | undefined

interface NamorOpts {
    words: number;
    saltLength: number;
    saltType: SaltType;
    separator: string | undefined;
    subset?: 'manly' | undefined; 
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
 
function boundify(unboundedNum: number): number {
    return unboundedNum ? Math.max(2, Math.min(unboundedNum,8)) : 3;
}
 
function saltyBelongsTo(saltType: string) {
    return saltType.startsWith('num') ? 'number' : saltType.startsWith('str') ? 'string' : 'mixed';
}


// TODO; Run this promise in a while loop till slugInDb becomes null -> unique slug found
async function suggestRandomUniqueSlug(saltLength: number, numStrings: number, saltType: SaltType, separator: string, isManly: 
    boolean) {
        let suggestion = suggestRandomSlug(saltLength, numStrings, saltType, separator, isManly);
    
        const slugInDb = await redis.get(`slug.${suggestion}.generationDate`)
        return slugInDb ? null : suggestion 
    }
    
export function suggestRandomSlug(saltLength: number = 5, numStrings: number = 2, saltType: SaltType, separator: string | 
    undefined, 
        isManly: boolean = false): string {
            numStrings =  numStrings>8 ? Math.max(numStrings, 8) : numStrings<2 ? 2 : numStrings
        
            let namorOpts: NamorOpts = { words: numStrings, saltLength, saltType, separator }
            if(isManly) namorOpts = { ...namorOpts, subset: `${MANLY}`}
            return namor.generate(namorOpts)
        }
    
    
    