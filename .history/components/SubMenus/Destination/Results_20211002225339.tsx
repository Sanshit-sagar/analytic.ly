import React from 'react'

import { useAtomValue } from 'jotai/utils'
import { destinationInputAtom } from '../../../atoms/destination'

import { useAsyncList } from '@react-stately/data'
import { useFilter } from '@react-aria/i18n'
 
const Results = () => {
   
    const destinationInput = useAtomValue(destinationInputAtom)
    const { data, loading, error } = useDestinations(destinationInput)

    let { contains } = useFilter({ sensitivity: 'base' });

    return (

    );
}