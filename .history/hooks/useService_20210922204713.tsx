
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
    | ServiceError

interface Payload {
    count: number;
    next: string | null;
    previous: string | null; 
    results: string[];
}

export const useService = (url: string) => {
    const [result, setResult] = useState<Service<Payload>>({
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



export const AsyncListTest1 = () => {
    let [url, setUrl] = useState(`api/urchins/user/sanshit.sagar@gmail.com/medium`)
    
    const service: Service<Payload> = useService(url) 
    
    if(service.status==='loading') return <Text> loading... </Text>
    if(service.status==='error') return <Text> Error: {service.error?.message ?? 'n/a'} </Text>
    let payload: Payload = service.status === 'loaded' ? service?.payload :  

    return (
        <Flex css={{ height: '100%', width: '100%', fd: 'column', jc: 'flex-start', ai: 'center', gap: '$1'}}>
            {payload.results?.map((item: string, index: number) => (
                <Text 
                    key={`item-${index}`} 
                    size='2' 
                    css={{ color: '$funkyText' }}
                >
                    {item}
                </Text>
            ))}
        </Flex>
    )
}