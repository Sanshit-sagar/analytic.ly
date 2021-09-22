import { atom } from 'jotai'

const OG_BASE_ENDPOINT = 'https://opengraph.io/api/1.1/site'
const OG_PARAMS = 'accept_lang=en&full_render=false&cache_ok=true&use_proxy=false'
const OG_API_KEY = 'app_id=453a9e17-3d5b-4ad9-90b6-44638ec02cb2'

function isValidUrl(unverifiedInput: string) {
    var VALID_URL_REGEX = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

    return VALID_URL_REGEX.test(unverifiedInput)
}

export const destinationInputAtom = atom('')
export const isTypingDestinationAtom = atom(false)
export const isDestinationInputValidAtom = atom((get) => isValidUrl(get(destinationInputAtom)))
export const destinatioParamsAtom = atom((get) => {
    try {
        const isValid = get(isDestinationInputValidAtom)
        const urlStr = get(destinationInputAtom)

        if(urlStr && isValid) {
            let urlObj = new URL(urlStr);
            return {
                hostname: urlObj.host,
                hash: urlObj.hash,
                origin: urlObj.origin,
                password: urlObj.password,
                protocol: urlObj.protocol,
                port: urlObj.port,
                search: urlObj.search,
                username: urlObj.username,
                pathname: urlObj.pathname
            };
        }
        return null
    } catch(error) {
        return null; 
    }
})


export const encodedDestinationUrlAtom = atom<string | undefined>((get) => {
    return get(isDestinationInputValidAtom) ? encodeURIComponent(get(destinationInputAtom)) : undefined
});

export const openGraphFetchUrlAtom = atom<string | undefined>((get) =>  {
    let isValid = get(isDestinationInputValidAtom);
    return isValid ? `${OG_BASE_ENDPOINT}/${get(encodedDestinationUrlAtom)}?${OG_PARAMS}&${OG_API_KEY}` : undefined
});

const urlValidStrAtom = atom((get) => `${get(isDestinationInputValidAtom) ? 'ye' : 'ne'}`)
export const destinationResultsAtom = atom(
    (get) => `${get(destinationInputAtom).substring(0,20)}`
);
