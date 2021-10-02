import { mutate } from 'swr'
import { useSavedSlugs } from '../../hooks/useSavedCollections'

import { atom } from 'jotai'
import { useAtomValue } from 'jotai/utils'

import { passwordAtom } from '../../atoms/password'
import { suggestedSlugAtom } from './Slug/SlugTab'
import { destinationInputAtom } from '../../atoms/destination'
import { expirationTimestmapsAtom } from '../../atoms/expiration'

import { TextField } from '../../primitives/TextField'


export type SizeType = 'small' | 'large' | undefined 
export type ApiResponse = { 
    data: any | null; 
    error: Error | null; 
};

function getJsonHeaders() {
    const newHeaders = new Headers()
    newHeaders.append('Content-Type', 'application/json')
    return newHeaders
}

interface PublishProps {
    url: string;
    slug: string;
    password: string;
    expiration: string;
    destination: string;
}


export const searchParamsAtom = atom(new URLSearchParams(''))
export const appendSearchParamsAtom = atom(
    null,
    (get, set, update: { param: string; value: string; }) => {
        let paramsCopy = get(searchParamsAtom)
        paramsCopy.set(update.param, update.value)
        set(searchParamsAtom, paramsCopy) 
    }
);
export const deleteSearchParamsAtom = atom(
    null,
    (get, set, update: { param: string; }) => {
        let paramsCopy = get(searchParamsAtom)
        paramsCopy.delete(update.param) 
        set(searchParamsAtom, paramsCopy)
    }
)
export const updateSearchParamsAtom = atom(
    null,
    (_get, set, update: { param: string; value: string | undefined; action: 'append' | 'delete' }) => {
        if(update.action==='append') {
            if(update && update?.value!==undefined && update?.value?.length) {
                set(appendSearchParamsAtom, { param: update.param, value: update.value });
            } else {
                set(deleteSearchParamsAtom, { param: update.param }); 
            }
        } else {
            set(deleteSearchParamsAtom, { param: update.param });
        }
    }
)


export const destination = () => {
    const destination = useAtomValue(destinationInputAtom)
    return !destination?.length ? '' : `${destination}`
}

export const expiration = () => {
    const exp = useAtomValue(expirationTimestmapsAtom)
    return !exp ? '' : `&${exp}`
}

export const password = () => {
    const password = useAtomValue(passwordAtom)
    return !password?.length ? '' : `&sig=${password}`
}

export const suggestion = () => {
    const suggestion = useAtomValue(suggestedSlugAtom)
    return suggestion?.length ? suggestion : ''
}

export const seoParamsStringAtom = atom(
    (get) => {
        return get(searchParamsAtom).toString()
    },
    (_get, set, update: string) => {
        let clone = new URLSearchParams(update)
        set(searchParamsAtom, clone)
    }
)

export const fullUrlAtom = atom(
    (get) =>  {
        return `${get(destinationInputAtom)}/${get(seoParamsStringAtom)}${get(expirationTimestmapsAtom)}${get(passwordAtom)}`
    }
);

const POST_ENDPOINT = `/api/config/new`
const GET_ENDPOINT = '/api/configs/list'


export const publish = async (props: PublishProps)  => {
    const { slugs } = useSavedSlugs()

    mutate(GET_ENDPOINT, [ ...slugs, props.slug ], false); 

    const response = await fetch(POST_ENDPOINT, {
        method: 'POST',
        headers: getJsonHeaders(), 
        body: JSON.stringify({ data: { ...props }})
    })

    const { data, error }: ApiResponse = await response.json() 
    if(!error) {
        mutate(GET_ENDPOINT, data);
}

export const FullUrl = ({ size }: { size?: SizeType }) => {
    let fullUrl = useAtomValue(fullUrlAtom)

    return (
        <TextField 
            size='1' 
            type='url'
            value={fullUrl} 
            placeholder='www.example.com'
            disabled={true}
            css={{ 
                mt: (size && size==='small') ?'$3' : 0,
                width: (size && size==='small') ? 450 : 600,
                border: '1px solid $border',
                '&:hover': {
                    borderColor: '$border3'
                }
            }}
        />
    ); 
}