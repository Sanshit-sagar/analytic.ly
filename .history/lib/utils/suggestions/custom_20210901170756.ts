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
    

export function normalizeOptions()
    