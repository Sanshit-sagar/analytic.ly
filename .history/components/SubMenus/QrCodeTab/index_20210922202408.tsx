import { useState } from 'react'
import { useService, Service } from '../../../hooks/useService'
import { Text } from '../../../primitives/Text'
import { useUser } from '@clerk/nextjs' 

interface IUrchin {
    id: string;
    name: string; 
}

export const AsyncListTest = () => {
    const { email } = useUser();

    let [url, setUrl] = useState(`api/urchins/user/sanshit.sagar@gmail.com/medium`)
    
    const service: Service<IUrchin> = useService(url, typeof IUrchin) 
    
    if(service.status==='loading') return <Text> loading... </Text>
    if(service.status==='error') return <Text> Error: {service.error?.message ?? 'n/a'} </Text>
    if(service.status==='loaded' && !service.payload) return <Text> No data </Text>

    let payload: ServiceLoaded<IUrchin> = s
    return (
       <Text size='2' css={{ color: '$funkyText' }}>
           {JSON.stringify(service.payload)}
       </Text> 
    )
}