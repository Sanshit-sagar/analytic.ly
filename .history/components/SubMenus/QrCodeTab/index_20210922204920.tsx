import { useState } from 'react'
import { useAsyncList } from '@react-stately/data'


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