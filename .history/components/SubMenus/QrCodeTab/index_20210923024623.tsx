import { useState } from 'react'
import { useAsyncList } from '@react-stately/data'
import { Item } from '@react-stately/collections' 

import { ComboBox } from '../../../compositions/ComboBox'
import { Text } from '../../../primitives/Text'

import { useClerk } from "@clerk/clerk-react";

import {
    seoSourceAtom,
    seoMediumAtom,
    seoTermAtom,
    seoContentAtom,
    seoCampaignAtom
} from '../../../atoms/urchins'
import { WritableAtom, useAtom } from 'jotai'

const useUserSession = () => {
    const { session: activeSession, user: activeUser } = useClerk()
    const { 
        firstName, 
        lastName, 
        primaryEmailAddress, 
        profileImageUrl, 
        publicMetadata, 
    } = activeUser 

    return { firstName, lastName, primaryEmailAddress }
}

interface IUrchin {
    id: string; 
    name: string; 
    frequency: number; 
    updatedAt: Date;
}

const urchinAtoms: { id: string; name: string; atom: WritableAtom<string, React.SetStateAction<string>> }[] = [
    { id: '0', name: 'medium', atom: seoMediumAtom },
    { id: '1', name: 'term', atom: seoTermAtom },
    { id: '2', name: 'source', atom: seoSourceAtom },
    { id: '3', name: 'campaign', atom: seoCampaignAtom },
    { id: '4', name: 'content', atom: seoContentAtom }
]

export const UrchinLists = () => {
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

// "path","id","data","username","emailAddresses","phoneNumbers","externalAccounts","passwordEnabled","firstName","lastName","fullName",
// "primaryEmailAddress","primaryPhoneNumberId","primaryPhoneNumber","profileImageUrl","publicMetadata","unsafeMetadata","updatedAt","createdAt","cachedSessionsWithActivities","


export const AsyncListTest = () => {
    const { primaryEmailAddress } = useUserSession()
    let [url, setUrl] = useState(`api/urchins/user/${primaryEmailAddress}/`)

    return (
        <>
        {urchinAtoms.map((atomicUrchin: ) => {
            let { id, name, atom }: IUrchinAtom = atomicUrchin
            let [value, setValue] = useAtom(atom)

            return (
                <UrchinLists 
                    key={id} 
                    label={name}
                    value={value}
                    setValue={setValue}
                    endpoint={`${url}${name.toLowerCase()}`}
                /> 
            )
        })}
        </>
    )
}


<UrchinLists /> 