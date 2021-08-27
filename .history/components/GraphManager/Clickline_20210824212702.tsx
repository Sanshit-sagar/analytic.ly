import React from 'react'

import { useClickHistoryForUser } from '../../hooks/useClicks'


export type TimeStamp = number;
export type ClickScore = number;

export interface GetClickHistory {
    clicks?: [TimeStamp, ClickScore][];
};

const CLICK_HISTORY_CHART_ID = 'CLICK_HISTORY'

const ClicksData = ({ amount, range, interval }) => {
    const { clicks, minTimestamp, loading, error } = useClickHistoryForUser(amount, range, interval)


    const data = clicks.map((click: any, index: number) => {
        key: ``
        x: click.x,
        y: click.y,

    })
}
