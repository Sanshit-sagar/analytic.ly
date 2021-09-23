import { useState, useEffect, useMemo } from 'react'
import { styled } from '../../../stitches.config'

import { useAsyncList } from '@react-stately/data'
import { Item } from '@react-stately/collections' 

import { ComboBox } from '../../../compositions/ComboBox'
import { Text } from '../../../primitives/Text'

import { useClerk } from "@clerk/clerk-react";
import { useFilter } from '@react-aria/i18n'

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

const UrchinGroupContainer = styled('div', {
    width: '100%', 
    fd: 'row', 
    jc: 'flex-start', 
    ai: 'center',
    gap: '$1'
});


const useUserSession = () => {
    const { primaryEmailAddress } = useClerk()

    return { 
        primaryEmailAddress 
    }
}

interface UrchinAtom  { 
    key: Key; 
    category: UrchinCategoryType; 
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


interface IUrchin {
    id: string; 
    category: UrchinCategoryType; 
    name: string; 
    frequency: number; 
    updatedAt: Date;
    createdAt: Date; 
}

const urchinAtoms: UrchinAtom[] = [
    { id: 'a', category: UrchinCategoryEnum.MEDIUM, atom: seoMediumAtom },
    { id: 'b', category: UrchinCategoryEnum.TERM, atom: seoTermAtom },
    { id: 'a', category: UrchinCategoryEnum.SOURCE, atom: seoSourceAtom },
    { id: 'b', category: UrchinCategoryEnum.CAMPAIGN, atom: seoCampaignAtom },
    { id: 'a', category: UrchinCategoryEnum.CONTENT, atom: seoContentAtom }
]

interface IUrchinListProps { 
    key: Key;
    label: UrchinCategoryType; 
    filterValue: string; 
    setFilterValue: (v: string) => void; 
    endpoint: string; 
}

enum ServiceStateEnum {
    INIT ='init',
    LOADING = 'loading',
    LOADED = 'loaded',
    ERROR = 'error'
}

interface ServiceInit { status: ServiceStateEnum.INIT; }
interface ServiceLoading { status: ServiceStateEnum.LOADING; }
interface ServiceLoaded<T> {
    status: ServiceStateEnum.LOADED;
    payload: T;
}
interface ServiceError {
    status: ServiceStateEnum.ERROR;
    error: Error;
}
export type Service<T> =
  | ServiceInit
  | ServiceLoading
  | ServiceLoaded<T>
  | ServiceError;

interface ApiResponse {
    count: number;
    next: string | null;
    previous: string | null; 
    result: IUrchin[];
}

function createNewUrchin(label: UrchinCategoryType, initValue: string, listIndex: number) {
    return {
        key: (Math.random() > 0.5 ? 'a' : 'b'),
        id: `${listIndex}`,
        category: label,
        name: initValue,
        frequency: 1,
        updatedAt: new Date(),
        createdAt: new Date(),
        slugs: []
    }
}


interface SavedUrchin {
    key: Key;
    id: string;
    category: string;
    name: string; 
    frequency: number; 
    updatedAt: Date; 
    createdAt: Date; 
    slugs: string[]; 
}

interface AsyncDataPair {
    {tems: SavedUrchin[]; 
    cursor: string | null; 

}

export const UrchinLists = ({ key, label, filterValue, setFilterValue, endpoint }: IUrchinListProps) => {
    const { primaryEmailAddress } = useUserSession()

    let list: AsyncListData<AsyncDataPair> = useAsyncList({ async load({signal, cursor}) {
            let endpoint = `${endpoint}/${label}`
            let res = await fetch(cursor || endpoint, { signal })
            let json = await res.json()

            return { 
                items: json.results,
                cursor: json.next,
            }
        }
    });

    let [serviceState, setServiceState] = useState<Service<ApiResponse>>({
        status: ServiceStateEnum.INIT
    })

    let { startsWith } = useFilter({ sensitivity: 'base' });
    let [selectedKey, setSelectedKey] = useState<Key>('') 
    
    let filteredItems: SavedUrchin[] = useMemo(() => (
        list.items.filter((item: SavedUrchin) => (
            startsWith(item.name, filterValue)
    ))), [list.items, filterValue]);


    let onSelectionChange = (key: Key) => {
        let selectedItem: SavedUrchin = list?.items?.find((listItem: SavedUrchin) => listItem.id === key)
        setFilterValue(selectedItem?.name ?? '')
        setSelectedKey(key)
    }

    const addUrchinToUserCollection = (key: UrchinCategoryType, value: IUrchin) => {
        setServiceState({ status: ServiceStateEnum.LOADING })

        let postHeaders =  new Headers()
        postHeaders.append('Content-Type', 'application/json; charset=utf-8')
    
        return new Promise((resolve, reject) => {
            fetch(`/api/urchins/user/${primaryEmailAddress}/${key}`, {
                method: 'POST',
                headers: postHeaders,
                body: JSON.stringify({
                    "category": key,
                    "urchin": {...value},
                })
            })
            .then((response) => response.json())
            .then((result) => {
                setServiceState({ 
                    status: ServiceStateEnum.LOADED, 
                    payload: result 
                })
                resolve(result)
            })
            .catch((error) => {
                setServiceState({ 
                    status: ServiceStateEnum.ERROR,
                    error 
                });
                reject(error)
            });
        })
    }

    const handlePersist = () => {
        const newItem = createNewUrchin(label, list.filterText, list.items?.length || 0)
        list.insert(0, newItem)
    }


    return (
        <ComboBox
            key={key}
            label={label}
            placeholder={`Enter a ${label}`}
            selectedKey={selectedKey}
            onSelectionChange={onSelectionChange}
            items={filteredItems}
            inputValue={filterValue}
            onInputChange={setFilterValue}
            commit={handlePersist}
            allowsCustomValue
        >
            {(item: IUrchin) => (
               <Item key={item.id}>
                    <Text size='1'> {item.name} </Text>
                </Item>
            )}
        </ComboBox>
    )
}

export const AsyncListTest = () => {  
    let [url, setUrl] = useState<string | undefined>(undefined)
    const { primaryEmailAddress } = useUserSession()
    
    useEffect(() => {
        setUrl(primaryEmailAddress?.length ? `/api/urchins/user/${primaryEmailAddress}` : undefined)
    }, [primaryEmailAddress])

    return (
        <UrchinGroupContainer>
            {urchinAtoms.map((atomicUrchin: UrchinAtom) => {
                let { key, category, atom }: UrchinAtom = atomicUrchin
                let [value, setValue] = useAtom(atom)

                return (
                    <UrchinLists 
                        key={key} 
                        label={category}
                        filterValue={value}
                        setFilterValue={setValue}
                        endpoint={`${url}/${category}`}
                    /> 
                )
            })}
        </UrchinGroupContainer>
    )
}