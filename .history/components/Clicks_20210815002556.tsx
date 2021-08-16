import React from 'react'
import { useClicks } from '../hooks/useClicks'
import ControlPanel from './ControlPanel'

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
    return (
        <>
            <p> {index}: {JSON.stringify(click)} </p>
        </>
    )
}
const Clicks = ({ clicksEndpoint }) => {
    const { clicks, loading, error }: IClicksProps = useClicks(clicksEndpoint); 
    

    if(loading) return <ChartSkeleton /> 
    if(!clicks) return <NoChartDataPlaceholder endpoint={clicksEndpoint} />
    if(error) return <ChartError error={error} /> 

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
            {/* <ControlPanel updateEndpoint={handleEndpointUpdate} /> */}
            <div style={{ 
                display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', 
                alignItems: 'center', flexWrap: 'wrap',  overflowY: 'scroll', 
                padding: '2.5px', border: 'thin solid black', 
                height: '400px', maxWidth: '800px'
            }}>
                <>
                    {clicks.map(function(click: any, i: number) {
                        return (
                            <Click click={click} index={i}/> 
                        )
                    })}
                </>
            </div>
        </div>
    )
}

export default Clicks 
