import React from 'react'
import { useAsyncList } from '@react-stately/data'
import { ComboBox } from '../../../compositions/ComboBox'
import { Item } from 'react-stately'

interface ServiceInit {
    status: 'init';
}

interface ServiceLoading {
    status: 'loading';
}

  interface ServiceLoaded<T> {
    status: 'loaded';
    payload: T;
  }
  interface ServiceError {
    status: 'error';
    error: Error;
  }
  export type Service<T> =
    | ServiceInit
    | ServiceLoading
    | ServiceLoaded<T>
    | ServiceError;

export const AsyncListTest = async () => {
    
   
    return (
        <ComboBox
            label="Star Wars Character Lookup"
            items={list.items}
            inputValue={list.filterText}
            onInputChange={list.setFilterText}
            loadingState={list.loadingState}
        >
            {(item: any) => <Item key={item.name}>{item.name} </Item>}
        </ComboBox>
    )
}