

import { useService } from '../../../'
import { Text } from '../../../primitives/Text'



export const AsyncListTest = () => {
    let [url, setUrl] = useState(`api/urchins/user/sanshit.sagar@gmail.com/medium`)
    const service = useService(url) 
    
    if(service.status==='loading') return <Text> loading... </Text>
    if(service.status==='error') return <Text> Error: {error?.message ?? 'n/a'} </Text>
    if(service.status==='loaded' && !service.payload) return <Text> No data </Text>

    return (
       <Text size='2' css={{ color: '$funkyText' }}>
           {JSON.stringify(service.payload)}
       </Text> 
    )
}