import { styled } from '../../../stitches.config'

import { useState, useEffect, useMemo } from 'react'

import { ComboBox } from '../../../compositions/ComboBox'
import { Text } from '../../../primitives/Text'
import { Flex } from '../../../primitives/Flex'

import { WritableAtom, useAtom } from 'jotai'
import { useClerk } from "@clerk/clerk-react"

import { useAsyncList } from '@react-stately/data'
import { Item } from '@react-stately/collections' 
import { useFilter } from '@react-aria/i18n'

import {
    seoSourceAtom,
    seoMediumAtom,
    seoTermAtom,
    seoContentAtom,
    seoCampaignAtom
} from '../../../atoms/urchins'

const UrchinGroupContainer = styled(Flex, {
    width: '100%', 
    fd: 'row', 
    jc: 'flex-start', 
    ai: 'stretch',
    gap: '$1'
})

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
    items: SavedUrchin[]; 
    cursor: string | null; 
};

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

const urchinAtoms: UrchinAtom[] = [
    { key: 'a', category: UrchinCategoryEnum.MEDIUM, atom: seoMediumAtom },
    { key: 'b', category: UrchinCategoryEnum.TERM, atom: seoTermAtom },
    { key: 'a', category: UrchinCategoryEnum.SOURCE, atom: seoSourceAtom },
    { key: 'b', category: UrchinCategoryEnum.CAMPAIGN, atom: seoCampaignAtom },
    { key: 'a', category: UrchinCategoryEnum.CONTENT, atom: seoContentAtom }
]


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


const useUserSession = () => {
    const { primaryEmailAddress } = useClerk()

    return { 
        primaryEmailAddress 
    }
}

const useUrchinMutator = () => {
    const { primaryEmailAddress } = useUserSession()
    let [service, setService] = useState<Service<ApiResponse>>({ 
        status: ServiceStateEnum.INIT 
    })

    const publishNewUrchin = (key: UrchinCategoryType, value: IUrchin) => {
        setService({ status: ServiceStateEnum.LOADING })

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
                setService({ 
                    status: ServiceStateEnum.LOADED, 
                    payload: result 
                })
                resolve(result)
            })
            .catch((error) => {
                setService({ 
                    status: ServiceStateEnum.ERROR,
                    error 
                });
                reject(error)
            });
        })
    }

    return {
        service,
        publishNewUrchin
    }
}

enum LoadingStatusEnum {
    LOADING = 'loading',
    LOADING_MORE = 'loadingMore',
    SORTING = 'sorting',
    FILTERING = 'filtering',
    IDLE = 'idle',
    ERROR = 'error'
}

type LoadingStatus = 
    | LoadingStatusEnum.LOADING
    | LoadingStatusEnum.LOADING_MORE
    | LoadingStatusEnum.SORTING
    | LoadingStatusEnum.FILTERING
    | LoadingStatusEnum.IDLE
    | LoadingStatusEnum.ERROR

export const UrchinLists = ({ key, label, filterValue, setFilterValue, endpoint }: IUrchinListProps) => {
    const { primaryEmailAddress } = useUserSession()

    let list: AsyncListData<AsyncDataPair> = useAsyncList({ async load({signal, cursor}) {
            let categoryEndpoint = `${endpoint}/${label}`
            let res = await fetch(cursor || categoryEndpoint, { signal })
            let json = await res.json()

            return { 
                items: json.results,
                cursor: json.next,
            }
        }


    const [error, setError] = useState<any | undefined>()
    const [response, setResponse] = useState<any | undefined>()

    let { startsWith } = useFilter({ sensitivity: 'base' });
    let [selectedKey, setSelectedKey] = useState<Key>('') 

    let filteredItems: SavedUrchin[] = useMemo(() => (
        list.items.filter((item: SavedUrchin) => (
            startsWith(item.name, filterValue)
    ))), [list.items, filterValue]);


    let onSelectionChange = (key: Key) => {
        let selectedItem: SavedUrchin = list?.items?.find((listItem: SavedUrchin) => {
            return listItem.id === key
        });
        setFilterValue(selectedItem?.name ?? '')
        setSelectedKey(key)
    };

    const { service, publishNewUrchin } = useUrchinMutator() 

    const handlePersist = () => {
        const newItem = createNewUrchin(label, list.filterText, list.items?.length || 0)
        list.insert(0, newItem)

        publishNewUrchin(label, newItem)
            .then((response: any) => setResponse(response))
            .catch((error: Error) => setError(error))   
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
            allowsCustomValue={true}
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

