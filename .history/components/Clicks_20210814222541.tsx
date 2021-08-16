import { useClicks } from '../hooks/useClicks'

const CLICKS_ENDPOINT: string = '/api/clicks/sanshit.sagar@gmail.com'

interface IClicksProps {
    clicks: any[] | null;
    loading: boolean;
    error: any | null; 
}

interface IClickProps {
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

const NoChartDataPlaceholder = () => {
    return (
         <p> Found no data, add some <a href='#'> here </a>  </p>
    );
}

const Click = ({ click, index }: IClickProps) => {
    return (
        <>
            <p> {index}: {JSON.stringify(click)} </p>
        </>
    )
}

const ControlPanel = () => {

    return (
        <>
            <button type="button"> 1min </button>
            <button type="button"> 10min </button>
            <button type="button"> 30min </button>
            <button type="button"> 1hour </button>
            <button type="button"> 24hour </button>
            <button type="button"> 48hour </button>
        </>
    )
}

const Clicks = () => {
    const { clicks, loading, error }: IClicksProps = useClicks(CLICKS_ENDPOINT); 

    if(loading) return <ChartSkeleton /> 
    if(!clicks) return <NoChartDataPlaceholder />
    if(error) return <ChartError error={error} /> 

    return (
        <div style={{ 
            display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', 
            alignItems: 'center', flexWrap: 'wrap',  overflowY: 'scroll', 
            padding: '2.5px', border: 'thin solid black', 
            height: '400px', maxWidth: '800px'
        }}>
            <ControlPanel />
            <>
            {clicks.map(function(click: any, i: number) {
                return (
                   <Click click={click} index={i}/> 
                )
            })}
            </>
        </div>
    )
}

export default Clicks 
