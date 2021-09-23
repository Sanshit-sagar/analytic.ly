enum SortDirectionEnum {
    ASC = 'ascending',
    DESC = 'descending'
};

type SortDirection = SortDirectionEnum.ASC | SortDirectionEnum.DESC

interface SortDescriptor {
    column: Key;
    direction: SortDirection; 
}

interface AsyncListLoadFunction {
    
}

interface AsyncListOptions<T, C> {
    load: AsyncListLoadFunction<T, C>; // ** required 
    initialSelectedKeys: Iterable<Key>;
    initialSortDescriptor: SortDescriptor;
    initialFilterText: string;
    getKey: (item: T) => Key;
    sort: AsyncListLoadFunction<T, C>
}