
import React from 'react'

import { Box } from '../../../primitives/Box'
import { Text } from '../../../primitives/Text'

import { atom, useAtom } from 'jotai'
// import { runFetchAtom } from '../../../atoms'
// import dynamic from 'next/dynamic'

const postId = atom(9001)

export const SeoParams = () => {
    const id = useAtom(postId)
    const { data, error } = useSWR('https://hacker-news.firebaseio.com/v0/item/${id}.json')

    if(!data )
    return (
        <Box css={{ backgroundColor: '#fff', height: '300px', width: '300px' }}>
            <Text> {JSON.stringify(result)} </Text>
        </Box>
    )
}
