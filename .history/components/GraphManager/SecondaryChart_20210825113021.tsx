import React from 'react'

import {
    Datum,
    SecondaryChartProps
} from './interfaces'

import { extent, min, max } from 'd3-array'
import { scaleLinear, scaleTime } from '@visx/scale'

import { Brush } from "@visx/brush";
import BaseBrush from "@visx/brush/lib/BaseBrush";
import { Bounds } from "@visx/brush/lib/types"