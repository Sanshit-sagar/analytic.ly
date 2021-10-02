import React, { useEffect } from 'react'

import { IController } from './interfaces'
import { Toolbar } from '../../primitives/Toolbar'

import { PageSizeSelector } from './ActionGroups/PageSizeSelector'
import { Paginator } from './ActionGroups/Paginator'
import { GlobalFilter } from './ActionGroups/Filter'

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

            <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
            />

            <PageSizeSelector 
                loading={loading}
                pageSize={pageSize}
                setPageSize={setPageSize}
            />
        </Toolbar>
    )
}

export default TableController


{/* <SortFilters loading={loading} /> */}

{/* <Paginator   */}
    // loading={loading}
    // pageIndex={pageIndex}
    // pageCount={pageCount}
    // canPreviousPage={canPreviousPage}
    // canNextPage={canNextPage}
    // gotoPage={gotoPage} 
    // nextPage={nextPage} 
    // previousPage={previousPage} 
    // pageOptions={pageOptions}
{/* /> */}