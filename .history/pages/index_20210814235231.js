import Example from '../components/Example'
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import Clicks from '../components/Clicks'

const Home = () => {
  
  return (
    <main style={{ height: '100vh', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 0, padding: '25px 5px 10px 5px' }}>
      <ParentSize>{({ width, height }) => <Example width={width} height={height} />}</ParentSize>
      <Clicks />
    </main>
  )
}

export default Home