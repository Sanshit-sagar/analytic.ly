import { styled } from '../../../stitches.config'

import React, { useState } from 'react'

import { AsyncListData, useAsyncList } from '@react-stately/data'
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
import { MenuTriggerActionEnum } from '../interfaces'

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

function NewUrchinFactory(label: UrchinCategoryType, initValue: string, listIndex: number)  {
    const datetime = new Date()
    let newItem: SavedUrchin = {
        id: `${listIndex}`,
        category: label,
        name: initValue,
        frequency: 1,
        updatedAt: datetime,
        createdAt: datetime,
        slugs: ['tester_slug'],
        items: ['tester_slug'],
        cursor: null,
    }
    return { 
        ...newItem, 
        key: getKeyForUrchin(newItem) 
    } 
}

interface FieldState {
    selectedKey: string;
    inputValue: string; 
    items: SavedUrchin[]; 
}
 

export const UtmParamInput = ({ key, label, filterValue, setFilterValue, endpoint }: IUrchinListProps) => {

    let [error, setError] = useState<any | undefined>()
    let [response, setResponse] = useState<any | undefined>()
    let [isFocusWithin, setFocusWithin] = useState(false);
  
    let list: AsyncListData<SavedUrchin> = useAsyncList({ async load({ signal, cursor }) {
            let categoryEndpoint = `${endpoint}`
            let res = await fetch(cursor || categoryEndpoint, { signal })
            let json = await res.json()
            return { items: json.results, cursor: json.next }
        }, 
        getKey: (item: SavedUrchin) => getKeyForUrchin(item)
    })

    let [fieldState, setFieldState] = React.useState({
        selectedKey: '',
        inputValue: '',
        items: list.items,
    });

    let { service, mutate } = useMutate()
    let { startsWith } = useFilter({ sensitivity: 'base' }); 

    let { focusWithinProps } = useFocusWithin({
        onFocusWithin: (_event: React.FocusEvent<Element>) => setFocusWithin(true),
        onBlurWithin: (_event: React.FocusEvent<Element>) => setFocusWithin(false),
        onFocusWithinChange: (isFocusWithin: boolean) => setFocusWithin(isFocusWithin)
    });

    const isLoadingStateLoading = (ls: string) => ls==='loading' || ls==='loadingMore' || ls==='filtering' || ls==='sorting'
    const isServiceStateLoading = (s: string) => s==='loading' || s==='init' 
    const isComboBoxLoading = (): boolean => {
        let ariaLoading = isLoadingStateLoading(list.loadingState)
        let promiseLoading = isServiceStateLoading(service.status) 
        return ariaLoading || promiseLoading
    }
  
    const onSelectionChange = (key: string) => {
        setFieldState((prevState: FieldState) => {
            let selectedItem = prevState.items.find((item: SavedUrchin) => item.id === key)
            return {
                inputValue: selectedItem?.name ?? '',
                selectedKey: key, 
                items: prevState.items.filter((item: SavedUrchin) => 
                    startsWith(item.name, selectedItem?.name ?? '')
                )
            };
        });
    }

    const onInputChange = (value: string) => {
        setFieldState((prevState: FieldState) => {
            return {
                inputValue: value,
                selectedKey: value === '' ? null : prevState.selectedKey,
                items: prevState.items.filter((item) => startsWith(item.name, value))
            }
        });
    }

    let onOpenChange = (isOpen: boolean, menuTrigger: MenuTriggerAction) => {
        if (menuTrigger === 'manual' && isOpen) {
            setFieldState((prevState) => ({
                inputValue: prevState.inputValue,
                selectedKey: prevState.selectedKey,
            }
        ))}
    }

    const handlePersist = () => {
        const newItem = NewUrchinFactory(label, filterValue, list.items?.length || 0)
        list.insert(0, newItem)

        // mutate(label, filterValue, newItem).then((response: any) => {
        //     setResponse(response)
        // }).catch((error: Error) => {
        //     setError(error)
        // })
    }

    const handleRemove = () => {
        list.removeSelectedItems() 
    }

    if(error || response?.error) return <Text> Error! </Text>
    
    return (
        <ComboBox
            key={key}
            label={label}
            placeholder={`Enter a ${label}`}
            items={list.items}
            inputValue={list.filterText}
            onInputChange={list.setFilterText}>
            selectedKeys={[fieldState.selectedKey]}
            onSelectionChange={onSelectionChange}
            allowsCustomValue={true}
            menuTrigger="focus"
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
        </>
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