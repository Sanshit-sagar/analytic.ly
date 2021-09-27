
import { styled } from '../../../stitches.config'
import { useState, useEffect, useMemo } from 'react'

import { useAtom } from 'jotai'
import { Text } from '../../../primitives/Text'
import { Flex } from '../../../primitives/Flex'

import { humanReadable } from '../../../lib/utils/dateUtils'
import { CustomComboBox as ComboBox} from '../../../compositions/ComboBox'
import { AsyncListData, useAsyncList } from '@react-stately/data'
import { Item } from '@react-stately/collections' 
import { useFilter } from '@react-aria/i18n'

import { EyeOpenIcon, StarIcon, TrashIcon } from '@radix-ui/react-icons'

import { useMutate } from '../../../hooks/useMutate'
import { useClerkSession } from '../../../hooks/useClerk'

export type Service<T> =
    | ServiceInit
    | ServiceLoading
    | ServiceLoaded<T>
    | ServiceError;

interface IUrchinListProps {
    key: string;
    label: string;
    filterValue: string; 
    setFilterValue: (value: string) => void; 
    endpoint: string;
}
    

import { 
    UrchinCategoryEnum,
    AsyncDataPair, 
    SavedUrchin, 
    UrchinAtom, 
    UrchinCategoryType
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

const DeleteButtonText = styled(Text, {
    color: 'red', 
    '&:hover': { 
        color: 'magenta' 
    } 
});

const urchinAtoms: UrchinAtom[] = [
    { key: '1', category: UrchinCategoryEnum.MEDIUM, atom: seoMediumAtom },
    { key: '2', category: UrchinCategoryEnum.TERM, atom: seoTermAtom },
    { key: '3', category: UrchinCategoryEnum.SOURCE, atom: seoSourceAtom },
    { key: '4', category: UrchinCategoryEnum.CAMPAIGN, atom: seoCampaignAtom },
    { key: '5', category: UrchinCategoryEnum.CONTENT, atom: seoContentAtom }
]

type NewUrchin = Omit<SavedUrchin, 'key'>;

// interface ApiResponse {
//     cursor: string | undefined;
//     previous: string | undefined;
//     next: string | undefined;
//     data: string | undefined; 
// }

// const initApiResponseObj = { 
//     cursor: undefined, 
//     previous: undefined,
//     next: undefined,
//     data: undefined,
// };

// type DeleteButtonProps = { 
//     itemName: string; 
//     children: React.ReactNode; 
//     handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void; 
// };

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


export const UtmParamInput = ({ key, label, filterValue, setFilterValue, endpoint }: IUrchinListProps) => {
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
    const handleRemoveSelections = () => {
        list.removeSelectedItems();
    }

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
            allowsCustomValue
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
                            <DeleteButton itemName={item.name} handleClick={handleRemoveSelections}>
                                <DeleteButtonText>
                                    <TrashIcon aria-hidden="true" />
                                </DeleteButtonText>
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
    const { primaryEmailAddress } = useClerkSession()
    
    useEffect(() => {
        setUrl(primaryEmailAddress?.length ? `/api/urchins/user/${primaryEmailAddress}` : undefined)
    }, [primaryEmailAddress])

    return (
        <UrchinGroupContainer>
            {urchinAtoms.map((atomicUrchin: UrchinAtom, index: number) => {
                let { category, atom }: UrchinAtom = atomicUrchin
                let [value, setValue] = useAtom(atom)

                return (
                    <UtmParamInput 
                        key={`param-at-index-${index}`} 
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