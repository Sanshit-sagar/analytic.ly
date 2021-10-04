import React from 'react'

import Table from '../components/Table'
import DashboardLayout from '../layouts/DashboardLayout'
import { AppContainer } from '../primitives/Shared'

const metadata = {
    title: 'Table',
    description: 'Tabulated data',
};

const TabulatedClicks = () => {
   return (
    // TableProps<Item>': id, 'aria-label', 'aria-labelledBy', 'aria-describedBy', 'aria-details
       <Table 
            ariaDescribed-by='description for a chunky tabulation' 
            aria-labelledBy='label for da tabel' 
            aria-details='keeping track of '
        /> 
   )
}

TabulatedClicks.getLayout = function getLayout(page: any) {
    
    return (
        <AppContainer className='container'>
            <DashboardLayout pageMetadata={metadata}> 
                {page} 
            </DashboardLayout>
        </AppContainer>
    )
}


export default TabulatedClicks