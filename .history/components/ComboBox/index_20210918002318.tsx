import React from 'react'

import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'


import { Item } from '@react-stately/collections'

import { ComboBox as ComboBoxComposition } from '../../compositions/ComboBox'
import { useFilter } from '@react-aria/i18n'
import { Item, Section } from "react-stately";


import { WritableAtom, useAtom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'

interface IItem {
    id: number;
    name: string; 
    icon: any; 
    usedBy: number;
    viewedBy: number;
    updatedAt: Date; 
}

interface IFieldState {
    selectedKey: string | null;
    inputValue: string | null;
    items: IItem[];
    urchinCategoryId: number; 
    message: string; 
}

interface IUrchinComboBoxProps {
    key: number;
    utmCategory: string; 
    utmCategoryAtom: WritableAtom<string, React.SetStateAction<string>>; 
    index: number;
    initOptions: string[];
}


const UrchinComboBox = ({ key, utmCategory, utmCategoryAtom, index, initOptions }: IUrchinComboBoxProps) => {
    if(!utmCategoryAtom) return null; 

    const controlGroupLabel = `${utmCategory}`
    const [urchinValue, setUrchinValue] = useAtom(utmCategoryAtom)
    
    let optionList: IItem[] = initOptions?.length ? [...initOptions.map((option: string, i: number) => { 
        return { id: i, name: option }
    })] : []

    let [fieldState, setFieldState] = React.useState<IFieldState>({
        selectedKey: '',
        inputValue: urchinValue,
        items: optionList,
        urchinCategoryId: key,
        message: 'start typing to view results'
    })

    let { startsWith } = useFilter({sensitivity: 'base'});

    let onSelectionChange = (key: string) => {
        setFieldState((prevState: IFieldState) => {
            let selectedItem = prevState.items.find((option: IItem) => option.id === parseInt(key))
            setUrchinValue(selectedItem?.name ?? '')

            return {
                ...prevState,
                inputValue: selectedItem?.name ?? '',
                selectedKey: key,
                items: optionList.filter((item) => startsWith(item.name, selectedItem?.name ?? ''))
            }
        })
    }

    let onInputChange = (value: string) => {
        setFieldState((prevState: IFieldState) => {
            setUrchinValue(value)

            return {
                ...prevState,
                inputValue: value,
                selectedKey: value === '' ? null : prevState.selectedKey,
                items: optionList.filter((item) => startsWith(item.name, value))
            }
        })
    }

    let onOpenChange = (isOpen: boolean, menuTrigger: string) => {
        if (menuTrigger === 'manual' && isOpen) {
            setFieldState((prevState: IFieldState) => ({
                ...prevState,
                inputValue: prevState.inputValue,
                selectedKey: prevState.selectedKey,
                items: [...optionList]
            }));
        }
    }


    return (
        <ComboBoxComposition 
            key={index}
            label={controlGroupLabel}
            placeholder={`Search ${controlGroupLabel.toLowerCase()}s`}
            items={fieldState.items}
            selectedKey={fieldState.selectedKey}
            inputValue={fieldState.inputValue}
            onOpenChange={onOpenChange}
            onSelectionChange={onSelectionChange}
            onInputChange={onInputChange}
            menuTrigger="focus"
        >
            {(item: IItem) =>(
                <Item textValue={item.name}>
                    <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1'}}>
                        <Text size='2'> {item.name} </Text>
                        <Text size='1'> {describe(item)} </Text>
                    </Flex>
                </Item>.
            )}
        </ComboBoxComposition>
    );
}

const ComboBox = UrchinComboBox
export default ComboBox