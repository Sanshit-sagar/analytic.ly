enum SortDirectionEnum {
    ASC = 'ascending',
    DESC = 'descending'
};

type SortDire

interface SortDescriptor {
    column: Key;
    direction: SortDirection; 
}

interface AsyncListOptions<T, C> {
    initialSelectedKeys: Iterable<Key>;
    initialSortDescriptor: SortDescriptor;

}