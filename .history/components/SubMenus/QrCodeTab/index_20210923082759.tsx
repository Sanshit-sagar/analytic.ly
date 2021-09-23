import { useState, useEffect, useMemo } from 'react'
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


const useUserSession = () => {
    const { user: activeUser } = useClerk()

    const { 
        firstName, 
        lastName, 
        primaryEmailAddress
    } = activeUser 

    return { firstName, lastName, primaryEmailAddress }
}

interface UrchinAtom  { 
    id: string; 
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

enum IdEnum { 
    ONE = '1',
    TWO = '2',
    THREE = '3',
    FOUR = '4',
    FIVE = '5',
};

type UrchinIdType = 
    | IdEnum.ONE 
    | IdEnum.TWO
    | IdEnum.THREE
    | IdEnum.FOUR
    | IdEnum.FIVE 

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
    { id: IdEnum.ONE, category: UrchinCategoryEnum.MEDIUM, atom: seoMediumAtom },
    { id: IdEnum.TWO, category: UrchinCategoryEnum.TERM, atom: seoTermAtom },
    { id: IdEnum.THREE, category: UrchinCategoryEnum.SOURCE, atom: seoSourceAtom },
    { id: IdEnum.FOUR, category: UrchinCategoryEnum.CAMPAIGN, atom: seoCampaignAtom },
    { id: IdEnum.FIVE, category: UrchinCategoryEnum.CONTENT, atom: seoContentAtom }
]

interface IUrchinListProps { 
    key: Key;
    label: UrchinCategoryType; 
    value: string; 
    setValue: (v: string) => void; 
    url: string; 
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
        id: `${listIndex}`,
        category: label,
        name: initValue,
        frequency: 1,
        updatedAt: new Date(),
        createdAt: new Date(),
        slugs: []
    }
}

interface IFieldState {
    inputValue: string | undefined; 
    selectedKey: string | undefined; 
    items: IUrchin[] | [] | undefined; 
}

interface SavedUrchin {
    id: string;
    category: string;
    name: string; 
    frequency: number; 
    updatedAt: Date; 
    createdAt: Date; 
    slugs: string[]; 
}

export const UrchinLists = ({ key, label, value, setValue, url }: IUrchinListProps) => {
    const { primaryEmailAddress } = useUserSession()

    let list = useAsyncList({ async load({signal, cursor}) {
            let endpoint = `${url}/${label}`
            let res = await fetch(cursor || endpoint, { signal })
            let json = await res.json()

            return { 
                items:  json.results,
                cursor: json.next,
            }
        }
    });


    let [serviceState, setServiceState] = useState<Service<ApiResponse>>({
        status: ServiceStateEnum.INIT
    })

    let {startsWith} = useFilter({ sensitivity: 'base' });
    
    let [filterValue, setFilterValue] = useState<string>('')
    let filteredItems: SavedUrchin[] = useMemo(() => {
        return list.items.filter((item) => (
            startsWith(item.name, filterValue)
        ));
    }, [list.items, filterValue]);

    let [selectedKey, setSelectedKey] = useState<Key>('') 
    let onSelectionChange = (key: Key) => {
        let selectedItem: SavedUrchin = list?.items?.find((listItem) => listItem.id === key)
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
                    <Text size='1'> {item.name}
                    </Text>
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
        <Flex css={{ width: '100%', fd: 'row', jc: 'flex-start', ai: 'center', gap: '$1' }}>

            {urchinAtoms.map((atomicUrchin: UrchinAtom) => {
                let { id, category, atom }: UrchinAtom = atomicUrchin
                let [value, setValue] = useAtom(atom)

                return (
                    <UrchinLists 
                        key={Object.values(IdEnum)[parseInt(id)]} 
                        label={category}
                        value={value}
                        setValue={setValue}
                        url={`${url}/${name}`}
                    /> 
                )
            })}
        </Flex>
    )
}