
import { styled } from '../../../stitches.config'

import { useState, useEffect, useMemo } from 'react'
import { Text } from '../../../primitives/Text'
import { Flex } from '../../../primitives/Flex'

import { Atom, atom, useAtom } from 'jotai'

import { ComboBox } from '../../../compositions/ComboBox'
import { AsyncListData, useAsyncList } from '@react-stately/data'
import { Item } from '@react-stately/collections' 
import { useFilter } from '@react-aria/i18n'

import { useClerk } from "@clerk/clerk-react"

import { 
    UrchinCategoryEnum,
    AsyncDataPair, 
    SavedUrchin, 
    UrchinAtom, 
    IUrchinListProps,
    UrchinCategoryType,
} from './interfaces'

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

const urchinAtoms: UrchinAtom[] = [
    { key: 'seo_medium', category: UrchinCategoryEnum.MEDIUM, atom: seoMediumAtom },
    { key: 'seo_term', category: UrchinCategoryEnum.TERM, atom: seoTermAtom },
    { key: 'seo_source', category: UrchinCategoryEnum.SOURCE, atom: seoSourceAtom },
    { key: 'seo_campaign', category: UrchinCategoryEnum.CAMPAIGN, atom: seoCampaignAtom },
    { key: 'seo_content', category: UrchinCategoryEnum.CONTENT, atom: seoContentAtom }
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


export const UtmParamInput = ({ key, label, filterValue, setFilterValue, endpoint }: IUrchinListProps) => {
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
    });


    // const [error, setError] = useState<any | undefined>()
    // const [response, setResponse] = useState<any | undefined>()

    let { startsWith } = useFilter({ sensitivity: 'base' });
    let [selectedKey, setSelectedKey] = useState<Key>('a') 

    let filteredItems: SavedUrchin[] = useMemo(() => {
        return list.items.filter((item: SavedUrchin) => startsWith(item.name, filterValue))
    }, [list.items, filterValue])

    let onSelectionChange = (key: string) => {
        let selectedItem: SavedUrchin = list?.items?.find((listItem: SavedUrchin) => {
            return listItem.id === key
        });
        setFilterValue(selectedItem?.name ?? '')
        setSelectedKey(key)
    };

    // const { service, publishNewUrchin } = useUrchinMutator() 

    const handlePersist = () => {
        const newItem = createNewUrchin(label, filterValue, list.items?.length || 0)
        list.insert(0, newItem)

        // publishNewUrchin(label, newItem)
        //     .then((response: any) => setResponse(response))
        //     .catch((error: Error) => setError(error))   
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
            disallowEmptySelection={true}
            defaultInputValue={list.filterText}
            {...focusWithinProps}
        >
           {(item: NewUrchin) => (
                <Item key={item.id}>
                    <UrchinInfoContainer>
                        <UrchinHeader> {item.name} </UrchinHeader>

                        <UrchinStatisticsRow> 
                            <UrchinStatistic>
                                <StarIcon />  {(item.frequency * 100).toPrecision(2)}
                            </UrchinStatistic>
                            <UrchinStatistic>  
                                <EyeOpenIcon /> {(item.frequency * 100).toPrecision(2)} 
                            </UrchinStatistic>
                        </UrchinStatisticsRow> 

                        <UrchinTimeAgo> 
                            {humanReadable(item.updatedAt)} 
                            <DeleteButton itemName={item.name} handleClick={handleRemove}>
                                <TrashIcon aria-hidden="true" />
                            </DeleteButton> 
                        </UrchinTimeAgo>

                    </UrchinInfoContainer>
                </Item>
            )}
        </ComboBox>
    )
}

export const SeoParamsInput = () => {  
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
                    <UtmParamInput 
                        key={key} 
                        label={category}
                        filterValue={value}
                        setFilterValue={setValue}
                        endpoint={`${url}/${category}`}
                    /> 
                )
            })}
        </UrchinGroupContainer>
    );
}