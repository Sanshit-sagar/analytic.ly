
import React from 'react'
import { atom, jotai } from 'jotai'
import { runFetchAtom } from '../../../atoms'

runFetchAtom.onMount = (runFetch) => {
    runFetch('https://json.host.com')
}
  
const SeoParams = () => {
    const [result] = useAtom(runFetchAtom)

    
    
}

