import React from 'react'

import { useAtomValue } from 'jotai/utils'
import { destinationInputAtom } from '../../../atoms/destination'

import { useAsyncList } from '@react-stately/data'
import { useFilter } from '@react-aria/i18n'
 
const Results = () => {
   
    const destinationInput = useAtomValue(destinationInputAtom)
    const destinationEndpoint = `/api/configs/destinations/concise`

    let list = useAsyncList({
        async load({ signal }) {
            let res = await fetch(destinationEndpoint, { signal })
            let json = await res.json()

            return {
                items: json.results
            }
        },
    });

    let { contains } = useFilter({ sensitivity: 'base' });

    return (

    )    
}