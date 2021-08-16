import Example from '../components/Example'
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import Clicks from '../components/Clicks'

const Home = () => {
  const [clicksEndpoint, setClicksEndpoint] = useState('http://localhost:3000/api/clicks/recents/48/hours')

  const handleEndpointUpdate = (updatedEndpoint) => {
      setClicksEndpoint(updatedEndpoint)
  }
  
  return (
    <main style={{ height: '100vh', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 0, padding: '10px 5px 10px 5px', overflowY: 'hidden' }}>
      {/* <ParentSize>{({ width, height }) => <Example width={width} height={height} />}</ParentSize> */}
      <Clicks clicksEndpoint={clicksEndpoint} updateHandler={handleEndpointUpdate} />
    </main>
  )
}

export default Home