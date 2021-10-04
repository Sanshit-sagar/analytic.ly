import React from 'react'

import { useAtomValue } from 'jotai/utils'
import { destinationInputAtom } from '../../../atoms/destination'

import { useAsyncList } from '@react-stately/data'

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
        sort({items, sortDescriptor}) {
            return {
              items: items.sort((a, b) => {
                // Compare the items by the sorted column
                let cmp = a[sortDescriptor.column] < b[sortDescriptor.column] ? -1 : 1;
        
                // Flip the direction if descending order is specified.
                if (sortDescriptor.direction === 'descending') {
                  cmp *= -1;
                }
        
                return cmp;
              })
            };
          }
    });



    return (

    )    
}