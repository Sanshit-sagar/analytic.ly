import React from 'react';

import { 
    AppContainer
} from '../primitives/Shared'

function GeoMaps() {

    return (
        
    ); 
}

GeoMaps.getLayout = function getLayout(page: any) {
    
    return (
        <AppContainer className='container'>
            {page} 
        </AppContainer>
    )
}

export default GeoMaps