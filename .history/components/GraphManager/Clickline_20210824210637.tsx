import React from 'react'

import useSWR from 'swr' 


export type TimeStamp = number;
export type ClickScore = number;

export interface GetClickHistory {
    clicks?: [TimeStamp, ClickScore][];
};

const CLICK_HISTORY_CHART_ID = 'CLICK_HISTORY';

const { data, loading, error }
