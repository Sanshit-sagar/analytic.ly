
import useSWR from 'swr'
import Clicks from '../components/Clicks'
import Chart from '../components/Chart'
import ParentSize from '@visx/responsive/lib/components/ParentSize';


export default function Home() {
  
  return (
    <main style={{ height: '95vh', width: '100%', padding: '5px' }}>
      {/* <h1 style={{ textDecoration: 'underline' }}> hihihi </h1> */}
      <ParentSize>{({ width, height }) => <Chart width={width} height={height} />}</ParentSize>
    
      {/* <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch' }}>
          </div> */}
    </main>
  )
}
