import { atom } from 'jotai'

import {
    destinationResultsAtom 
} from '../../'

const useSubmit = () => {
    const { user, loading, error } = useUserAuth()


    const urlResults = useAtomValue(destinationResultsAtom) // TODO: Call a derived atom that takes the url and encodes it
    const expirationResults = useAtomValue(expirationResultsAtom)
    const passwordResults = useAtomValue(passwordResultsAtom)
    const utmResults = useAtomValue(utmStrAtom)


}