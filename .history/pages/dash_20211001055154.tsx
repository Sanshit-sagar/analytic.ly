import React from 'react'
import Timeseries from '../components/Timeseries'
import DashboardLayout from '../layouts/DashboardLayout'

function Dashboard() {
    return <Timeseries />
}
const timeseriesMetadata = {
    title: 'Timeseries',
    description: 'Interactive timeseries visualization',
    cardImage: ''
}
Dashboard.getLayout = function getLayout(page: any) {
    return (
        <DashboardLayout meta={timeseriesMetadata}>
            {page} 
        </DashboardLayout>
    )
}

export default Dashboard