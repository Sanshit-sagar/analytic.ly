import { useState } from 'react'
import { useAsyncList } from '@react-aria/'

interface Payload {
    count: number;
    next: string | null;
    previous: string | null; 
    results: string[];
}


export const AsyncListTest2 = () => {
    let [url, setUrl] = useState(`api/urchins/user/sanshit.sagar@gmail.com/medium`)

    let list = useAsyncList({
        async load({ signal:  }) {
            let res: Promise<any> = await fetch(url, {signal}) 
            let json: Promise<Payload> = await res.json()
            return { items: json.results }
        }
    })

}


export const AsyncListTest = () => <AsyncListTest2 /> 