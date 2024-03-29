import React from 'react'
import { styled } from '../stitches.config'

import { atom, useAtom } from 'jotai'

import AlbersUsa from '../components/AlbersUsa'
import Controller from '../components/Controller'
import GlobalMercator from '../components/Mercator'
import DashboardLayout from '../layouts/DashboardLayout'

const GeoPageMetadata = {
    title: 'Geo Maps',
    description: 'Clicks mapped onto a map'
}

const GeoWrapper = styled('div', {
    backgroundColor: '$panel', 
    height: '600px', 
    width: '1100px', 
    maxHeight: '600px', 
    maxWidth: '1100px',
});

export const selectedIndexAtom = atom(0)
export const selectedMapAtom = atom(
    (get) => mapOptions[get(selectedIndexAtom)].map
);

export const mapOptions = [
    { id: 0, title: 'Global', map: <GlobalMercator /> },
    { id: 1, title: 'US', map: <AlbersUsa /> }
];

const SelectedMap = () => {
    const [selectedMap] = useAtom(selectedMapAtom)
    return <> {selectedMap} </>
}

const GeoMaps = () => (
    <GeoWrapper> 
        <Controller />
        <SelectedMap />
    </GeoWrapper>
); 


GeoMaps.getLayout = function getLayout(page: any) {
    
    return (
        <DashboardLayout pageMetadata={GeoPageMetadata}> 
            {page} 
        </DashboardLayout>
    )
}

export default GeoMaps