import { useEffect, useState } from 'react'
import { Text } from '../../../primitives/Text'

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
            fetch(url)
                .then((response) => response.json())
                .then((result) => setResult({ status: 'loaded', payload: result }))
                .catch((error) => setResult({ status: 'error', error }));
        }
    }, [url]); 
   
    return result; 
}

export const AsyncListTest = () => {
    let [url, setUrl] = useState(`api/urchins/user/sanshit.sagar@gmail.com/medium`)
    const service = useService(url) 
    
    if(service.status==='loading') return <Text> loading... </Text>
    if(service.status==='error') return <Text> Error: {error?.message ?? 'n/a'} </Text>
    if(service.status==='loaded' && !service.payload) return <Text> No data </Text>

    return (
       <Text size='2' css={{ color: '$funkyText' }}>
           {JSON.stringify(service.payload)}
       </Text> 
    )
}