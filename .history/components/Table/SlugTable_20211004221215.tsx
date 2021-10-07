import { Table as AriaTable } from './Aria/AriaTable'

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
        <TableControls aria-label='Table Controls'>
            <ControlButton onClick={list.loadMore}>
                {list.isLoading 
                    ?   <DotsHorizontalIcon /> 
                    :   <TrackNextIcon />
                }
            </ControlButton> 
            <ControlButton onClick={list.reload}>
                {list.isLoading 
                    ? <DotsHorizontalIcon />  
                    : <UpdateIcon />
                }
            </ControlButton>
            <SelectMenu
                selectOnly={true}
                group={'pageSizes'}
                items={pageSizes}
                selectedIndex={pageSizeIndex}
                setSelectedIndex={updatePageSize}
                selectedValue={`${pageSizes[pageSizeIndex].value}`}
                selectedTextValue={
                    <PageSizeSelector>
                        <DropdownMenuIcon />
                        <Text> {`${pageSizes[pageSizeIndex].value}`} </Text> 
                    </PageSizeSelector>
                }
            /> 
        </TableControls>

        <TableScrollView 
            content={
                <AriaTable
                    aria-label="Example table with client side sorting"
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
