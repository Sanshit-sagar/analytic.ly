import React from 'react'

import { Text } from '../../primitives/Text'
import { Toolbar } from '../../primitives/Toolbar'
import { TimeSelectionGroup } from './index'


const Controller = ({ details, data }: { details: any; data: any[]; }) => {


    return (
        <Toolbar aria-label='Timeseries-controls' css={{ height: 30, border: 'none', boxShadow: 'none', width: '98.5%' }}>
            <TimeSelectionGroup />
        </Toolbar>
    )
}

export default Controller