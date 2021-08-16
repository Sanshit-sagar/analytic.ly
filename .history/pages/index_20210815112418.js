import React, { useState } from 'react';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import Example from '../components/Example'
import Voronoi from '../components/Voronoi'

const Home = () => {
  const [clicksEndpoint, setClicksEndpoint] = useState()

  const handleEndpointUpdate = (updatedEndpoint) => {
      setClicksEndpoint(updatedEndpoint)
  }
  
  return (
    <main style={{ height: '100vh', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', margin: 0, padding: '10px 5px 10px 5px', overflowY: 'hidden' }}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '60vh', width: '100%' }}>
          <ParentSize>{({ width, height }) => <Example width={width} height={height} /> }</ParentSize>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', height: '40vh', width: '50%'}}>
        <ParentSize>{({ width, height }) => <Voronoi width={width} height={height}/> }</ParentSize>
        </div>

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