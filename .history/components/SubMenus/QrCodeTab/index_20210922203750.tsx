import { useState } from 'react'
import { useService, Service } from '../../../hooks/useService'
import { Text } from '../../../primitives/Text'
import { Flex } from '../../../primitives/Flex'

interface IUrchin {
    id: string;
    name: string; 
}

export const AsyncListTest = () => {
    let [url, setUrl] = useState(`api/urchins/user/sanshit.sagar@gmail.com/medium`)
    
    const service: Service<IUrchin> = useService(url) 
    
    if(service.status==='loading') return <Text> loading... </Text>
    if(service.status==='error') return <Text> Error: {service.error?.message ?? 'n/a'} </Text>
    
    let payload = service.status === 'loaded' ? service?.payload : 'No Data'

    return (
        <Flex css={{ height: '100%', width: '100%', fd: 'column', jc: 'flex-start', ai: 'center', gap: '$1'}}>
            {payload?.results?.map((item: string, index: number) => (
                <Text key={`item-${index`} size='2' css={{ color: '$funkyText' }}>
                    {item}
                </Text>
            ))}
        </Flex>
    )
}