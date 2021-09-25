import { styled } from '../../../stitches.config'

import { useRouter } from 'next/router'

import { useState, useEffect, useMemo } from 'react'
import { Text } from '../../../primitives/Text'
import { Flex } from '../../../primitives/Flex'

import { useAtom } from 'jotai'

import { ComboBox } from '../../../compositions/ComboBox'
import { AsyncListData, useAsyncList } from '@react-stately/data'
import { Item } from '@react-stately/collections' 
import { useFilter } from '@react-aria/i18n'

import { useClerk, useUser } from "@clerk/clerk-react"

import { 
    UrchinCategoryEnum,
    AsyncDataPair, 
    SavedUrchin, 
    UrchinAtom, 
    ServiceStateEnum,
    IUrchin,
    ApiResponse,
    IUrchinListProps,
    UrchinCategoryType,
    Service
} from './interfaces'

import {
    seoSourceAtom,
    seoMediumAtom,
    seoTermAtom,
    seoContentAtom,
    seoCampaignAtom
} from '../../../atoms/urchins'
import router from 'next/router'

const UrchinGroupContainer = styled(Flex, {
    width: '100%', 
    fd: 'row', 
    jc: 'flex-start', 
    ai: 'stretch',
    gap: '$1'
})

const urchinAtoms: UrchinAtom[] = [
    { key: 'a', category: UrchinCategoryEnum.MEDIUM, atom: seoMediumAtom },
    { key: 'b', category: UrchinCategoryEnum.TERM, atom: seoTermAtom },
    { key: 'a', category: UrchinCategoryEnum.SOURCE, atom: seoSourceAtom },
    { key: 'b', category: UrchinCategoryEnum.CAMPAIGN, atom: seoCampaignAtom },
    { key: 'a', category: UrchinCategoryEnum.CONTENT, atom: seoContentAtom }
]


function createNewUrchin(label: UrchinCategoryType, initValue: string, listIndex: number) {
    const datetime = new Date()
    return {
        key: (Math.random() > 0.5 ? 'a' : 'b'),
        id: `${listIndex}`,
        category: label,
        name: initValue,
        frequency: 1,
        updatedAt: datetime,
        createdAt: datetime,
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
            fetch(`/api/urchins/user/${primaryEmailAddress}/${key}/${value}`, {
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

function timeAgo(d: Date) 


export const UtmParamInput = ({ key, label, filterValue, setFilterValue, endpoint }: IUrchinListProps) => {
    const { user, isSignedOut, isLoading } = useUser({ withAssertions: true })

    let list: AsyncListData<AsyncDataPair> = useAsyncList({ async load({signal, cursor}) {
            let categoryEndpoint = `${endpoint}`
            let res = await fetch(cursor || categoryEndpoint, { signal })
            let json = await res.json()

            return { 
                items: json.results,
                cursor: json.next,
            }
        }
    });


    const [error, setError] = useState<any | undefined>()
    const [response, setResponse] = useState<any | undefined>()

    let { startsWith } = useFilter({ sensitivity: 'base' });
    let [selectedKey, setSelectedKey] = useState<Key>('a') 

    let filteredItems: SavedUrchin[] = useMemo(() => {
        return list.items.filter((item: SavedUrchin) => startsWith(item.name, filterValue))
    }, [list.items, filterValue])


    let onSelectionChange = (key: string) => {
        let selectedItem: SavedUrchin = list?.items?.find((listItem: SavedUrchin) => listItem.id === key);
        setFilterValue(selectedItem?.name ?? '')
        setSelectedKey(key)
    };

    const { service, publishNewUrchin } = useUrchinMutator() 

    const handlePersist = () => {
        const newItem = createNewUrchin(label, filterValue, list.items?.length || 0)
        list.insert(0, newItem)

        publishNewUrchin(label, newItem)
            .then((response: any) => setResponse(response))
            .catch((error: Error) => setError(error))   
    }

    if(error || response?.error) return <Text> Error! </Text>
    
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
                    <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1'}}>
                        <Text size='2' css={{ color: '$text' }}> 
                            {item.name}
                        </Text>
                        <Flex css={{ fd: 'row', jc: 'stretch', ai: 'flex-start', gap: '$1'}}>
                            <Text> {timeAgo(item.updatedAt)} </Text>
                        </Flex>
                    </Flex>
                </Item>
            )}
        </ComboBox>
    )
}

export const SeoParamsInput = () => {  
    const { user, isSignedOut, isLoading } = useUser({ withAssertions: true })
    
    if(isLoading(user)) return <Text> loading.... </Text>
    if(isSignedOut(user)) return <Text> Not Authenticated </Text>
  
    return (
        <UrchinGroupContainer>
            {urchinAtoms.map((atomicUrchin: UrchinAtom) => {
                let { key, category, atom }: UrchinAtom = atomicUrchin
                let [value, setValue] = useAtom(atom)

                return (
                    <UtmParamInput 
                        key={key} 
                        label={category}
                        filterValue={value}
                        setFilterValue={setValue}
                        endpoint={
                                user?.primaryEmailAddress 
                            ?   `/api/urchins/user/${user?.primaryEmailAddress}/${category}` 
                            :   undefined
                        }
                    /> 
                )
            })}
        </UrchinGroupContainer>
    );
}