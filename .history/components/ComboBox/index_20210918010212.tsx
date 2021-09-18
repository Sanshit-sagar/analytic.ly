import React from 'react'

import { Item } from '@react-stately/collections'

import { ComboBox as ComboBoxComposition } from '../../compositions/ComboBox'
import { useFilter } from '@react-aria/i18n'

import { WritableAtom, useAtom } from 'jotai'

interface IItem {
    id: number;
    name: string; 
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
    label: string; 
    value: string;
    updateValue: (value: string) => void; 
    index: number;
    initOptions: string[];
}


const UrchinComboBox = ({ key, label, value, updateValue, index, initOptions }: IUrchinComboBoxProps) => {
    if(!key || !value || !updateValue) return null; 

    const controlGroupLabel = `${label}`
   
   
    let optionList: IItem[] = initOptions?.length ? [...initOptions.map((option: string, i: number) => { 
        return { id: i, name: option }
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
            {(item: IItem) => <Item>{item.name}</Item>}
        </ComboBoxComposition>
    );
}

const ComboBoxWithAtom = (props: { typeof {...ComboBoxComposition}; WritableAtom<string