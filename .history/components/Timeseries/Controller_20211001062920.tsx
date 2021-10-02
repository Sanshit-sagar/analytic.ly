import React from 'react'

import { Text } from '../../primitives/Text'
import { Toolbar } from '../../primitives/Toolbar'
import { TimeSelectionGroup } from './index'
import { useDateFormatter } from '@react-aria/i18n'

const Controller = ({ details, data }: { details: any; data: any[]; }) => {
    const formatter = useDateFormatter()

    return (
        <Toolbar aria-label='Timeseries-controls' css={{ height: 30, border: 'none', boxShadow: 'none', width: '98.5%' }}>
            <Text> {formatter(details.start} {details.end} </Text>
            <TimeSelectionGroup />
        </Toolbar>
    )
}

export default Controller