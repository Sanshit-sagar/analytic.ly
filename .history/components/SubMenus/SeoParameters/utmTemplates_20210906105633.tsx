
import React from 'react'

import { Box } from '../../../primitives/Box'
import { Text } from '../../../primitives/Text'

import { atom, useAtom } from 'jotai'
import { runFetchAtom } from '../../../atoms'



runFetchAtom.onMount = (runFetch) => {
    runFetch('https://json.host.com')
}
  
const SeoParams = () => {
    const [result] = useAtom(runFetchAtom)

    console.log(result);
    return (
        <Box css={{ backgroundColor: '#fff', height: '300px', width: '300px' }}>
            <Text> {result} </Text>
        </Box>
    )
}


export default 
