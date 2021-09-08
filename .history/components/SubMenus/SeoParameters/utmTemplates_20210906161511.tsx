import React, { Suspense } from 'react'

import { Box } from '../../../primitives/Box'
import { Flex } from '../../../primitives/Flex'

// import { Text } from '../../../primitives/Text'
// import { fetcher } from '../../../lib/utils/fetcher'
// import useSWR from 'swr'

// const SeoParamResult = () => {
    // const id = useAtom(postId)
    // const { data, error } = useSWR(`/api/urchins/user/sanshit.sagar@gmail.com`, fetcher)

    // if(!data && !error) return <Text> {id} loading... </Text>;
    // if(error) return <Text> error: {error && error.message} </Text>;
    // return <Text css={{ color: '$text' }}> {data ? JSON.stringify(data) : 'No data to show'} </Text>;
// }



export const SeoParams = () => {
   
    return (
        <Box css={{ backgroundColor: 'transparent', height: '300px', width: '300px' }}>
            <Flex css={{ fd: 'column', jc: 'space-between', ai: 'stretch' }}>
                <Suspense fallback={`loading...`}>
                    <DynamicAtomicComponent />
                </Suspense>
            </Flex>
        </Box>
    );
}