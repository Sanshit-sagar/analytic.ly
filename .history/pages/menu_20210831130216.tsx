import React from 'react';

import { 
    AppContainer
} from '../primitives/Shared'

function GeoMaps() {

    return (
        <CentralDataVisualizer> 
            <Controller />
            <SelectedMap />
        </CentralDataVisualizer>
    ); 
}


GeoMaps.getLayout = function getLayout(page: any) {
    
    return (
        <AppContainer className='container'>
                {page} 
            </DashboardLayout>
        </AppContainer>
    )
}

export default GeoMaps