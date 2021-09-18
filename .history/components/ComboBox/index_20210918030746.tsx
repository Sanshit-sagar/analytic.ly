import React from 'react'

import { Item } from '@react-stately/collections'

import { useFilter } from '@react-aria/i18n'
import { useAtom, WritableAtom } from 'jotai'
import { MenuTriggerAction, MenuTriggerActionEnum } from '../../compositions/interfaces'
import { ComboBox } from '../../compositions/ComboBox'

interface IItem {
    id: number;
    name: string; 
}

interface IFieldState {
    selectedKey: string | undefined;
    inputValue: string | undefined;
    items: IItem[];
    urchinCategoryId: number; 
    message: string;
}

interface ICustomComboBoxProps {
    key: number;
    label: string; 
    datumAtom: WritableAtom<string, React.SetStateAction<string>>; 
    index: number;
    items: string[];
}


export const AriaComboBox = ({ key, label, datumAtom, index, items }: ICustomComboBoxProps) => {
    if(!key || datumAtom) return null; 

    const [value, setValue] = useAtom<string, React.SetStateAction<string>>(datumAtom)
    const updateValue = (updatedValue: string) => setValue(updatedValue)
   
    let items: IItem[] = items?.length ? [...items.map((item: string, idx: number) => {
        return { 
            id: index, 
            name: item 
        }
    })] : []

    let [fieldState, setFieldState] = React.useState<IFieldState>({
        selectedKey: '',
        inputValue: value,
        items: optionList,
        urchinCategoryId: key,
        message: 'start typing to view results'
    })

    let { startsWith } = useFilter({sensitivity: 'base'});

    let onSelectionChange = (key: string) => {
        setFieldState((prevState: IFieldState) => {
            let selectedItem = prevState.items.find((option: IItem) => option.id === parseInt(key))
            updateValue(selectedItem?.name ?? '')

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
            updateValue(value)

            return {
                ...prevState,
                inputValue: value,
                selectedKey: value === '' ? undefined : prevState.selectedKey,
                items: optionList.filter((item) => startsWith(item.name, value))
            }
        })
    }

    let onOpenChange = (isOpen: boolean, menuTrigger: MenuTriggerAction | undefined) => {
        if (menuTrigger===MenuTriggerActionEnum.MANUAL && isOpen) {
            setFieldState((prevState: IFieldState) => ({
                ...prevState,
                inputValue: prevState.inputValue,
                selectedKey: prevState.selectedKey,
                items: [...optionList]
            }));
        }
    }


    return (
        <ComboBox
            key={index}
            label={label}
            placeholder={`Search ${label.toLowerCase()}s`}
            items={fieldState.items}
            selectedKey={fieldState.selectedKey}
            inputValue={fieldState.inputValue}
            onOpenChange={onOpenChange}
            onSelectionChange={onSelectionChange}
            onInputChange={onInputChange}
            menuTriggerAction={MenuTriggerActionEnum.FOCUS}
        >
            {(item: IItem) => <Item>{item.name}</Item>}
        </ComboBox>
    );
}