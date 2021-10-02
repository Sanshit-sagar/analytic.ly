import React from 'react'

import { Toolbar } from '../../primitives/Toolbar'
import { TimeSelectionGroup } from './index'

const Controller = () => {

    return (
        <Toolbar aria-label='Timeseries-controls' css={{ height: 35, border: 'none' }}>
            <TimeSelectionGroup />
        </Toolbar>
    );
}

export default Controller