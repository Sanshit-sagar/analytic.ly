import { useState } from 'react'
import { useService, Service } from '../../../hooks/useService'
import { Text } from '../../../primitives/Text'

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
        <>
        {payload?.results?.map(())}
       <Text size='2' css={{ color: '$funkyText' }}>
       </Text> 
    )
}