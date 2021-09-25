import { useState } from 'react' 
import { useClerkSession } from './useClerk'
import { 
    SavedUrchin,
    UrchinCategoryType 
} from '../components/SubMenus/Urchins/interfaces'

interface ApiResponse<T> {
    count: number; 
    next: string | undefined;
    previous: string | undefined;
    result: T;
}

export enum ServiceStateEnum {
    INIT ='init',
    LOADING = 'loading',
    LOADED = 'loaded',
    ERROR = 'error'
}

export type Service<T> =
    | ServiceInit
    | ServiceLoading
    | ServiceLoaded<T>
    | ServiceError;

export interface ServiceInit { 
    status: ServiceStateEnum.INIT; 
};

export interface ServiceLoading { 
    status: ServiceStateEnum.LOADING; 
};

export interface ServiceLoaded<T> {
    status: ServiceStateEnum.LOADED;
    payload: T;
};

export interface ServiceError {
    status: ServiceStateEnum.ERROR;
    error: Error;
}

interface IMutationResponse<T> {
    service: Service<T>,
    mutate: (key: UrchinCategoryType, value: T, payload: T) => Promise<T[]>
}; 



export const useMutate = (): IMutationResponse<SavedUrchin> => {

    const { primaryEmailAddress } = useClerkSession()

    let [service, setService] = useState<Service<ApiResponse<SavedUrchin[]>>>({ 
        status: ServiceStateEnum.INIT 
    })

const mutate = (key: UrchinCategoryType, value: SavedUrchin, payload: SavedUrchin): Promise<{ 
    Service<ApiResponse<SavedUrchin[]>>,
    any 
}> => {
        setService({ status: ServiceStateEnum.LOADING })

        let postHeaders =  new Headers()
        let options = {
            method: 'POST',
            headers: postHeaders,
            body: JSON.stringify({ key, value, payload })
        };

        postHeaders.append('Content-Type', 'application/json; charset=utf-8')

        return new Promise((resolve, reject) => {
            fetch(`/api/urchins/user/${primaryEmailAddress}/${key}/${value}`, options)
                .then((response) => response.json())
                .then((result: ApiResponse<SavedUrchin[]>) => {
                    setService({ 
                        status: ServiceStateEnum.LOADED,
                        payload: result
                    })
                    resolve(service)
                })
                .catch((error: Error) => {
                    setService({ 
                        status: ServiceStateEnum.ERROR, 
                        error 
                    })
                    reject(service)
                });
            }
        );
    }

    return {
        service,
        mutate
    }
}

useMutationService