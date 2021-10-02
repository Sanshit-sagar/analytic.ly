import React from 'react'

import ParentSize from '@visx/responsive/lib/components/ParentSize'

import Brush from './Brush'

// interface IClick { 
//     x: number;
//     y: number;
// }

const ClickHistory = () => (
    <ParentSize>
        {(_: { resize: (_: any) => void }) =>
            <Brush />
        }
    </ParentSize>  
);

export default ClickHistory


// const start: number = minTimestamp ? parseInt(minTimestamp) : new Date(2021,6,1).getTime()
// const now: number = new Date().getTime()


