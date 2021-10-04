import React from 'react'

import { Group } from '@visx/group'
import { curveBasis } from '@visx/curve'
import { LinePath } from '@visx/shape'
import { Threshold } from '@visx/threshold'
import { scaleTime, scaleLinear } from '@visx/scale'
import { AxisLeft, AxisBottom } from '@visx/axis'
import { GridRows, GridColumns } from '@visx/grid'

export const  background = '#f3f3f3'


interface ThresholdProps {
    height?: number;
    width?: number;
    margin?: { top:number; bottom: number; left: number; right:number };
}

const defaultMargin = { top: 40, right: 30, bottom: 50, left: 40 };


