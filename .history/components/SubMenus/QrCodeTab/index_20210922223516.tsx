import { useState } from 'react'
import { useAsyncList } from '@react-stately/data'
import { ComboBox } from '../../../compositions/ComboBox'
import { Item } from '@react-stately/collections' 


export const AsyncListTest2 = () => {
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

    return <Text>{JSON.stringify(list.items)} </Text> 

    // return (
    //     <ComboBox
    //         label={'Async list'}
    //         items={list.items}
    //         inputValue={list.filterText}
    //         onInputChange={list.setFilterText}
    //         loadingState={list.loadingState}
    //         onLoadMore={list.loadMore}
    //     >
    //         {(item: string, i: number) => (
    //             <Item key={JSON.stringify(item)}>
    //                 {JSON.stringify(item)}
    //             </Item>
    //         )}
    //     </ComboBox>
    // )
   
}


export const AsyncListTest = () => <AsyncListTest2 /> 