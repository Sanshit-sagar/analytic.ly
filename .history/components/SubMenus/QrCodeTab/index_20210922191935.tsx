import { useEffect, useState } from 'react'

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

interface IUrchin {
    id: string;
    name: 
}

export const AsyncListTest = async () => {
    const [result, setResult] = useState<Service<
   
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