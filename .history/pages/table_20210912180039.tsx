import React, { useState, useRef, useCallback } from 'react'
import { AppContainer } from '../primitives/Shared'

// import Table from '../components/Table'
// import { useClicks } from '../hooks/useClicks'
// import { getColumns } from '../components/Table/Columns'
import { Text } from '../primitives/Text'
import DashboardLayout from '../layouts/DashboardLayout'
// import { usePaginatedClicks } from '../hooks/usePaginatedClicks'
import { useSWRInfinite } from 'swr'

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
// const [cursor, setCursor] = useState<number>(0)
// const [pageSize, setPageSize] = useState<number>(10)
// const [pagedClicks, setPagedClicks] = useState<any[]>([])
// const handleNextPage = () => setCursor(cursor + pageSize); 
// const handlePrevPage = () => setCursor(cursor - pagesSize)

interface IPagedClicks {
    page: any[];
    start: number;
    cursors: 
}

interface IInfinitelyLoadedClicks {
    data: IPagedClicks[];
    error: any | null | undefined;
    mutate: () => void;
    size: number;
    setSize: (value: number) => void;
    isValidating: boolean; 
}

const UNDEFINED = 'undefined'
const PAGE_SIZE = 10

const TabulatedClicks = () => {
    const email = 'sanshit.sagar@gmail.com'

    const { data, error, mutate, size, setSize, isValidating }: IInfinitelyLoadedClicks = useSWRInfinite((index: number) => {
        let cursor = index * PAGE_SIZE
        return `/api/clicks/paginate/${email}/${cursor}/${PAGE_SIZE}`
    }

    const clicks = data ? [].concat(...data.page) : [];
    const isLoadingInitialData = !data && !error
    const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size-1]===UNDEFINED)
    const isEmpty = data?.[0]?.length === 0 
    const isReachingEnd = isEmpty || (data && data[data.length -1] < PAGE_SIZE)
    const isRefreshing = isValidating && data && data.length === size
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