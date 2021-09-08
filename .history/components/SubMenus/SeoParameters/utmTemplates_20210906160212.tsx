
import React from 'react'

import { Box } from '../../../primitives/Box'
import { Flex } from '../../../primitives/Flex'
import { Text } from '../../../primitives/Text'

import { atom, useAtom } from 'jotai'
import { fetcher } from '../../../lib/utils/fetcher'

import useSWR from 'swr'



// const SeoParamResult = () => {
    // const id = useAtom(postId)
    // const { data, error } = useSWR(`/api/urchins/user/sanshit.sagar@gmail.com`, fetcher)

    // if(!data && !error) return <Text> {id} loading... </Text>;
    // if(error) return <Text> error: {error && error.message} </Text>;
    // return <Text css={{ color: '$text' }}> {data ? JSON.stringify(data) : 'No data to show'} </Text>;
// }
const urlAtom = atom('/api/urchins/user/sanshit.sagar@gmail.com')
const fetchUrlAtom = atom(async (get) => {
    const response = await fetch(get(urlAtom))
    return await response.json()
})

const SeoParamResult = () => {
    const [fetchResult] = useAtom(fetchUrlAtom)

    return (
       <p> {JSON.stringify(fetchResult)} </p> 
    )
}

export const SeoParams = () => {
   

    return (
        <Box css={{ backgroundColor: 'transparent', height: '300px', width: '300px' }}>
            <Flex css={{ fd: 'column', jc: 'space-between', ai: 'stretch' }}>
                <Suspense>
                    <SeoParamResult />
                </Suspense>
            </Flex>
        </Box>
    );
}