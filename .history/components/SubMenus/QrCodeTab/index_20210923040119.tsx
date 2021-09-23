import { useState, useEffect } from 'react'
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

interface UrchinAtom  { 
    id: string; 
    name: string; 
    atom: WritableAtom<string, React.SetStateAction<string>> 
}; 

const urchinAtoms: UrchinAtom[] = [
    { id: '0', name: 'medium', atom: seoMediumAtom },
    { id: '1', name: 'term', atom: seoTermAtom },
    { id: '2', name: 'source', atom: seoSourceAtom },
    { id: '3', name: 'campaign', atom: seoCampaignAtom },
    { id: '4', name: 'content', atom: seoContentAtom }
]

export const UrchinLists = ({ 
    key, 
    label, 
    value, 
    setValue, 
    url 
}: { 
    key: string; 
    label: string; 
    value: string; 
    setValue: (v: string) => void; 
    url: string; 
}) => {
    let endpoint = `${url}/${label}`

    let list = useAsyncList({
        async load({signal, cursor}) {
          let res = await fetch(cursor || endpoint, { signal });
          let json = await res.json();
          return { 
            items:  !json?.results ? [] : json.results,
            cursor: !json?.next ? null : json.next
          };
        }
    });
    

    return (
        <ComboBox
            key={key}
            label={label}
            items={list.items}
            inputValue={list.filterText}
            onInputChange={(updatedInput: string) => {
                list.setFilterText(updatedInput)
                setValue(updatedInput)
            }}
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

    let [url, setUrl] = useState(`api/urchins/user`)

    useEffect(() => {
        if(primaryEmailAddress?.length) {
            setUrl(`${url}/${primaryEmailAddress}`)
        }
    }, [primaryEmailAddress])

    return (
        <>
            {urchinAtoms.map((atomicUrchin: UrchinAtom) => {
                let { id, name, atom }: UrchinAtom = atomicUrchin
                let [value, setValue] = useAtom(atom)

                return (
                    <UrchinLists 
                        key={id} 
                        label={name}
                        value={value}
                        setValue={setValue}
                        url={`${url}${name.toLowerCase()}`}
                    /> 
                )
            })}
        </>
    )
}