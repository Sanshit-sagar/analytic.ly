// @ts-ignore
import * as getSlug from 'speakingurl-add-korean'

interface Dictionary<T> {
    [x: string]: T;
}

interface SpeakingURLOptions {
    separator?: string | undefined;
    lang?: string|boolean | undefined;
    symbols?: boolean | undefined;
    maintainCase?: boolean | undefined;
    titleCase?: string[]|boolean | undefined;
    truncate?: number | undefined;
    uric?: boolean | undefined;
    uricNoSlash?: boolean | undefined;
    mark?: boolean | undefined;
    custom?: string[]|Dictionary<string> | undefined;
} 

export function slugifyString(userInputUrl: string, options: SpeakingURLOptions) {
    const slugifiedString: string = getSlug(userInputUrl, options)
}

const REGEXES = [
    {
         name: 'alphanumeric', 
         regex: /0-9a-zA-Z/,
         additions: [],
         description: 'Alphabets (uppercase and lowercase) and single digits (0-9).', 
         source: '' 
    }, { 
        name: 'uric',
        regex: /0-9a-zA-Z/,
        additions: [";", "?", ":", "@", "&", "=", "+", "$", ",", "/"],
        description: 'Additionally allows characters that are used as delimitters in URIs and the separator',
        source: 'https://datatracker.ietf.org/doc/html/rfc2396' 
    }, {
        name: 'uricNoSlash',
        regex: /0-9a-zA-Z/,
        additions: [";", "?", ":", "@", "&", "=", "+", "$", ","],
        description: 'Additionally allows characters that are used as delimitters in URIs without the Slash character and the separator',
        source: 'https://datatracker.ietf.org/doc/html/rfc2396'
    }, {
        name: 'mark',
        regex: /0-9a-zA-Z/,
        additions: [ "-", "_", ".", "!", "~", "*", "'", "(", ")"],
        description: 'Additionally allows some punctuation and the separator', 

    }
];

let allowedChars = [
    { id: 0, regex: 
]
    
interface IRawOptions { 
    separator?: string | undefined; 
    symbols: boolean | undefined; 
    lang?: string | undefined; 
    maintainCase?: boolean | undefined; 
    truncate?: number | undefined; 
    titleCase: boolean; 
    wordsToMantainCaseFor: string[];
    
}

export function normalizeOptions(rawOptions: IRawOptions) {
    const hasOmittedWords: boolean = rawOptions.wordsToMantainCaseFor?.length > 0 ? true : false
    const normalizedTitleCase: string[] | boolean | undefined = rawOptions.titleCase || (hasOmittedWords && [...rawOptions.wordsToMantainCaseFor]) || undefined,
    
    const normalizedOptions: SpeakingURLOptions = {
        ...rawOptions,
        titleCase: normalizedTitleCase,
        symbols: false,
        lang: 'en',
        uric: rawOptions.uric || false,
        
    }
    return normalizedOptions
}
    