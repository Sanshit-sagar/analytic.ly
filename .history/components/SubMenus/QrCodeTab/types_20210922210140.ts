enum SortDirectionEnum {
    ASC = 'ascending',
    DESC = 'descending'
};
enum LoadingStateEnum {
    
};

type SortDirection = SortDirectionEnum.ASC | SortDirectionEnum.DESC

interface SortDescriptor {
    column: Key;
    direction: SortDirection; 
}

interface AsyncListStateUpdate<T, C> {
    items: Iterable<T>;
    selectedKeys: Iterable<Key>; 
    sortDescriptor: SortDescriptor;
    cursor: C; 
    filterText: string; 
}

interface AsyncListLoadOptions<T, C> {
    items: T[];
    selectedKeys: Selection; 
    sortDescriptor: SortDescriptor;
    signal: AbortSignal; 
    cursor: C;
    filterText: string;
    loadingState: LoadingState;
}

const AsyncListLoadFunction = (state: AsyncListLoadOptions<T, C>) => Promise<AsyncListStateUpdate<T, C>>

interface AsyncListOptions<T, C> {
    load: AsyncListLoadFunction<T, C>; // ** required 
    initialSelectedKeys: Iterable<Key>;
    initialSortDescriptor: SortDescriptor;
    initialFilterText: string;
    getKey: (item: T) => Key;
    sort: AsyncListLoadFunction<T, C>
}