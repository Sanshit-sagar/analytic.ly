import React from 'react'

import { useAtomValue } from 'jotai/utils'
import { destinationInputAtom } from '../../../atoms/destination'

import { useAsyncList } from '../../../hooks/useSavedCollections'

const Results = () => {
   
    const destinationInput = useAtomValue(destinationInputAtom)

    let list = useAsyncList({
        async load({signal, cursor}) {
          // If no cursor is available, then we're loading the first page.
          // Otherwise, the cursor is the next URL to load, as returned from the previous page.
          let res = await fetch(cursor || 'https://pokeapi.co/api/v2/pokemon', {
            signal
          });
          let json = await res.json();
          return {
            items: json.results,
            cursor: json.next
          };
        }
    });

    return (

    )    
}