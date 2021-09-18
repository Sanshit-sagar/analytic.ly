import React from 'react'

import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'


import { Item } from '@react-stately/collections'

import { ComboBox as ComboBoxComposition } from '../../compositions/ComboBox'
import { useFilter } from '@react-aria/i18n'
import { MenuTriggerActionEnum, MenuTriggerAction } from '../../compositions/interfaces'

import { WritableAtom, useAtom } from 'jotai'

interface IItem {
    id: string;
    name: string; 
}

interface IFieldState {
    selectedKey: string | undefined;
    inputValue: string | undefined;
    items: IItem[];
    urchinCategoryId: number; 
    message: string; 
}

interface IUrchinComboBoxProps {
    key: number;
    utmCategory: string; 
    utmCategoryAtom: WritableAtom<string, React.SetStateAction<string>>; 
    index: number;
    initOptions: IItem[];
}

function describe(item: IItem) {
    return `${item.usedBy} refs | {item.viewedBy} views`
}


const UrchinComboBox = ({ key, utmCategory, utmCategoryAtom, index, initOptions }: IUrchinComboBoxProps) => {
    if(!utmCategoryAtom) return null; 

    const controlGroupLabel = `${utmCategory}`
    const [urchinValue, setUrchinValue] = useAtom(utmCategoryAtom)
    
    let optionList: IItem[] = initOptions?.length ? [...initOptions.map((opt: IItem, idx: number) => { 
        return { ...opt,  id: `${idx}` };
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
            let selectedItem = prevState.items.find((option: IItem) => option.id === key)
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
        });
    }

    let onOpenChange = (isOpen: boolean, menuTrigger?: MenuTriggerAction | undefined): void => {
        if (menuTrigger && menuTrigger === MenuTriggerActionEnum.MANUAL && isOpen) {
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
            menuTrigger={MenuTriggerActionEnum.FOCUS}
        >
            {(item: IItem) => <Item> {item.name} </Item>}
        </ComboBoxComposition>
    );
}

const ComboBox = UrchinComboBox
export default ComboBox