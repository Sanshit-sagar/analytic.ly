import TimeSeriesChart from '../components/Timeseries'
import React, { useState } from 'react';
// import Clicks from '../components/Clicks'
// import ControlPanel from '../components/ControlPanel'
import Voronoi from '../components/Voronoi'
import ParentSize from '@visx/responsive/lib/components/ParentSize';

const Home = () => {
  const [clicksEndpoint, setClicksEndpoint] = useState()

  const handleEndpointUpdate = (updatedEndpoint) => {
      setClicksEndpoint(updatedEndpoint)
  }
  
  return (
    <main style={{ height: '100vh', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 0, padding: '10px 5px 10px 5px', overflowY: 'hidden' }}>
        <ParentSize>{({ width, height }) => { <TimeSeriesChart width={width} height={height} />}}</ParentSize>
    </main>
  )
}

export default Home



// const ScatterPlot = () => {

//   return (
//     <div style={{ height: '400px', width: '400px', display: 'flex', padding: }}> 
//     <ParentSize>{({ width, height }) => <Example width={width} height={height} />} </ParentSize>
//     </div>
//   )
// }