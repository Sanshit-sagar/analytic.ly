import { useState } from 'react'
import { useAsyncList } from '@react-stately/data'
import { ComboBox } from '../../../compositions/ComboBox'
import { Item } from '@react-stately/collections' 
import { Text } from '../../../primitives/Text'

import {
    seoSourceAtom,
    seoMediumAtom,
    seoTermAtom,
    seoContentAtom,
    seoCampaignAtom
} from '../../../hooks/'

interface IUrchin {
    id: string; 
    name: string; 
    frequency: number; 
    updatedAt: Date;
}

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

    return (
        <ComboBox
            label={'Async list'}
            items={list.items}
            inputValue={list.filterText}
            onInputChange={list.setFilterText}
            loadingState={list.loadingState}
            onLoadMore={list.loadMore}
        >
            {(item: IUrchin) => (
                <Item key={item.name}>
                    <Text size='1'> {item.name} ({item.frequency}) </Text>
                </Item>
            )}
        </ComboBox>
    )
   
}


export const AsyncListTest = () => <AsyncListTest2 /> 