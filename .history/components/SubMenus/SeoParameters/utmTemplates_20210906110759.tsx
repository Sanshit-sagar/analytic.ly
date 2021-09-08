
import React from 'react'

import { Box } from '../../../primitives/Box'
import { Text } from '../../../primitives/Text'

import { atom, useAtom } from 'jotai'
// import { runFetchAtom } from '../../../atoms'
// import dynamic from 'next/dynamic'

const postId = atom(9001)

export const SeoParams = () => {
    const id = useAtom(postId)
    const { data, error } = useSWR(`https://hacker-news.firebaseio.com/v0/item/${id}.json')

    if(!data && !error) return <Text> loading... </Text>;
    if(error) return <Text> error: {error && error.message} </Text>;
    return <Text> {JSON.stringify(result)} </Text>;
}
