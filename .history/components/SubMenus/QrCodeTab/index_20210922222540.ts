import { useState } from 'react'
import { useAsyncList } from '@react-stately/data'
import { ComboBox } from '../../../compositions/ComboBox'
import { Item } from '@react-stately/collections'

export const AsyncListTest = () => {
    let [url, setUrl] = useState(`api/urchins/user/sanshit.sagar@gmail.com/medium`)

    let list = useAsyncList({
        async load({signal, cursor}) {
          let res = await fetch(cursor || url, { signal });
          let json = await res.json();
          return {
            items: json.results,
            cursor: json.next
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