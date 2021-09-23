import React, { useState } from 'react'

import { Item } from '@react-stately/collections'

import { useFilter } from '@react-aria/i18n'
import { MenuTriggerAction, MenuTriggerActionEnum, Key } from '../../compositions/interfaces'
import { ComboBox } from '../../compositions/ComboBox'
import { Text } from '../../primitives/Text'

import { useAsyncList } from '@react-stately/data'
// import { useMutableUserUrchins } from '../../hooks/useUserCollections'

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
}


export const AriaComboBox = ({ key, label, value, updateValue, index }: ICustomComboBoxProps) => {
  
    // let items: IItem[] = data?.categorizedUrchins?.length ? [...initItems.map((itemName: string, index: number) => {
    //     return { 
    //         id: `${index}`, 
    //         name: itemName 
    //     }
    // })] : []

    let list = useAsyncList({
        async load({ signal }) {
            let res = await fetch(`/api/urchins/user/sanshit.sagar@gmail.com/content`, { signal })
            let json = await res.json()

            return {
              items: json.results
            }
        }
    })

    let items: IItem[] = [];

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
            let selectedItem = fieldState.items.find((item: IItem) => item.id === key)
            updateValue(selectedItem?.name ?? '')

            return {
                ...prevState,
                selectedKey: key,
                inputValue: selectedItem?.name ?? '',
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
                selectedKey: items.find((item) => startsWith(item.name, value)) ? items?.length ? items[0] : prevState.selectedKey : prevState.selectedKey,
                items: items.filter((item) => startsWith(item.name, value))
            }
        })
    }

    let onOpenChange = (isOpen: boolean, menuTrigger: MenuTriggerAction | undefined) => {
        if (menuTrigger===MenuTriggerActionEnum.MANUAL && isOpen) {
            setFieldState((prevState: IFieldState) => ({
                ...prevState,
                inputValue: value,
                selectedKey: key,
                items: [...items]
            }));
        }
    }
  

    let addSlugToCollection = async (value: string, key: string) => {
        alert(`savng ${key} and ${value}`)
    }

    return (
        <Text> {JSON.stringify(list.items)} </Text> 
    )

    // return (
    //     <ComboBox
    //         key={index}
    //         label={label}
    //         placeholder={`Search ${label.toLowerCase()}s`}
    //         items={list.items}
    //         selectedKey={fieldState.selectedKey}
    //         inputValue={fieldState.inputValue}
    //         onOpenChange={onOpenChange}
    //         onSelectionChange={onSelectionChange}
    //         onInputChange={onInputChange}
    //         menuTriggerAction={MenuTriggerActionEnum.MANUAL}
    //         allowsCustomValue={true}
    //         disallowEmptySelection={true}
    //         defaultInputValue={fieldState.items?.length ? fieldState.items[0].name : ''}
    //         commit={addSlugToCollection}
    //     >
    //         {(item: IItem) => <Item> {item.name} </Item>}
    //     </ComboBox>
    // );
}






  // var myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/json");
       
        // var requestOptions = {
        //         method: 'POST',
        //         headers: myHeaders,
        //         body: JSON.stringify({
        //             "utmKey": key,
        //             "utmValue": value
        //         }),
        // }
         
        // await fetch(`/api/urchins/user/sanshit.sagar@gmail.com/${key}/${value}`, requestOptions)
        // .then((response) => response.text())
        // .then((result) => {
        //     alert(`response: ${result}`)
        // })
        // .catch((error) => {
        //     setMutationErrors(error);
        // })