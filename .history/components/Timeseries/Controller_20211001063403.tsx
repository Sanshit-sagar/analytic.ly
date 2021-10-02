import React from 'react'

import { Text } from '../../primitives/Text'
import { Toolbar } from '../../primitives/Toolbar'
import { TimeSelectionGroup } from './index'
import { useDateFormatter } from '@react-aria/i18n'

function MovingAverageFactory() {
    return ]
}
const movingAverageAtom = atom(MovingAverageFactory())

const Controller = ({ details, data }: { details: any; data: any[]; }) => {
    const formatter= useDateFormatter({ dateStyle: 'full', timeStyle: 'long' })

    return (
        <Toolbar aria-label='Timeseries-controls' css={{ height: 30, border: 'none', boxShadow: 'none', width: '98.5%' }}>
            <Text> {formatter.format(details.start)} to  {formatter.format(details.end)}</Text>
            <Text> {data.length} </Text> 
            <TimeSelectionGroup />
        </Toolbar>
    )
}

export default Controller