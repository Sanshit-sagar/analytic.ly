
import React from 'react'

import { Box } from '../../../primitives/Box'
import { Text } from '../../../primitives/Text'

import { useAtom } from 'jotai'
import { runFetchAtom } from '../../../atoms'
import dynamic from 'next/dynamic'

const DynamicLazyComponent = dynamic(() => {
    import('../components/hello4'), {
    suspense: true,
})

runFetchAtom.onMount = (runFetch) => {
    runFetch('https://json.host.com')
}
  
export const SeoParams = () => {
    const [result] = useAtom(runFetchAtom)

    console.log(result);
    return (
        <Box css={{ backgroundColor: '#fff', height: '300px', width: '300px' }}>
            <Text> {JSON.stringify(result)} </Text>
        </Box>
    )
}
