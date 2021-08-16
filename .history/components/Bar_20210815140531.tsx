import React, { useMemo } from 'react' 
import { Bar } from '@visx/shape'
import { Group } from '@visx/group'
import { scaleBand, scaleLinear } from '@visx/scale'
import { GradientTealBlue } from '@visx/gradient'


export type IBarProps = {
    height: number;
    width: number;
    events?: boolean; 
}

const Bars = ({ width, height, events = false}: IBarProps) => {




}

export default Bars