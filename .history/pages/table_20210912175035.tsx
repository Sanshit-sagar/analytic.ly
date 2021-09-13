import React, { useState, useRef, useCallback } from 'react'
import { AppContainer } from '../primitives/Shared'

// import Table from '../components/Table'
// import { useClicks } from '../hooks/useClicks'
// import { getColumns } from '../components/Table/Columns'
import { Text } from '../primitives/Text'
import DashboardLayout from '../layouts/DashboardLayout'
import { usePaginatedClicks } from '../hooks/usePaginatedClicks'
// 
// const TabulatedClicks = () => {
    // const { clicks, loading, error } = useClicks(`/api/metrics/user/sanshit.sagar@gmail.com/clickstream`)

    // const [data, setData] = useState<any>([])
    // const [fetching, setFetching] = useState(false)
    // const [pageCount, setPageCount] = useState(0)
    // const fetchIdRef = useRef(0)
    // 
    // const fetchData = useCallback(({ pageIndex, pageSize }) => {
        // const fetchId = ++fetchIdRef.current
        // setFetching(true);

        // if(!loading && !error && clicks?.length) {
            // if (fetchId === fetchIdRef.current) {
                // const startRow = pageSize * pageIndex
                // const endRow = startRow + pageSize
                // setData(clicks.slice(startRow, endRow))
                // setPageCount(Math.ceil(clicks.length / pageSize))
                // setFetching(false)
            // }
        // }
    // }, [clicks, loading, error])

    // const cellsLoading = loading || fetching
    // const columns = getColumns();
// 
    // return (
        // <Table
            // columns={columns}
            // data={data}
            // loading={cellsLoading}
            // error={error}
            // fetchData={fetchData}
            // pageCount={pageCount}
        // />
    // );
// }
// 


const { data, error } = useSWR(endpoint);
return {
    page: data?.page ?? {},
    loading: !data && !error,
    error
}; 

const TabulatedClicks = () => {
    const email = 'sanshit.sagar@gmail.com'
    const [cursor, setCursor] = useState<number>(0)
    const [pageSize, setPageSize] = useState<number>(10)
    const [pagedClicks, setPagedClicks] = useState<any[]>([])
    
    const handleNextPage = () => setCursor(cursor + pageSize); 
    const handlePrevPage = () => setCursor(cursor - pagesSize)

    const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite((index: number) => {
        return `/api/clicks/paginate/${email}/${index}/${pageSize}`
    }

    if(loading) return <Text> loading.. </Text>
    if(error) return <Text> error! </Text> 

    return (
        <>
            <Text> {JSON.stringify(page)} </Text>
            <button onClick={handleNextPage}> next </button>
            <Text> pageSize: {pageSize} | cursor: {cursor} </Text>
        </>
    )
}

TabulatedClicks.getLayout = function getLayout(page: any) {
    
    return (
        <AppContainer className='container'>
            <DashboardLayout> 
                {page} 
            </DashboardLayout>
        </AppContainer>
    )
}


export default TabulatedClicks