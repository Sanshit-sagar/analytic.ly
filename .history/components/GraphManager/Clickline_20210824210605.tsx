import React from 'react'

import useSWR from 'swr' 


export type TimeStamp = number;
export type ClickScore = number;

export interface GetClickHistory {
    clicks?: [TimeStamp, ClickScore][];
};

const CHART_ID = CLICK_HISTORY
