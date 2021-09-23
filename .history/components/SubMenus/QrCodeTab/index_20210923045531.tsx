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
import { Flex } from '../../../primitives/Flex'
import { MenuTriggerActionEnum } from '../../../compositions/interfaces'
import { WritableAtom, useAtom } from 'jotai'

// interface UserResouce {
//     firstName: string | null;
//     lastName: string | null;
//     primaryEmailAddress: string;
// }

const useUserSession = () => {
    const { user: activeUser } = useClerk()

    const { 
        firstName, 
        lastName, 
        primaryEmailAddress
    } = activeUser 

    return { firstName, lastName, primaryEmailAddress }
}

interface IUrchin {
    id: string; 
    name: string; 
    frequency: number; 
    updatedAt: number;
}

interface UrchinAtom  { 
    id: string; 
    name: string; 
    atom: WritableAtom<string, React.SetStateAction<string>> 
}

enum UrchinCategoryEnum {
    MEDIUM = 'medium',
    SOURCE = 'source',
    TERM = 'term',
    CAMPAIGN = 'campaign',
    CONTENT = 'content'
}

type UrchinCategoryType = 
    | UrchinCategoryEnum.MEDIUM 
    | UrchinCategoryEnum.SOURCE
    | UrchinCategoryEnum.TERM 
    | UrchinCategoryEnum.CAMPAIGN
    | UrchinCategoryEnum.CONTENT

const urchinAtoms: UrchinAtom[] = [
    { id: '0', name: UrchinCategoryEnum.MEDIUM, atom: seoMediumAtom },
    { id: '1', name: UrchinCategoryEnum.TERM, atom: seoTermAtom },
    { id: '2', name: 'source', atom: seoSourceAtom },
    { id: '3', name: 'campaign', atom: seoCampaignAtom },
    { id: '4', name: 'content', atom: seoContentAtom }
]

function addUrchinToUserCollection(key: UrchinCategoryType, value: string) {
    const { primaryEmailAddress } = useUserSession()

    let postHeaders =  new Headers()
    postHeaders.append('Content-type', 'application/json')
    
    var requestOptions = {
        method: 'POST',
        headers: postHeaders,
        body: JSON.stringify({
            "utmKey": key,
            "utmValue": value,
        }),
        redirect: 'follow'
    }

    fetch(`/api/urchins/user/${primaryEmailAddress}/${key}`, requestOptions)
        .then((resp) => await 
}

export const UrchinLists = ({ 
    key, 
    label, 
    value, 
    setValue, 
    url,
    handleSave
}: { 
    key: string; 
    label: string; 
    value: string; 
    setValue: (v: string) => void; 
    url: string; 
    handleSave: () => void; 
}) => {
    
    let list = useAsyncList({ async load({signal, cursor}) {
            let endpoint = `${url}/${label}`
            let res = await fetch(cursor || endpoint, { signal })
            let json = await res.json()

            return { 
                items:  !json?.results ? [] : json.results,
                cursor: !json?.next ? null : json.next
            }
        }
    });


    let extendedSave = () => {
        if(!list.items?.length) {
            list.append({ 
                id: `${0}`, 
                name: value, 
                frequency: 1, 
                updatedAt: new Date().getTime() 
            })
        }
        addUrchinToUserCollection(label, value)
    }

    return (
        <ComboBox
            key={key}
            label={label}
            items={list?.items ?? []}
            inputValue={value}
            onInputChange={(updatedInput: string) => {
                list.setFilterText(updatedInput)
                setValue(updatedInput)
            }}
            loadingState={list?.loadingState ?? false}
            onLoadMore={list.loadMore}
            commit={extendedSave}
            allowsCustomValues={true}
            menuTriggerAction={MenuTriggerActionEnum.MANUAL}
        >
            {(item: IUrchin) => (
               <Item key={item.id}>
                    <Text size='1'> 
                        {item?.name ?? ''} 
                    </Text>
                </Item>
            )}
        </ComboBox>
    )
}

// "path","id","data","username","emailAddresses","phoneNumbers","externalAccounts","passwordEnabled","firstName","lastName","fullName",
// "primaryEmailAddress","primaryPhoneNumberId","primaryPhoneNumber","profileImageUrl","publicMetadata","unsafeMetadata","updatedAt","createdAt","cachedSessionsWithActivities","


export const AsyncListTest = () => {  
    let [url, setUrl] = useState<string>('')

    const { primaryEmailAddress } = useUserSession()
    useEffect(() => {
        if(primaryEmailAddress?.length) {
            setUrl(`/api/urchins/user/${primaryEmailAddress}`)
        }
    }, [primaryEmailAddress])

    return (
        <Flex css={{ width: '100%', fd: 'row', jc: 'flex-start', ai: 'center', gap: '$1' }}>
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
                        handleSave={handleSave}
                    /> 
                )
            })}
        </Flex>
    )
}