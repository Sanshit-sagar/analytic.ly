import React  from 'react'

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'

import AriaTable from './Aria/AriaTable'
import { TableScrollView } from './ScrollView'
import { TableSkeleton } from './Skeleton'
import { Cell, Column, Row, TableBody, TableHeader } from '@react-stately/table'

import { ITableColumn, ITable } from './interfaces'

export interface ITable {
    columns: ITableColumn[]
    clicks: any[];
    initializing: boolean;
    loading: boolean;
    refreshing: boolean;
    finishing: boolean;
    noData: boolean;
    error: any | undefined | null;
    pageSize: number; 
    fetchData: () => void; 
    pageIndex: number;
    pageSize: number;
}

columns={columns}
clicks={[...clicks]}
initializing={isLoadingInitialData}
loading={isLoadingMore}
refreshing={isRefreshing}
finishing={isReachingEnd}
noData={isEmpty}
error={isError}
pageSize={PAGE_SIZE}
pageIndex={size}
fetchData={() => setSize(size + 1)}

const DataTable = ({ 
    columns,
    clicks,
    initiaizing,
    loading,
    refreshing,
    finishing,
    fetchDate,
    pageIndex,
    pageSize
 }: ITable) => {

    if(initializing) return <TableSkeleton />
    if()
   
    return <Text> {JSON.stringify(clicks)} </Text>
    // return (
        // <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1'}}>
            {/* <button onClick={fetchData}> next </button>  */}
            {/* <TableScrollView content={ */}
                // <AriaTable
                    // {...getTableProps()}
                    // aria-label="Tabulated Clicks"
                    // selectionMode="multiple"
                    // selectedKeys={selectedKeys}
                    // onSelectionChange={setSelectedKeys}
                // >
                    {/* {headerGroups.map((headerGroup, _) => ( */}
                        // <TableHeader {...headerGroup.getHeaderGroupProps()}>
                            {/* {headerGroup.headers.map((column: any, hgIndex: number) => ( */}
                                // <Column 
                                    // key={hgIndex} 
                                    // isRowHeader
                                    // {...column.getHeaderProps()} 
                                // >
                                    {/* {column.render('Header')} */}
                                {/* </Column> */}
                            // ))}
                        {/* </TableHeader> */}
                    // ))}

                    {/* <TableBody {...getTableBodyProps()}> */}
                        {/* {clicks && clicks.map((row, _: number) => {   */}
                            // prepareRow(row)

                            // return (
                                // <Row {...row.getRowProps()}>
                                    {/* {row.cells.map((cell, _: number) => { */}
                                        // return (
                                            // <Cell {...cell.getCellProps()}>
                                                {/* {cell.render('Cell')} */}
                                            {/* </Cell> */}
                                        // );
                                    // })}
                                {/* </Row> */}
                            // );
                        // })} 
                    {/* </TableBody> */}
                {/* </AriaTable>} */}
            // />
        {/* </Flex> */}
    // );
}

export default DataTable










// {/* />   */}