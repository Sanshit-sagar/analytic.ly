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
        <AriaTable
                        aria-label="Example table with client side sorting"
                        sortDescriptor={list.sortDescriptor}
                        onSortChange={list.sort}
                        selectionMode={'multiple'}
                    >
                        <TableHeader>
                            
                        </TableHeader>
    )
}
