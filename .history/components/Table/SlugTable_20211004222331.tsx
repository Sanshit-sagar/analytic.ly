import { styled } from '../../stitches.config'
import { Table as AriaTable } from './Aria/AriaTable'
import { TableScrollView } from './ScrollView'

import { 
    Cell, 
    Column, 
    Row, 
    TableBody, 
    TableHeader 
} from '@react-stately/table'

import { Text } from '../../primitives/Text'

const TableContainer = styled('div', {
    display: 'flex',
    fd: 'row',
    jc: 'flex-start',
    ai: 'stretch',
    border: 'thin solid $border',
    br: '$1',
    bc: 'white',
    margin: '$1',
    padding: '1px',
});

const HeaderText = styled(Text, {
    color: 'black',
    display: 'inline-flex', 
    jc: 'flex-start', 
    ai: 'center',
    fontSize: '$3'
})

interface TabulatedSlugProps {
    destination: string; 
    createdAt: string; 
    url: string; 
    password: string; 
    expiration: string;
}

import { slugHeaders } from './constants'

interface SingleSelectListProps<T> {
    filter: (nodes: Iterable<Node<T>>) => Iterable<Node<T>>;
    
}

export const TabulatedSlug = ({ data }: TabulatedSlugProps) => {

    const list = 

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
                            {slugHeaders.map((header, _index: number) => (
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

