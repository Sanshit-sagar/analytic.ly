import { useState } from 'react'
import { useAsyncList } from '@react-stately/data'
import { Item } from '@react-stately/collections' 

import { ComboBox } from '../../../compositions/ComboBox'
import { Text } from '../../../primitives/Text'

import { useUser } from '@clerk/nextjs'

import {
    seoSourceAtom,
    seoMediumAtom,
    seoTermAtom,
    seoContentAtom,
    seoCampaignAtom
} from '../../../atoms/urchins'
import { useAtom } from 'jotai'

interface IUrchin {
    id: string; 
    name: string; 
    frequency: number; 
    updatedAt: Date;
}

const seoParams: ISeoParameter[] = [
    { id: 'medium', atom: seoMediumAtom },
    { id: 'term', atom: seoTermAtom },
    { id: 'source', atom: seoSourceAtom },
    { id: 'campaign', atom: seoCampaignAtom },
    { id: 'content', atom: seoContentAtom }
]

export const UrchinLists = () => {
    const { emailAddress } = useUser()
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
        <>
        <Text>{emailAddress} </Text> 
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
        </>
    )
   
}


export const AsyncListTest = () => <UrchinLists /> 