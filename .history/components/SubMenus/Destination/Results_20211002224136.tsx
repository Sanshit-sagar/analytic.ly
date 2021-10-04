import React from 'react'
import { useAtomValue } from 'jotai/utils'
import { destinationInputAtom } from '../../../atoms/destination'

const Results = () => {
    const destinationInput = useAtomValue(destinationInputAtom)
}