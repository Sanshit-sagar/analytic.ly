import { useState } from 'react'
import { useAsyncList } from '@react-stately/data'
import { SortDescriptor, LoadingState, LoadingState}
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

    let list = useAsyncList({
        async load({ signal:  }) {
            let res: Promise<any> = await fetch(url, { signal }) 
            let json: Promise<Payload> = await res.json()
            return { items: json.results }
        }
    })

}


export const AsyncListTest = () => <AsyncListTest2 /> 