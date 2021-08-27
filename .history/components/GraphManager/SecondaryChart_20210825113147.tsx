import React from 'react'

import {
    Datum,
    SecondaryChartProps
} from './interfaces'

import { extent, min, max } from 'd3-array'
import { scaleLinear, scaleTime } from '@visx/scale'

import { Brush } from "@visx/brush"
import BaseBrush from "@visx/brush/lib/BaseBrush"
import { Bounds } from "@visx/brush/lib/types"

{ top: 0, right: 0, bottom: 0, left: 0 },

const SecondaryChart: React.FC<SecondaryChartProps> = ({
    data,
    width=10,
    height,
    margin=DEFAULT_MARGIN,
}) => {

}