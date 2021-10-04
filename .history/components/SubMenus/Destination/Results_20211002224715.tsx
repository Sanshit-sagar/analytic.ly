import React from 'react'

import { useAtomValue } from 'jotai/utils'
import { destinationInputAtom } from '../../../atoms/destination'

import { useAsyncList } from '@react-stately/data'

const Results = () => {
   
    const destinationInput = useAtomValue(destinationInputAtom)

    let list = useAsyncList({
        async load({ signal }) {
            let res = await fetch(destinationEndpoint, { signal })
            let json = await res.json()

            return {
                items: json.results,
                cursor: json.next
            };
        }
    });

    return (

    )    
}