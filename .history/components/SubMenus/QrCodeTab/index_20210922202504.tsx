import { useState } from 'react'
import { useService, Service } from '../../../hooks/useService'
import { Text } from '../../../primitives/Text'
import { useUser } from '@clerk/nextjs' 

export const AsyncListTest = () => {
   

    let [url, setUrl] = useState(`api/urchins/user/sanshit.sagar@gmail.com/medium`)
    
    const service: Service<IUrchin> = useService(url) 
    
    if(service.status==='loading') return <Text> loading... </Text>
    if(service.status==='error') return <Text> Error: {service.error?.message ?? 'n/a'} </Text>
    if(service.status==='loaded' && !service.payload) return <Text> No data </Text>

    let payload: ServiceLoaded<IUrchin> = service.payload;

    return (
       <Text size='2' css={{ color: '$funkyText' }}>
           {JSON.stringify(payload)}
       </Text> 
    )
}