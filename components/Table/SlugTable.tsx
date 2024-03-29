import { styled } from '../../stitches.config'
import { Table as AriaTable } from './Aria/AriaTable'
import { TableScrollView } from './ScrollView'
import { Node } from '@react-types/shared'

import { 
    Cell, 
    Column, 
    Row, 
    TableBody, 
    TableHeader 
} from '@react-stately/table'
import { Item, Section } from '@react-stately/collections'
import { SelectionManager } from '@react-stately/selection'
import { useListData } from '@react-stately/data'


import { Text } from '../../primitives/Text'

const TableContainer = styled('div', {
    height: 125,
    width: 200,
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


import { slugHeaders } from './constants'
import { LockClosedIcon, LinkBreakIcon, ClockIcon } from '@radix-ui/react-icons'
// import { Collection } from '../../compositions/interfaces'

// interface ItemProps<T> {
//     children: React.ReactNode;
//     title: React.ReactNode;
//     textValue: string;
//     childItems: Iterable<T>;
//     hasChildItems: boolean; 
//     'aria-label': string; 
// }; 
// interface SectionProps<T> {
//     children: ItemElement<T> | ItemElement<T>[] | ItemRenderer<T>;
//     title: React.ReactNode;
//     items: Iterable<T>;
//     'aria-label': string; 
// }

// type ItemElement<T> = React.ReactElement<ItemProps<T>>; 
// type ItemRenderer<T> = (item: T) => ItemElement<T>; 
// type SectionElement<T> = React.ReactElement<SectionProps<T>>;

// type CollectionElement<T> = 
//         | SectionElement<T> 
//         | ItemElement<T>; 

// type CollectionChildren<T> = 
//         | CollectionElement<T> 
//         | CollectionElement<T>[] 
//         | ((item: T) => CollectionElement<T>);

// interface SingleSelectListProps<T> {
//     children: CollectionChildren<T>; 
//     filter: (nodes: Iterable<Node<T>>) => Iterable<Node<T>>;
//     items: Iterable<Node<T>>;
//     disabledKeys: Iterable<Node<T>>; 
//     disallowEmptySelection: boolean;
//     selectedKey: Key; 
//     defaultSelectedKey: Key;
//     onSelectionChange: (key: Key) => void; 
// }
// interface SingleSelectListState<T> {
//     selectedKey: Key;
//     selectedItem: Node<T>;
//     collection: Collection<Node<T>>; 
//     disabledKeys: Set<Key>;
//     selectionManager: SelectionManager;
//     setSelectedKey: (key: Key) => void; 
// }

interface TabulatedSlug {
    name: string; 
    destination: string; 
    createdAt: Date; 
    url: string; 
    password: string; 
    expiration: Date;
}

interface TabulatedSlugProps {
    slug: string; 
}

interface Header {
    name: React.ReactNode;
    key: string; 
}

type KeyType = 'id' | 'name' | 'date' | 'type'

export const TabulatedSlug = ({ slug }: TabulatedSlugProps) => {
    let columns: Header[] = [
        { name: "🆔", key: 'name' },
        { name: "🔒", key: 'expiration' },
        { name: "🕐", key: 'password' }
    ];
    
    let rows = [
        {id: 1, name: 'country', expiration: '6/7/2020', password: 'File folder'},
        {id: 2, name: 'ipAddress', expiration: '4/7/2021', password: 'File folder'},
        {id: 3, name: 'timestamp', expiration: '11/20/2010', password: 'System file'},
        {id: 4, name: 'timeTaken', expiration: '1/18/2016', password: 'Text Document'}
    ];

    
    return (
        <TableContainer>
            <TableScrollView 
                content={
                    <AriaTable
                        aria-label="Details for Slugs"
                        // {...props}
                    >
                        <TableHeader columns={columns}>
                            {(column) => (
                                <Column>
                                    <HeaderText css={{ 
                                        color: '$funky', fontWeight: 400 }}>
                                        {column.name}
                                    </HeaderText>
                                </Column>
                            )}
                        </TableHeader>
                        <TableBody items={rows}>
                            {(item) => (
                                <Row>
                                    {(columnKey) => (
                                        <Cell>
                                            <Text size='1'>
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

