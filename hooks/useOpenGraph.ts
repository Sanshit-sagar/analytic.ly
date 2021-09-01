
 
// import useSWR from 'swr'
// import { fetcher } from '../../lib/utils/fetcher'

// import { Text } from '../primitives/Text'
// import { IOpenGraphPreviewProps } from '../components/SubMenus/DestinationTab'

// const OpenGraphSummary = ({ destinationInput, isDestValid }: IOpenGraphPreviewProps) => {
//    const { metadata, loading, error } = useOpenGraph(isDestValid, destinationInput)
 
//    if(loading) return <Text>loading...</Text> 
//    if(error) return <Text>Error: {error.message} </Text> 
//    if(!metadata) return <Text> No data to show</Text>
 
//    return <Text> {JSON.stringify(metadata)} </Text>
// }

// export default OpenGraphSummary