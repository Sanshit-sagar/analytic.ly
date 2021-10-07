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
    destination: string; 
    createdAt: string; 
    url: string; 
    password: string; 
    expiration: string;
}

const initTabulatedSlugs = [
    { name: 'Slug1' }, 
    { name: 'Slug2' }, 
    { name: 'Slug3' }
]

interface TabulatedSlugProps {
    slug: string; 
}

export const TabulatedSlug = ({ slug }: TabulatedSlugProps) => {

    let rows = useListData({
        initialItems: [...initTabulatedSlugs],
        initialSelectedKeys: [ `${initTabulatedSlugs[0]}`],
        getKey: (item) => item.name
    });
      
    function addSlug(name: string) {
        console.log(slug)
        rows.append({ name });
    }
    
    return (
        <TableContainer>
            <TableScrollView 
                content={
                    <AriaTable
                        aria-label="Details for Slugs"
                        selectionMode={'single'}
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

                        <TableBody items={rows.items}>
                            {(item) => {
                                return (
                                    <Row key={item.name}>
                                        {(columnKey) => (
                                            <Cell key={`${columnKey}`}>
                                                <Text size='1' css={{ color: 'inherit' }}> 
                                                    {item.name}
                                                </Text> 
                                            </Cell>
                                        )}
                                    </Row>
                                )
                            }}
                        </TableBody>
                    </AriaTable>
                }
            />            
        </TableContainer> 
    
    )
}

