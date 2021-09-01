import React from 'react';

import { 
    AppContainer
} from '../primitives/Shared'


import { atom, useAtom } from 'jotai'

export const selectedIndexAtom = atom(0)
export const selectedMapAtom = atom((get) => mapOptions[get(selectedIndexAtom)].map)
function SelectedMap() {
    const [selectedMap] = useAtom(selectedMapAtom)

    return <> {selectedMap} </>;
}

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
            <DashboardLayout> 
                {page} 
            </DashboardLayout>
        </AppContainer>
    )
}

export default GeoMaps