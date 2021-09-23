import { useState } from 'react'
import { useAsyncList } from '@react-stately/data'
import { ComboBox } from '../../../compositions/ComboBox'
import { Item } from '@react-stately/collections'


    let list = useAsyncList({
        async load({signal, filterText}) {
          let res = await fetch(
            `https://swapi.dev/api/people/?search=${filterText}`,
            {signal}
          );
          let json = await res.json();
      
          return {
            items: json.results
          };
        }
    });

    return 
}