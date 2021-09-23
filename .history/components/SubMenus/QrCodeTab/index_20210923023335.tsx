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
import { useAtom } from 'jotai'

const useUserSession = () => {
    const { session: activeSession, user: activeUser } = useClerk()
    const { 
        data, 
        username, 
        firstName, 
        lastName, 
        fullName, 
        primaryEmailAddressId, 
        primaryEmailAddress, 
        primaryPhoneNumberId, 
        primaryPhoneNumber, 
        profileImageUrl, 
        publicMetadata, 
        unsafeMetadata 
    } = activeUser 

    return { firstName, lastName, primaryEmailAddress }
}

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
    const { firstName, lastName, primaryEmailAddress, primaryPhoneNumber, data } = useUserSession()
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
        <Text 
            size='2' 
            css={{ 
                color: '$text', 
                maxWidth: '500px', 
                display: 'flex', 
                fd: 'column', 
                flexWrap: 'wrap', 
                jc: 'flex-start', 
                ai: 'flex-start' 
            }}
        > 
           {firstName} | {lastName} | {primaryEmailAddress.emailAddress} | {JSON.stringify(primaryPhoneNumber)}
        </Text> 

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

// "path","id","data","username","emailAddresses","phoneNumbers","externalAccounts","passwordEnabled","firstName","lastName","fullName",
// "primaryEmailAddress","primaryPhoneNumberId","primaryPhoneNumber","profileImageUrl","publicMetadata","unsafeMetadata","updatedAt","createdAt","cachedSessionsWithActivities","


export const AsyncListTest = () => <UrchinLists /> 