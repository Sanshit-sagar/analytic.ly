import React from 'react'

import { useAtomValue } from 'jotai/utils'
import { destinationInputAtom } from '../../../atoms/destination'

import { useSavedDestinations } from '../../../hooks/useSavedCollections'

const Results = () => {
    const { data, loading, error } = useSavedDestinations('concise') 
    const destinationInput = useAtomValue(destinationInputAtom)

    return (
        
    )    

}