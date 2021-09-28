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
            return `init=${currExpState.split(' ')[0]}${currExpState.split(' ').length>2 ? /exp=${get(expirationResultsAtom)}`
        }
    }
)
const concatenatedUrlAtom = atom(
    (get) => {
        `${}`
    }
)

const useSubmit = () => {
    const { user, loading, error } = useUserAuth()


    const urlResults = useAtomValue(destinationResultsAtom) // TODO: Call a derived atom that takes the url and encodes it
    const expirationResults = useAtomValue(expirationResultsAtom)
    const passwordResults = useAtomValue(passwordResultsAtom)
    const utmResults = useAtomValue(utmStrAtom)


}