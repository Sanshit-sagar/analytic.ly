import { styled } from '../../stitches.config'
import { Table as AriaTable } from './Aria/AriaTable'

import { 
    Cell, 
    Column, 
    Row, 
    TableBody, 
    TableHeader 
} from '@react-stately/table'

const TableContainer = styled('div', {
    display: 'flex',
    fd: 'row',
    jc: 'flex-start',
    ai: 'stretch',
    border: 'thin solid $border',
    br: '$2'
    bc: 'white',
    margin: '$1',
    padding: '1px',
})


interface TabulatedSlugProps {
    destination: string; 
    createdAt: string; 
    url: string; 
    password: string; 
    expiration: string;
};

const TabulatedSlug = ({ data }: TabulatedSlugProps) => {

    return (
        <TableContainer>
            <TableScrollView 
                content={
                    <AriaTable
                        aria-label="Details for Slugs"
                        sortDescriptor={list.sortDescriptor}
                        onSortChange={list.sort}
                        selectionMode={'multiple'}
                    >
                        <TableHeader>
                            {headers.map((header, _index: number) => (
                                <Column 
                                    key={header.key} 
                                    allowsSorting={header.sortable}
                                    isRowHeader={true}
                                >
                                    <HeaderText css={{ width: header.width, color: '$funky', fontWeight: 400 }}>
                                        {header.name.toUpperCase()} 
                                    </HeaderText>
                                </Column> 
                            ))}
                        </TableHeader>

                        <TableBody items={rows}>
                            {(item) => (
                                <Row key={item.id}>
                                    {(columnKey) => (
                                        <Cell>
                                            <Text size='2' css={{ color: 'inherit' }}> 
                                                {item[columnKey]} 
                                            </Text> 
                                        </Cell>
                                    )}
                                </Row>
                            )}
                        </TableBody>
                    </AriaTable>
                }
            />            
        </TableContainer> 
    
    )
}
