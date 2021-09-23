import { useState } from 'react'
import { useAsyncList } from '@react-stately/data'
import { SortDescriptor, LoadingState, LoadingStateEnum } from './types'
import { ComboBox } from '../../../compositions/ComboBox'

interface ApiResponse {
    count: number;
    previous: string | undefined; 
    next: string | undefined; 
    results: string[] | undefined;
}

interface AsyncListStateUpdate<T, C> {
    cursor: C; 
    filterText: string; 
    items: Iterable<T>;
    selectedKeys: Iterable<Key>; 
    sortDescriptor: SortDescriptor;
}

interface AsyncListLoadOptions<T, C> {
    items: T[];
    selectedKeys: Selection; 
    sortDescriptor: SortDescriptor;
    signal: AbortSignal; 
    cursor: C;
    filterText: string;
    loadingState: LoadingState;
}

export const AsyncListTest2 = () => {
    let [url, setUrl] = useState(`api/urchins/user/sanshit.sagar@gmail.com/medium`)

    const list = useAsyncList({
        async load({ signal }: { signal: AbortSignal }) {
            let res = await fetch(url, { signal }) 
            let json = await res.json()
            return { items: json.results }
        }
    })

    return (
        <ComboBox label={'test run'}>
            {(item) => (
                <Item key={item.name}> 
                    {item.name} 
                </Item>
            )}
        </ComboBox>
    )
}


export const AsyncListTest = () => <AsyncListTest2 /> 