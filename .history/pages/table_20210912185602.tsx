import React from 'react'
import { AppContainer } from '../primitives/Shared'

import Table from '../components/Table'
// import { useClicks } from '../hooks/useClicks'
import { getColumns } from '../components/Table/Columns'
import { Text } from '../primitives/Text'
import { Flex } from '../primitives/Flex'

import DashboardLayout from '../layouts/DashboardLayout'
// import { usePaginatedClicks } from '../hooks/usePaginatedClicks'
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
    data: IPagedClicks | undefined;
    error: any | null | undefined;
    mutate: () => void;
    size: number;
    setSize: (value: number) => void;
    isValidating: boolean; 
}

interface ITabulatedClicks {
    isLoadingInitialData: boolean;
    isLoadingMore: boolean;
    isEmpty: boolean;
    isReachingEnd: boolean | undefined;
    isRefreshing: boolean | undefined; 
    clicks: any[];
    cursor: number;
    fetchData: (value: number) => void; 
}

const UNDEFINED = 'undefined'
const PAGE_SIZE = 10

const ClicksTable = ({ 
    isLoadingInitialData, 
    isLoadingMore, 
    isEmpty, 
    isReachingEnd, 
    isRefreshing, 
    clicks, 
    cursor, 
    fetchData 
}: ITabulatedClicks) => {

    // if(isLoadingInitialData || isLoadingMore) return <Text> Loading... </Text>
    // if(isReachingEnd) return <Text> Status: nearing end </Text>
    // if(isRefreshing) return <Text> Status: refreshing </Text>
    // if(isEmpty || !clicks?.length) return <Text> No data to show </Text> 

    const columns = getColumns()
    
    return (
        <Table
             columns={columns}
             data={clicks}
             loading={isLoadingInitialData || isLoadingMore}
             error={isEmpty || !clicks?.length}
             fetchData={fetchData}
             pageCount={cursor}
        />
    );
}

const TabulatedClicks = () => {
    let cursor = 0;
    const email = 'sanshit.sagar@gmail.com'

    const { data, error, mutate, size, setSize, isValidating }: IInfinitelyLoadedClicks = useSWRInfinite((pageNumber: number) => {
        cursor = pageNumber * PAGE_SIZE;
        return `/api/clicks/paginate/${email}/${cursor}/${PAGE_SIZE}`
    });
    // const rawData = data[0].page || { message: 'No initial data yet' }
    const clicks: any[] = data && data[size-1] && data[size-1].page ? [].concat(...data[size-1].page) : [];
    const isLoadingInitialData = !data && !error ? true : false
    const isLoadingMore = isLoadingInitialData || (size > 0 && data && data[size-1] && data[size-1].page && typeof data[size-1]===UNDEFINED) || false
    const isEmpty = data?.[size-1]?.page?.length === 0 
    const isReachingEnd = isEmpty || (data && data[size-1] && (data[size-1].page[data[size-1].page.length-1] < PAGE_SIZE))
    const isRefreshing = isValidating && data && data[size-1] && data[size-1].page && data[size-1].page.length === size

    return (
        <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch' }}>
            <Text size='2'> Showing clicks for user: {email} </Text>

            <Text>
                showing {size} page(s) of {isLoadingMore ? "..." : clicks.length}{" "}
                issue(s){" "}

                <button 
                    disabled={isLoadingMore || isReachingEnd}
                    onClick={() => setSize(size + 1)}
                >
                    {isLoadingMore ? "loading..." : isReachingEnd ? "no more issues" : "load more"}
                </button>

                <button disabled={isRefreshing} onClick={() => mutate()}>
                    {isRefreshing ? "refreshing..." : "refresh"}
                </button>

                <button disabled={!size} onClick={() => setSize(0)}>
                    clear
                </button>
            </Text>

            {isEmpty ? <Text> Yay, no issues found.</Text> : null}
            <ClicksTable
                isLoadingInitialData={isLoadingInitialData}
                isLoadingMore={isLoadingMore}
                isEmpty={isEmpty}
                isReachingEnd={isReachingEnd}
                isRefreshing={isRefreshing}
                clicks={clicks}
                cursor={size}
                fetchData={() => setSize(size + 1)}
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