import { atom } from 'jotai'
import { useAtomValue } from 'jotai/utils'

import {
    destinationResultsAtom,
    expirationResultsAtom,
    passwordResultsAtom,
    utmStrAtom
} from '../atoms/urchins'

const encodedExpiration = atom(
    (get) => {
        let currExpState: string = get(expirationResultsAtom)
        if(currExpState==='reset' || currExpState==='n/a' || currExpState==='error') {
            return ''
        } else {
            return `${currExpState.split(' ')[0]}${currExpState.split(' ').length>2 ? `&exp=${get(expirationResultsAtom)}` : ''}`
        }
    }
)

// TODO: call base64 hex encoder here 
const encodedPasswordAtom = atom(
    (get) => {
        let rawPw = get(passwordResultsAtom)?.length ?? ''
        return rawPw?.length ? rawPw : ''
    }
)

const concatenatedUrlAtom = atom(
    (get) => {
        `${get(destinationResultsAtom)}?${get(utmStrAtom)}&init=${get(encodedExpiration)}&sig=${encodedPasswordAtom}`
    }
)

const useSubmit = () => {
    const { user, loading, error } = useUserAuth()




}