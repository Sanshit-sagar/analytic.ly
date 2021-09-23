import { useEffect, useState } from 'react'
import { Text } from '../../'

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
        }
    }, [url]); 
   
    return result; 
}

export const AsyncListTest = async () => {
    
    const { status, payload, error } = useService() 
    
    if(status==='loading') return <Text> loading... </Text>
    if(status==='error') return <Text> Error: {error?.message ?? 'n/a'} </Text>
    if(status==='loaded' && !payload) return <Text> No data </Text>

    return (
       <Text size='2' css={{ color: '$funkyText' }}>
           {JSON.stringify(payload)}
       </Text> 
    )
}