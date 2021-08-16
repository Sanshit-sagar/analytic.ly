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

interface IControlPanel {
    id: number;
    name: string;
    urlvalue: string; 
}

const ControlPanel = () => {
    const items: IControlPanel[] = [
        { id: 0, name: '1min', urlvalue: '/1/min'},
        { id: 1, name: '10min', urlvalue: '/10/min'},
        { id: 2, name: '30min', urlvalue: '/30/min'},
        { id: 3, name: '1hour', urlvalue: '/1/hour'},
        { id: 4, name: '24hour', urlvalue: '/24/hour'},
        { id: 5, name: '48hour', urlvalue: '/48/hour'},
    ]

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        alert(`Clicked ${items[e.currentTarget.id]}`)
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
            {items.map((item: any, index: number) => {
                return (
                    <button 
                        type="button" 
                        onClick={handleClick}
                        style={{ backgroundColor: 'white', color: 'black', border: 'thin solid black', borderRadius:'5px', padding: '5px 2.5px'}}
                    > 
                        {item.name} 
                    </button>
                );
            })}
        </div>
    )
}

const Clicks = () => {
    const { clicks, loading, error }: IClicksProps = useClicks(CLICKS_ENDPOINT); 

    if(loading) return <ChartSkeleton /> 
    if(!clicks) return <NoChartDataPlaceholder />
    if(error) return <ChartError error={error} /> 

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
            <ControlPanel />
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
