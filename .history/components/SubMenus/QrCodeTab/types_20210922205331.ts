enum SortDirectionEnum {
    ASC = 'ascending',
    DESC = 'descending'
};

interface SortDescriptor {
    column: Key;
    direction: SortDirection; 
}

interface AsyncListOptions<T, C> {
    initialSelectedKeys: Iterable<Key>;
    initialSortDescriptor: SortDescriptor;

}