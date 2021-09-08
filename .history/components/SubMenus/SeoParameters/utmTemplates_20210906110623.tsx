
import React from 'react'

import { Box } from '../../../primitives/Box'
import { Text } from '../../../primitives/Text'

import { atom, useAtom } from 'jotai'
// import { runFetchAtom } from '../../../atoms'
// import dynamic from 'next/dynamic'


export const SeoParams = () => {
    const { data, error } = useSWR('https://hacker-news.firebaseio.com/v0/item/${id}.json')

    console.log(result);
    return (
        <Box css={{ backgroundColor: '#fff', height: '300px', width: '300px' }}>
            <Text> {JSON.stringify(result)} </Text>
        </Box>
    )
}
