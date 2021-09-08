
import React from 'react'
import { atom, jotai } from 'jotai'

import { runFetch } from '../../../atoms


runFetchAtom.onMount = (runFetch) => {
    runFetch('https://json.host.com')
}
  

const SeoParams = () => {
    
}

