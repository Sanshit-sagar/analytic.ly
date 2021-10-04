import React from 'react'

import { useAtomValue } from 'jotai/utils'
import { destinationInputAtom } from '../../../atoms/destination'

import { useFilter } from '@react-aria/i18n'
import { useSavedDestinations } from '../../../hooks/useSavedCollections'

 
const Results = () => {
   
    const destinationInput = useAtomValue(destinationInputAtom)
    
    const { data, loading, error } = useSavedDestinations('concise')

    return (

    );
}