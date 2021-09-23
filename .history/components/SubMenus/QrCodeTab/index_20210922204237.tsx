import { useState } from 'react'
import { useService, Service } from '../../../hooks/useService'
import { Text } from '../../../primitives/Text'
import { Flex } from '../../../primitives/Flex'

interface Payload {
    count: number;
    next: string | null;
    previous: string | null; 
    results: string[];
}

export const AsyncListTest = () => {
    let [url, setUrl] = useState(`api/urchins/user/sanshit.sagar@gmail.com/medium`)
    
    const service: Service<Payload> = useService(url) 
    
    if(service.status==='loading') return <Text> loading... </Text>
    if(service.status==='error') return <Text> Error: {service.error?.message ?? 'n/a'} </Text>
    
    let payload: Payload = service.status === 'loaded' ? service?.payload : { count: 0, next: null, previous: null, results: [] }; 

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

export const AsyncListTest