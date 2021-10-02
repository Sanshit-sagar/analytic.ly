import React  from 'react'

import { useTable, useSortBy } from 'react-table'

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'

import { 
    Toolbar, 
    ToolbarToggleItem, 
    ToolbarToggleGroup
} from '../../primitives/Toolbar'

import { Table } from './Aria/AriaTable'
import { TableSkeleton } from './Skeleton'
import { TableScrollView } from './ScrollView'
import { Cell, Column, Row, TableBody, TableHeader } from '@react-stately/table'

import { PageSizeSelector } from './ActionGroups/PageSizeSelector'
import { ITableColumn } from './interfaces'

import { 
    ChevronLeftIcon, 
    ChevronRightIcon,
    DoubleArrowLeftIcon, 
    DoubleArrowRightIcon,
    ReloadIcon
} from '@radix-ui/react-icons'

export interface ITable {
    columns: ITableColumn[];
    clicks: any[];
    initializing: boolean;
    loading: boolean;
    refreshing: boolean;
    finishing: boolean;
    noData: boolean;
    error: any | undefined | null;
    pageSize: number;
    pageIndex: number;
    doMutate: boolean;
    reset: () => void;
    mutate: () => void; 
    next: () => void; 
    previous: () => void; 
    end: () => void; 
}

interface IPaginationButtonProps {
    key: number;
    loading: boolean;
    disabled: boolean;
    onClick: () => void;
    value: string;
    icon: any; 
}

const PaginationButton = ({ key, loading, disabled, onClick, value, icon }: IPaginationButtonProps) => (
    <ToolbarToggleItem 
        key={key}
        disabled={disabled}
        onClick={onClick}
        value={value} 
    >
        {      loading 
            ? <Text> ... </Text> 
            : icon
        }
    </ToolbarToggleItem>
)

const DataTable = ({ }) => {

    let columns = [
        {name: 'Name', uid: 'name'},
        {name: 'Type', uid: 'type'},
        {name: 'Level', uid: 'level'}
    ];
    
    let rows = [
        {id: 1, name: 'Charizard', type: 'Fire, Flying', level: '67'},
        {id: 2, name: 'Blastoise', type: 'Water', level: '56'},
        {id: 3, name: 'Venusaur', type: 'Grass, Poison', level: '83'},
        {id: 4, name: 'Pikachu', type: 'Electric', level: '100'},
        {id: 5, name: 'Charizard', type: 'Fire, Flying', level: '67'},
        {id: 6, name: 'Blastoise', type: 'Water', level: '56'},
        {id: 7, name: 'Venusaur', type: 'Grass, Poison', level: '83'},
        {id: 8, name: 'Pikachu', type: 'Electric', level: '100'},
        {id: 9, name: 'Charizard', type: 'Fire, Flying', level: '67'},
        {id: 10, name: 'Blastoise', type: 'Water', level: '56'},
        {id: 11, name: 'Venusaur', type: 'Grass, Poison', level: '83'},
        {id: 12, name: 'Pikachu', type: 'Electric', level: '100'}
    ];
  

    return (
        <>
        <input aria-label="Focusable before" placeholder="Focusable before" />
        <Table aria-label="Table with selection" selectionMode="multiple">
          <TableHeader columns={columns}>
            {(column) => (
              <Column key={column.uid}>

              </Column>
            )}
          </TableHeader>
          <TableBody items={rows}>
            {(item) => (
              <Row>
                {columnKey => <Cell>{item[columnKey]}</Cell>}
              </Row>
            )}
          </TableBody>
        </Table>
        <input aria-label="Focusable after" placeholder="Focusable after" />
      </>
    );
}

export default DataTable










// {/* />   */}