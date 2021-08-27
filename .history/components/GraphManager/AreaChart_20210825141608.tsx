import React from 'react'
import { 
    Datum,
    AreaChartProps
} from './interfaces'
import { AxisLeft, AxisBottom } from '@visx/axis'
import { AreaClosed } from '@visx/shape'
import { LinearGradient } from '@visx/gradient'
import { Group } from '@visx/group'
import {
    AXIS_LEFT_TICK_LABEL_PROPS,
    AXIS_BOTTOM_TICK_LABEL_PROPS,
    AXIS_COLOR
} from './constants'