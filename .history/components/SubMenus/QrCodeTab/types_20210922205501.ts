enum SortDirectionEnum {
    ASC = 'ascending',
    DESC = 'descending'
};

type SortDirection = SortDirectionEnum.ASC | SortDirectionEnum.DESC

interface SortDescriptor {
    column: Key;
    direction: SortDirection; 
}

interface AsyncListOptions<T, C> {
    initialSelectedKeys: Iterable<Key>;
    initialSortDescriptor: SortDescriptor;
    initialFilterText: string;
    getKey: (item: T) => Key;
    sort: AsyncListLoadFunction<T, C>
}