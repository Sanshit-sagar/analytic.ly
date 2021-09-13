import React  from 'react'
import AriaTable from './Aria/AriaTable'

import { TableScrollView } from './ScrollView'
import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'

import { TableSkeleton } from './Skeleton'
// import { Cell, Column, Row, TableBody, TableHeader } from '@react-stately/table'

import { ITableColumn, ITable } from './interfaces'

export interface ITable {
    columns: ITableColumn[]
    clicks: any[];
    fetchData: () => void; 
    loading: boolean;
    error: any | undefined; 
    pageCount: number;
}

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