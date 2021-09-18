import React, { useState, SetStateAction } from 'react'

import { Item } from '@react-stately/collections'

import { useFilter } from '@react-aria/i18n'
import { useAtom, WritableAtom } from 'jotai'
import { MenuTriggerAction, MenuTriggerActionEnum, Key } from '../../compositions/interfaces'
import { ComboBox } from '../../compositions/ComboBox'
import { atom } from 'jotai'

interface IItem {
    id: number;
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
    datumAtom: WritableAtom<string, SetStateAction<string>>; 
    initItems: string[];
}

const saveUrchinAtom = atom<string>(undefined);
const 
const baseComboBoxItemsAtom = atom<IItem[]>([]);
const addComboBoxItemsAtom = atom(
    null,
    (get,set,newItemName: string) => {
        set(baseComboBoxItemsAtom, [
            ...get(baseComboBoxItemsAtom), 
            {
                id: get(baseComboBoxItemsAtom).length,
                name: newItemName
            }
        ]);
    }
)

export const AriaComboBox = ({ key, label, datumAtom, index, initItems }: ICustomComboBoxProps) => {

    const [value, setValue] = useAtom<string, SetStateAction<string>>(datumAtom)
    const updateValue = (updatedValue: string) => setValue(updatedValue)
   
   
    let items: IItem[] = initItems?.length ? [...initItems.map((itemName: string, index: number) => {
        return { 
            id: index, 
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
            let selectedItem = prevState.items.find((item: IItem) => item.id === parseInt(key))
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
            allowsCustomValue={true}
        >
            {(item: IItem) => <Item>{item.name}</Item>}
        </ComboBox>
    );
}