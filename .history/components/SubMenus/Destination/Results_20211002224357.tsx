import React from 'react'

import { useAtomValue } from 'jotai/utils'
import { destinationInputAtom } from '../../../atoms/destination'

import { useSavedDestinations } from '../../'

const Results = () => {
    const destinationInput = useAtomValue(destinationInputAtom)


}