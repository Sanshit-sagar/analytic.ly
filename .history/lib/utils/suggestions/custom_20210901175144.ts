// @ts-ignore
import * as getSlug from 'speakingurl-add-korean'

interface Dictionary<T> {
    [x: string]: T;
}

interface REGEX_DEF {
    name: string; 
    regex: string;
    additions: string[];
    description: string; 
    source: string | undefined; 
}

interface IRawOptions { 
    separator?: string | undefined; 
    symbols: boolean | undefined; 
    lang?: string | undefined; 
    maintainCase?: boolean | undefined; 
    truncate?: number | undefined; 
    titleCase: boolean; 
    wordsToMantainCaseFor: string[];
    uric: boolean | undefined;
    uricNoSlash: boolean | undefined;
    mark: boolean | undefined; 
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


// map: titlecase + wordsToMantainCaseFor from user 
//      uric, uricNoSlash, mark as well, truncate, separator as well
// symbols always off
// lang - 'en' as default for now till i18n is set up further
// dictionary - undefined for now 
export function normalizeOptions(rawOptions: IRawOptions) {
    const hasOmittedWords: boolean = rawOptions.wordsToMantainCaseFor?.length > 0 ? true : false
    let normalizedTitleCase: string[] | boolean | undefined = rawOptions.titleCase
    normalizedTitleCase  ||= (hasOmittedWords && [...rawOptions.wordsToMantainCaseFor]) || undefined;
    
    const normalizedOptions: SpeakingURLOptions = {
        ...rawOptions,
        titleCase: normalizedTitleCase,
        symbols: false,
        lang: 'en',
        uric: rawOptions.uric || false,
        uricNoSlash: rawOptions.uricNoSlash || false,
        mark: rawOptions.mark || false,
        custom: undefined,
    };
    return normalizedOptions
}

export function slugifyString(userInputUrl: string, options: SpeakingURLOptions) {
    const slugifiedString: string = getSlug(userInputUrl, options)
}

const REGEXES: REGEX_DEF[] = [
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