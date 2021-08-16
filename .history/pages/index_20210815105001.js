// import Example from '../components/Example'
import React, { useState } from 'react';
// import Clicks from '../components/Clicks'
// import ControlPanel from '../components/ControlPanel'
import Example from '../components/BarChart'
import ParentSize from '@visx/responsive/lib/components/ParentSize';

// const ScatterPlot = () => {

//   return (
   
//   )
// }

const Home = () => {
  const [clicksEndpoint, setClicksEndpoint] = useState()

  const handleEndpointUpdate = (updatedEndpoint) => {
      setClicksEndpoint(updatedEndpoint)
  }
  
  return (
    <main style={{ height: '100vh', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 0, padding: '10px 5px 10px 5px', overflowY: 'hidden' }}>
      
      {/* <div style={{ height: '400px', width: '400px', display: 'flex', padding: '2.5px', margin: '5px' }}>  */}
        <ParentSize>{({ width, height }) => <Example width={width} height={height} />} </ParentSize>
      {/* </div> */}
      {/* <ControlPanel updateEndpoint={handleEndpointUpdate} />  */}
      {/* <Clicks clicksEndpoint={clicksEndpoint} handleUpdateEndpoint={handleEndpointUpdate} /> */}
      {/* <BarChart />  */}
    </main>
  )
}

export default Home