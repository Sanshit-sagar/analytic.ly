import React, { useState, useRef, useCallback } from 'react'
import { AppContainer, CentralDataVisualizer } from '../primitives/Shared'

import Table from '../components/Table'
import { useClicks } from '../hooks/useClicks'
import { getColumns } from '../components/Table/Columns'
import DashboardLayout from '../layouts/DashboardLayout'

const TabulatedClicks = () => {
    const { clicks, loading, error } = useClicks(`/api/metrics/user/sanshit.sagar@gmail.com/clickstream`)

    const [data, setData] = useState([])
    const [fetching, setFetching] = useState(false)
    const [pageCount, setPageCount] = useState(0)
    const fetchIdRef = useRef(0)
    
    const fetchData = useCallback(({ pageSize, pageIndex }) => {
        const fetchId = ++fetchIdRef.current
        setFetching(true);

        if(!loading && !error && clicks?.length) {
            if (fetchId === fetchIdRef.current) {
                const startRow = pageSize * pageIndex
                const endRow = startRow + pageSize
                setData(clicks.slice(startRow, endRow))
                setPageCount(Math.ceil(clicks.length / pageSize))
                setFetching(false)
            }
        }
    }, [clicks, loading, fetching, error]); 

    const cellsLoading = loading || fetching
    const columns = getColumns();

    return (
        <CentralDataVisualizer>  
            <Table
                columns={columns}
                data={data}
                loading={cellsLoading}
                error={error}
                fetchData={fetchData}
                pageCount={pageCount}
            />
        </CentralDataVisualizer>
    );
}

TabulatedClicks.getLayout = function getLayout(page: any) {
    
    return (
        <AppContainer className='container'>
            <DashboardLayout> 
                {page} 
        </AppContainer>
    )
}


export default TabulatedClicks