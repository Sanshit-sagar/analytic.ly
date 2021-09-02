import React from 'react'

import { AppContainer } from '../primitives/Shared'
import Timeseries from '../components/Timeseries'
import DashboardLayout from '../layouts/DashboardLayout'

function Dashboard() {
    return <Timeseries />
}

Dashboard.getLayout = function getLayout(page: any) {
    return (
        <AppContainer className='container'>
            <DashboardLayout> 
                {page} 
            </DashboardLayout>
        </AppContainer>
    )
}

export default Dashboard