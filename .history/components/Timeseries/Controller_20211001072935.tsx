import React from 'react'

import { Toolbar } from '../../primitives/Toolbar'
import { TimeSelectionGroup } from './index'


const Controller = () => {

    return (
        <Toolbar aria-label='Timeseries-controls' css={{ height: 30, border: 'none', boxShadow: 'none', width: '98.5%' }}>
            <TimeSelectionGroup />
        </Toolbar>
    )
}

export default Controller