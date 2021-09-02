// @ts-ignore
import * as getSlug from 'speakingurl-add-korean'

interface Dictionary<T> {
    [x: string]: T;
}

export interface REGEX_DEF {
    name: string; 
    regex: string;
    additions: string[];
    description: string; 
    source: string | undefined; 
}

export interface IRawOptions { 
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

export interface SpeakingURLOptions {
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
export function normalizeOptions(rawOptions: IRawOptions): SpeakingURLOptions {
    const hasOmittedWords: boolean = rawOptions.wordsToMantainCaseFor?.length > 0 ? true : false
    
    let normalizedTitleCase: string[] | boolean | undefined = rawOptions.titleCase
    normalizedTitleCase = normalizedTitleCase || (hasOmittedWords && [...rawOptions.wordsToMantainCaseFor]) || undefined;
    
    const normalizedOptions: SpeakingURLOptions = {
        ...rawOptions,
        titleCase: normalizedTitleCase,
        symbols: false,
        lang: 'en',
        truncate: rawOptions.truncate || undefined,
        uric: rawOptions.uric || false,
        uricNoSlash: rawOptions.uricNoSlash || false,
        mark: rawOptions.mark || false,
        custom: undefined,
    };
    return normalizedOptions
}

export function slugifyString(userInputUrl: string, options: SpeakingURLOptions): string {
    const slugifiedString: string = getSlug(userInputUrl, options)
    return slugifiedString;
}

export const REGEXES: REGEX_DEF[] = [{
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
        description: 'Additionally allows chars that are used as delimitters in URIs w/o the Slash character and separator',
        source: 'https://datatracker.ietf.org/doc/html/rfc2396'
    }, {
        name: 'mark',
        regex: /0-9a-zA-Z/,
        additions: [ "-", "_", ".", "!", "~", "*", "'", "(", ")"],
        description: 'Additionally allows some punctuation and the separator', 
    },
];