import React from 'react'
import { AppContainer } from '../primitives/Shared'

import Table from '../components/Table'
import { getColumns } from '../components/Table/Columns'
import { Text } from '../primitives/Text'
import { Flex } from '../primitives/Flex'

import DashboardLayout from '../layouts/DashboardLayout'
import { useSWRInfinite } from 'swr'

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
    size: number;
    setSize: (value: number) => void; 
    mutate: () => void; 
}

const UNDEF = 'undefined'
const PAGE_SIZE = 10

const ClicksTable = ({ 
    clicks, 
    isLoadingInitialData, 
    isLoadingMore, 
    isError,
    isEmpty, 
    isReachingEnd, 
    isRefreshing, 
    size, 
    setSize,
    mutate
}: ITabulatedClicks) => {

    const columns = getColumns()

    const handleResetPages = () => setSize(0)
    const handleMutatePages = () => mutate()
    const handleIncrementPage = () => setSize(size + 1)
    const handleDecrementPage = () => setSize(size - 1)
    
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
            pageSize={PAGE_SIZE}
            pageIndex={size}
            reset={handleResetPages}
            mutate={handleMutatePages}
            next={handleIncrementPage}
            previous={handleDecrementPage}
        />
    )
}

const TabulatedClicks = () => {
    let cursor = 0;
    let pageSize = PAGE_SIZE;

    const email = 'sanshit.sagar@gmail.com'

    const { data, error, mutate, size, setSize, isValidating }: IInfinitelyLoadedClicks = useSWRInfinite((pageNumber: number) => {
        cursor = pageNumber * pageSize;
        return `/api/clicks/paginate/${email}/${cursor}/${PAGE_SIZE}`
    });

    const clicks: any[] = data && data[size-1] && data[size-1].page ? [].concat(...data[size-1].page) : [];
  
    const isLoadingInitialData = !data && !error ? true : false
    const isLoadingSubsequentData = (size>0 && data && data[size-1] && data[size-1].page && typeof data[size-1]===UNDEF) || false
    const isLoadingMore = isLoadingInitialData || isLoadingSubsequentData || false
    const isEmpty = !data || !(data?.[size-1]?.page) || data[size-1].page.length === 0 
    const isReachingEnd = isEmpty || (data && data[size-1] && (data[size-1].page[data[size-1].page.length-1] < PAGE_SIZE))
    const isRefreshing = isValidating && data && data[size-1] && data[size-1].page && data[size-1].page.length === size

    return (
        <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch' }}>
            <Text size='2'> Showing clicks for user: {email} </Text>
            <ClicksTable
                isLoadingInitialData={isLoadingInitialData}
                isLoadingMore={isLoadingMore}
                isError={error}
                isEmpty={isEmpty}
                isReachingEnd={isReachingEnd}
                isRefreshing={isRefreshing}
                clicks={clicks}
                size={size}
                setSize={setSize}
                mutate={mutate}
            />
        </Flex>
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