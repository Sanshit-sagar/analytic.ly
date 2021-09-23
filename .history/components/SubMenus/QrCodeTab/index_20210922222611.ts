import { useState } from 'react'
import { useAsyncList } from '@react-stately/data'
import { ComboBox } from '../../../compositions/ComboBox'
import { Item } from '@react-stately/collections'

export const AsyncListTest = () => {
    let [url, setUrl] = useState(`api/urchins/user/sanshit.sagar@gmail.com/medium`)

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

    return (
    
        <ComboBox
            label={'testing'} 
            items={list.items}
            isLoading={list.isLoading}
            onLoadMore={list.loadMore}
        >
            {(item) => <Item key={item.name}>{item.name}</Item>}
        </ComboBox>
    )
}