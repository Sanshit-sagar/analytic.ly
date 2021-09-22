import React, { useState } from 'react'

import { Item } from '@react-stately/collections'

import { useFilter } from '@react-aria/i18n'
import { MenuTriggerAction, MenuTriggerActionEnum, Key } from '../../compositions/interfaces'
import { ComboBox, PopoverVariantType } from '../../compositions/ComboBox'

interface IItem {
    id: string;
    name: string; 
}

interface IFieldState {
    id: string; 
    selectedKey: string | undefined;
    inputValue: string | undefined;
    items: IItem[];
    message: string;
}

interface ICustomComboBoxProps {
    key: string;
    index: number;
    label: string; 
    value: string;
    updateValue: (v: string) => void; 
    popoverVariant: PopoverVariantType;
    initItems: string[];
}

export const AriaComboBox = ({ key, label, value, updateValue, index, initItems }: ICustomComboBoxProps) => {
   
    let items: IItem[] = initItems?.length ? [...initItems.map((itemName: string, index: number) => {
        return { 
            id: `${index}`, 
            name: itemName 
        }
    })] : []

    let [fieldState, setFieldState] = useState<IFieldState>({
        id: `${key}`,
        selectedKey: '',
        inputValue: value,
        items: items,
        message: 'start typing to view results'
    });

    let { startsWith } = useFilter({ sensitivity: 'base' });

    let onSelectionChange = (key: Key) => {
        setFieldState((prevState: IFieldState) => {
            let selectedItem = prevState.items.find((item: IItem) => item.id === key)
            updateValue(selectedItem?.name ?? '')

            return {
                ...prevState,
                inputValue: selectedItem?.name ?? '',
                selectedKey: key,
                items: items.filter((item) => startsWith(item.name, selectedItem?.name ?? ''))
            }
        })
    }

    let onInputChange = (value: Key) => {
        setFieldState((prevState: IFieldState) => {
            updateValue(value)

            return {
                ...prevState,
                inputValue: value,
                selectedKey: value === '' ? undefined : prevState.selectedKey,
                items: items.filter((item) => startsWith(item.name, value))
            }
        })
    }

    let onOpenChange = (isOpen: boolean, menuTrigger: MenuTriggerAction | undefined) => {
        if (menuTrigger===MenuTriggerActionEnum.MANUAL && isOpen) {
            setFieldState((prevState: IFieldState) => ({
                ...prevState,
                inputValue: prevState.inputValue,
                selectedKey: prevState.selectedKey,
                items: [...items]
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
            allowsCustomValue
        >
            {(item: IItem) => <Item>{item.name}</Item>}
        </ComboBox>
    );
}