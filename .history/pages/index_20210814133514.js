
import useSWR from 'swr'
import Clicks from '../components/Clicks'
import Example from '../components/Example'
import ParentSize from '@visx/responsive/lib/components/ParentSize';


export default function Home() {
  
  return (
    <main style={{ height: '95vh', width: '1200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 0, padding: 0 }}>
      <ParentSize>{({ width, height }) => <Example width={width} height={height} />}</ParentSize>,
    </main>
  )
}
