import React from 'react'

import { Item } from '@react-stately/collections'

import { ComboBox as ComboBoxComposition } from '../../compositions/ComboBox'
import { useFilter } from '@react-aria/i18n'
import { useAtom, WritableAtom } from 'jotai'
import { MenuTriggerAction, MenuTriggerActionEnum } from '../../compositions/interfaces'

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
    initOptions: string[];
}


export const ComboBox = ({ key, label, datumAtom, index, initOptions }: ICustomComboBoxProps) => {
    if(!key || datumAtom) return null; 

    const [value, setValue] = useAtom<string, React.SetStateAction<string>>(datumAtom)
    const updateValue = (updatedValue: string) => setValue(updatedValue)

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
            menuTriggerAction={MenuTriggerActionEnum.FOCUS}
        >
            {(item: IItem) => <Item>{item.name}</Item>}
        </ComboBoxComposition>
    );
}