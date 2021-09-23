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
    name: string; 
}

const useService = (url: string) => {
    const [result, setResult] = useState<Service<IUrchin>>({
        status: 'loading',
    }); 

    useEffect(() => {
        if(url) {
            fetch(`api/urchins/user/sanshit.sagar@gmail.com/medium`)
                .then((response) => response.json())
                .then((result) => setResult({ status: 'loaded', payload: result }))
                .catch((error) => setResult({ status: 'error', error }));
        }, [url])
   
    return result; 
}

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