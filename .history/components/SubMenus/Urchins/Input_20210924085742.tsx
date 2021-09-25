import { styled } from '../../../stitches.config'

import React, { useState } from 'react'

import { useAsyncList } from '@react-stately/data'
import { ComboBox } from '../../../compositions/ComboBox'
import { Item } from '@react-stately/collections' 
import { useFilter } from '@react-aria/i18n'
import { useFocusWithin } from '@react-aria/interactions'

import { Text } from '../../../primitives/Text'
import { Flex } from '../../../primitives/Flex'
import { Tooltip } from '../../../primitives/Tooltip'
import { ScrollArea } from '../../../primitives/ScrollArea'

import { useAtom } from 'jotai'
import { humanReadable } from '../../../lib/utils/dateUtils'
import { useMutate } from '../../../hooks/useMutate'

import { useUser } from "@clerk/clerk-react"
import { EyeOpenIcon, StarIcon, TrashIcon } from '@radix-ui/react-icons'

import { 
    UrchinAtom, 
    SavedUrchin,
    IUrchinListProps,
    UrchinCategoryType,
    UrchinCategoryEnum,
} from './interfaces'

import {
    LoadingStateEnum,
    ServerStateEnum
} from '../constants'

import {
    seoTermAtom,
    seoSourceAtom,
    seoMediumAtom,
    seoContentAtom,
    seoCampaignAtom
} from '../../../atoms/urchins'

const UrchinGroupContainer = styled(Flex, {
    width: '100%', 
    fd: 'row', 
    jc: 'space-between', 
    ai: 'stretch',
    gap: '$1'
})

const UrchinInfoContainer = styled(Flex, {
    width: '100%', 
    fd: 'column', 
    jc: 'flex-start', 
    ai: 'stretch',
    gap: '$2'
})

const UrchinHeader = styled(Text, {
    fontSize: '$3',
    color: '$text', 
    textDecoration: 'underline', 
    textDecorationColor: '$text'
}) 

const UrchinStatistic = styled(Flex, {
    color: '$funkyText', 
    display: 'flex', 
    fd: 'row', 
    jc: 'flex-start', 
    ai: 'center',
    gap: '$1'
})

const UrchinStatisticsRow = styled(Flex, {
    width: '100%', 
    fd: 'row', 
    jc: 'flex-start', 
    ai: 'center', 
    gap: '$1'
});

const UrchinTimeAgo = styled(Text, {
    width: '100%',
    margin: 0,
    padding: 0, 
    display: 'inline-flex',
    fd: 'row', 
    jc: 'space-between', 
    ai: 'flex-end'
});

const urchinAtoms: UrchinAtom[] = [
    { key: '1', category: UrchinCategoryEnum.MEDIUM, atom: seoMediumAtom },
    { key: '2', category: UrchinCategoryEnum.TERM, atom: seoTermAtom },
    { key: '3', category: UrchinCategoryEnum.SOURCE, atom: seoSourceAtom },
    { key: '4', category: UrchinCategoryEnum.CAMPAIGN, atom: seoCampaignAtom },
    { key: '5', category: UrchinCategoryEnum.CONTENT, atom: seoContentAtom }
]

const getKeyForUrchin= (item: SavedUrchin): React.Key => {
    return item?.id ? `item-${parseInt(item?.id)}` : `item-${new Date().getTime()}`
}

type NewUrchin = Omit<SavedUrchin, 'key'>;

interface ApiResponse {
    cursor: string | undefined;
    previous: string | undefined;
    next: string | undefined;
    data: string | undefined; 
}

const initApiResponseObj = { 
    cursor: undefined, 
    previous: undefined,
    next: undefined,
    data: undefined,
};

function NewUrchinFactory(label: UrchinCategoryType, initValue: string, listIndex: number): NewUrchinType {
    const datetime = new Date()

    return {
        id: `${listIndex}`,
        category: label,
        name: initValue,
        frequency: 1,
        updatedAt: datetime,
        createdAt: datetime,
        slugs: ['tester_slug'],
    };
}

export const UtmParamInput = ({ key, label, filterValue, setFilterValue, endpoint }: IUrchinListProps) => {

    
    const [error, setError] = useState<Error>()
    const [selectedKey, setSelectedKey] = useState<Key>('a')
    const [isFocusWithin, setFocusWithin] = useState<boolean>(false)
    const [response, setResponse] = useState<ApiResponse>(initApiResponseObj)
    

    let list = useAsyncList<NewUrchin, string>({ 
        async load({ signal, cursor }) {
            const res = await fetch(cursor || `${endpoint}`, { signal })
            const json = await res.json()

            return { 
                items: json.results, 
                cursor: json.next 
            }
        }, 
        getKey: (item: NewUrchin) => getKeyForUrchin(item),
    })

    let { service, mutate } = useMutate()
    let { contains } = useFilter({ sensitivity: 'base' }); 

    let { focusWithinProps } = useFocusWithin({
        onFocusWithin: (_event: React.FocusEvent<Element>) => setFocusWithin(true),
        onBlurWithin: (_event: React.FocusEvent<Element>) => setFocusWithin(false),
        onFocusWithinChange: (isFocusWithin: boolean) => setFocusWithin(isFocusWithin)
    });

    const isLoadingStateLoading = (ls: string) => {
        return (ls===LoadingStateEnum.LOADING || ls===LoadingStateEnum.LOADING_MORE || ls===LoadingStateEnum.FILTERING || ls===LoadingStateEnum.SORTING

    const isServiceStateLoading = (s: string) => s===ServerStateEnum.LOADING || s===ServerStateEnum.INIT
    const isComboBoxLoading = (): boolean => {
        let ariaLoading = isLoadingStateLoading(list.loadingState)
        let promiseLoading = isServiceStateLoading(service.status) 
        return ariaLoading || promiseLoading
    }

    let filteredItems: NewUrchin[] = React.useMemo(() => {
        return list.items.filter((item: NewUrchin) => contains(item.name, filterValue))
    }, [list, filterValue])
  
    let onSelectionChange = (key: string) => {
        if(!list?.items?.length) return null;

        let selectedItem: NewUrchin = list.items.find((item: NewUrchin) => item.id===key) || list.items[0]
        
        setSelectedKey(key)
        setFilterValue(selectedItem?.name ?? '')
    }

    const handlePersist = () => {
        const newUrchin: NewUrchin = NewUrchinFactory(label, filterValue, list.items?.length || 0)
        list.insert(0, {...newUrchin})

        mutate(label, filterValue, newUrchin).then((response: any) => {
            setResponse(response)
        }).catch((error: Error) => {
            setError(error)
        })
    }

    const handleRemove = () => {
        list.removeSelectedItems() 
    }

    if(error) return <Text> Error! </Text>
    
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
            {...focusWithinProps}
        >
            {(item: SavedUrchin) => (
                <Item key={item.id}>
                    <UrchinInfoContainer>
                        <UrchinHeader> {item.name} </UrchinHeader>

                        <UrchinStatisticsRow> 
                            <UrchinStatistic>
                                <StarIcon />  {Math.round(item.frequency * 100)/10} 
                            </UrchinStatistic>
                            <UrchinStatistic>  
                                <EyeOpenIcon /> {Math.round(item.frequency * 100)/10} 
                            </UrchinStatistic>
                        </UrchinStatisticsRow> 

                        <UrchinTimeAgo> 
                            {humanReadable(item.updatedAt)} 

                            <Tooltip content={`Delete ${item.name}?`}>
                                <button style={{ padding: 0, margin: 0, backgroundColor: 'transparent', border: 'none'}}>
                                    <Text css={{ color: 'red', '&:hover': { color: 'magenta' } }}>
                                        <TrashIcon aria-hidden="true" /> 
                                    </Text>
                                </button> 
                            </Tooltip>
                        </UrchinTimeAgo>
                    </UrchinInfoContainer>
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