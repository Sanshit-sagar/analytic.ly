
import React from 'react'
import { atom, jotai } from 'jotai'
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

