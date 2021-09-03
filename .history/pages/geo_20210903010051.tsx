import React from 'react';

import { 
    AppContainer, 
    CentralDataVisualizer 
} from '../primitives/Shared'

import Controller from '../components/Controller'
import GlobalMercator from '../components/Mercator'
import AlbersUsa from '../components/AlbersUsa'
import DashboardLayout from '../layouts/DashboardLayout'
import { styled } from '../stitches.config'

import { atom, useAtom } from 'jotai'

const GeoWrapper = styled('div', {
    backgroundColor: '$panel', 
    height: '600px', 
    width: '1100px', 
    maxHeight: '600px', 
    maxWidth: '1100px',
})

export const selectedIndexAtom = atom(0)
export const selectedMapAtom = atom((get) => mapOptions[get(selectedIndexAtom)].map);

export const mapOptions = [
    { id: 0, title: 'Global', map: <GlobalMercator /> },
    { id: 1, title: 'US', map: <AlbersUsa /> }
];

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
        <DashboardLayout> 
            {page} 
        </DashboardLayout>
    )
}

export default GeoMaps