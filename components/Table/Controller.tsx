import React, { useEffect } from 'react'

import { IController } from './interfaces'
import { Toolbar } from '../../primitives/Toolbar'

import { PageSizeSelector } from './ActionGroups/PageSizeSelector'
import { Paginator } from './ActionGroups/Paginator'
import { GlobalFilter } from './ActionGroups/Filter'
import SortFilters from './ActionGroups/SortFilters'

const TableController = ({
    loading,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    pageIndex,
    pageSize,
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter
 }: IController) => {

    useEffect(() => { 
        setPageSize(Number(15)) 
    }, []); 

    return (
        <Toolbar>
            <Paginator  
                loading={loading}
                pageIndex={pageIndex}
                pageCount={pageCount}
                canPreviousPage={canPreviousPage}
                canNextPage={canNextPage}
                gotoPage={gotoPage} 
                nextPage={nextPage} 
                previousPage={previousPage} 
                pageOptions={pageOptions}
            />

            <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
            />

            <SortFilters loading={loading} />

            <PageSizeSelector 
                loading={loading}
                pageSize={pageSize}
                setPageSize={setPageSize}
            />
        </Toolbar>
    )
}

export default TableController