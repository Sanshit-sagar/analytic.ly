import React, { useState, useEffect } from 'react'
import { useUpdateAtom, useAtomValue } from 'jotai/utils'

import { AppContainer } from '../primitives/Shared'

import Table from '../components/Table'
import { getColumns } from '../components/Table/Columns'

import DashboardLayout from '../layouts/DashboardLayout'
import { useSWRInfinite } from 'swr'

import { 
    tablePageSizeValueAtom, 
    setPageIndexAtom } from '../components/Table/ActionGroups/PageSizeSelector'

interface IPagedClicksCursors {
    id: number;
    timestamp: number;
}

interface IPagedClicks {
    [key: number]: {
        page: any[];
        start: number;
        cursors: IPagedClicksCursors;
        query: string;
    };
}

interface IInfinitelyLoadedClicks {
    data?: IPagedClicks | undefined;
    error?: any | null | undefined;
    mutate: () => void;
    size: number;
    setSize: (value: number) => void;
    isValidating: boolean; 
}

interface ITabulatedClicks {
    isLoadingInitialData: boolean;
    isLoadingMore: boolean;
    isError: boolean;
    isEmpty: boolean;
    isReachingEnd: boolean | undefined;
    isRefreshing: boolean | undefined; 
    clicks: any[];
    pageIndex: number;
    pageSize: number; 
    setSize: (value: number) => void; 
    mutatePages: () => void; 
}

const UNDEF = 'undefined'
const PAGE_SIZE = 10
const NUM_PAGES = 45

const ClicksTable = ({ 
    clicks, 
    isLoadingInitialData, 
    isLoadingMore, 
    isError,
    isEmpty, 
    isReachingEnd, 
    isRefreshing, 
    pageIndex, 
    pageSize,
    setSize,
    mutatePages
}: ITabulatedClicks) => {
    const [doMutate, setDoMutate] = useState<boolean>(false)

    let lastPageIndex = parseInt(`${Math.floor(NUM_PAGES/PAGE_SIZE)}`)
    if(NUM_PAGES%PAGE_SIZE!==0) ++lastPageIndex;

    const handleResetPages = () => setSize(1)
    const handleIncrementPage = () => setSize(pageIndex + 1)
    const handleDecrementPage = () => setSize(pageIndex - 1)
    const handleMoveToLastPage = () => setSize(lastPageIndex)
    const handleMutatePages = () => {
        mutatePages();
        setDoMutate(true);
    }

    const columns = getColumns()
    
    return (
        <Table
            columns={columns}
            clicks={[...clicks]}
            initializing={isLoadingInitialData}
            loading={isLoadingMore}
            refreshing={isRefreshing || false}
            finishing={isReachingEnd || false}
            noData={isEmpty}
            error={isError}
            pageSize={pageSize}
            pageIndex={pageIndex}
            doMutate={doMutate}
            reset={handleResetPages}
            mutate={handleMutatePages}
            next={handleIncrementPage}
            previous={handleDecrementPage}
            end={handleMoveToLastPage}
        />
    )
}

const TabulatedClicks = () => {
    let cursor = 0;
    
    const pageSizeValue = useAtomValue(tablePageSizeValueAtom)
    const setPageSizeIndex = useUpdateAtom(setPageIndexAtom)

    useEffect(() => {
        setPageSizeIndex(2)
    }, [])

    const email = 'sanshit.sagar@gmail.com'

    const { data, error, mutate, size, setSize, isValidating }: IInfinitelyLoadedClicks = useSWRInfinite((pageNumber: number) => {
        cursor = pageNumber * pageSizeValue;
        return `/api/clicks/paginate/${email}/${cursor}/${PAGE_SIZE}`
    });

    const clicks: any[] = data && data[size-1] && data[size-1].page ? [].concat(...data[size-1].page) : [];
  
    const isLoadingInitialData = !data && !error ? true : false
    const isLoadingSubsequentData = (size>0 && data && data[size-1] && data[size-1].page && typeof data[size-1]===UNDEF) || false
    const isLoadingMore = isLoadingInitialData || isLoadingSubsequentData || false
    const isEmpty = !data || !(data?.[size-1]?.page) || data[size-1].page.length === 0 
    const isReachingEnd = isEmpty || (data && data[size-1] && data[size-1].page && (data[size-1].page.length < PAGE_SIZE))
    const isRefreshing = isValidating && data && data[size-1] && data[size-1].page && data[size-1].page.length === size

    return (
        <ClicksTable
            isLoadingInitialData={isLoadingInitialData}
            isLoadingMore={isLoadingMore}
            isError={error}
            isEmpty={isEmpty}
            isReachingEnd={isReachingEnd}
            isRefreshing={isRefreshing}
            clicks={clicks}
            pageIndex={size}
            pageSize={pageSize}
            setSize={setSize}
            mutatePages={mutate}
        />
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