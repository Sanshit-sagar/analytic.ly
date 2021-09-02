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

const REGEXES = {  
    {
         name: 'alphanumeric', 
         regex: /0-9a-zA-Z/,
         additions: [],
         description: 'Alphabets (uppercase and lowercase) and single digits (0-9).', 
         source: '' 
    }, { 
        name: 'uric',
        regex: /0-9a-zA-Z/,
        additions: [''],
        description: 'Characters that are used as delimitters in URIs',
        source: 'https://datatracker.ietf.org/doc/html/rfc2396' 
    }, {
        name: 'uricNoSlash',
        regex: /0-9a-zA-Z/,
        description: 'Characters that are used as delimitters in URIs without the Slash character',
        source: 'https://datatracker.ietf.org/doc/html/rfc2396'
    }, {
        name: 'mark',
        regex: /0-9a-zA-Z/,
        description: 'Additionally allows ', 

    }
};

let allowedChars = [
    { id: 0, regex: 
]
    

export function normalizeOptions(rawOptions: { separator?: string | undefined; lang?: string | undefined; maintainCase?: boolean | undefined; truncate?: number | undefined;  })
    