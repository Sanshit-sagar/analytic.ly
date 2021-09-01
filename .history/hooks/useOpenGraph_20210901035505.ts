
 
import useSWR from 'swr'
import { fetcher } from '../../lib/utils/fetcher'

import { IOpenGraphPreviewProps } from '../'
onst OpenGraphSummary = ({ destinationInput, isDestValid }: IOpenGraphPreviewProps) => {
   const { metadata, loading, error } = useOpenGraph(isDestValid, destinationInput)
 
   if(loading) return <Text>loading...</Text> 
   if(error) return <Text>Error: {error.message} </Text> 
   if(!metadata) return <Text> No data to show</Text>
 
   return <Text> {JSON.stringify(metadata)} </Text>
}