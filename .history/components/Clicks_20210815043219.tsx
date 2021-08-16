import React from 'react'
// import { useClicks } from '../hooks/useClicks'
// import ControlPanel from './ControlPanel'
import useSWR from 'swr'
import { fetcher } from '../lib/utils/fetcher'


export interface IClicksProps {
    clicks: any[] | null;
    loading: boolean;
    error: any | null; 
}

export interface IClickProps {
    click: any;
    index: number; 
}

interface IClicksErrorProps {
    error: any | null;
}

const ChartSkeleton = () => {

    return (
        <p> loading... </p> 
    )
}

const ChartError = ({ error }: IClicksErrorProps) => {

    return (
        <p> Error {error?.message || '.'} </p> 
    )
}

interface INoDataProps {
    endpoint: string; 
}

const NoChartDataPlaceholder = ({ endpoint }: INoDataProps ): React.ReactElement => {
    return (
         <p> {endpoint} -- Found no data, add some <a href='#'> here </a>  </p>
    );
}


const Click = ({ click, index }: IClickProps) => {
    // use accessor to display only { x:_, y:_ }
    return (
        <>
            <p> {index}: {JSON.stringify(click)} </p>
        </>
    )
}

const useAggregatedClicks = (endpoint: string) => {
    const { data, error } = useSWR(endpoint, fetcher);

    return {
        timeseries: data || null,
        loading: !data && !error,
        error
    }

}
const Clicks = ({ clicksEndpoint = '/api/metrics/clickstream/recent/24/hours' }) => {
    const { timeseries, loading, error } = useAggregatedClicks(clicksEndpoint); 
    

    if(loading) return <ChartSkeleton /> 
    if(!timeseries) return <NoChartDataPlaceholder endpoint={clicksEndpoint} />
    if(error) return <ChartError error={error} /> 

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
            {/* <ControlPanel updateEndpoint={handleEndpointUpdate} /> */}
            <div style={{ 
                display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', 
                alignItems: 'center', flexWrap: 'wrap',  overflowY: 'scroll', 
                padding: '2.5px', border: 'thin solid black', 
                height: '400px', maxWidth: '1000px'
            }}>
                {timeseries.map(function(click: any, i: number) {
                    return (
                        <Click click={click} index={i}/> 
                    )
                })}
            </div>
        </div>
    )
}

export default Clicks 
