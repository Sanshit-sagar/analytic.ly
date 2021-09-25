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
    service: Service<SavedUrchin[]>,
    mutate: (key: UrchinCategoryType, value: SavedUrchin, payload: SavedUrchin) => Promise<T[]>
}; 

export const useMutationService = (): IMutationResponse<SavedUrchin> => {

    const { primaryEmailAddress } = useClerkSession()

    let [service, setService] = useState<Service<ApiResponse<SavedUrchin[]>>>({ 
        status: ServiceStateEnum.INIT 
    })

    const mutate = (key: UrchinCategoryType, value: SavedUrchin, payload: SavedUrchin): Promise<SavedUrchin> => {
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
                    resolve(service.result)
                })
                .catch((error: Error) => {
                    setService({ 
                        status: ServiceStateEnum.ERROR, 
                        error 
                    })
                    reject(error)
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