
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


export const useService = (url: string) => {
    const [result, setResult] = useState<Service<>({
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