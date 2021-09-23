enum SortDirectionEnum {
    ASC = 'ascending',
    DESC = 'descending'
}

enum LoadingStateEnum {
    LOADING = 'loading',
    SORTING = 'sorting',
    LOADING_MORE = 'loadingMore',
    ERROR = 'error',
    IDLE = 'idle',
    FILTERING = 'filtering'
}

type SortDirection = 
    | SortDirectionEnum.ASC 
    | SortDirectionEnum.DESC

type LoadingState = 
    | LoadingStateEnum.LOADING 
    | LoadingStateEnum.SORTING 
    | LoadingStateEnum.LOADING_MORE 
    | LoadingStateEnum.ERROR 
    | LoadingStateEnum.IDLE
    | LoadingStateEnum.FILTERING

interface SortDescriptor {
    column: Key;
    direction: SortDirection; 
}

interface AsyncListStateUpdate<T, C> {
    cursor: C; 
    filterText: string; 
    items: Iterable<T>;
    selectedKeys: Iterable<Key>; 
    sortDescriptor: SortDescriptor;
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

interface AsyncListOptions<T, C> {
    load: (state: AsyncListLoadOptions<T, C>) => Promise<AsyncListStateUpdate<T, C>>;
    initialSelectedKeys: Iterable<Key>;
    initialSortDescriptor: SortDescriptor;
    initialFilterText: string;
    getKey: (item: T) => Key;
    sort: (state: AsyncListLoadOptions<T, C>) => Promise<AsyncListStateUpdate<T, C>>;
}

// const AsyncListLoadOptions = (state: AsyncListLoadOptions) => Promise<AsyncListStateUpdate>

interface UseAsyncList<T> {
    isLoading: boolean;
    loadingState: LoadingState;
    items: T[];
    selectedKeys: Selection; 
    filterText: string; 
    error: Error; 
    sortDescriptor: SortDescriptor;
    reload: () => void;
    loadMore: () => void;
    sort: (sortDescriptor: SortDescriptor) => void;
    setSelectedKeys: (keys: Selection) => void;
    setFilterText: (filterText: string) => void;
    getItem: (key: Key) => T; 
    insert: (index: number, ...values: T[]) => void;
    insertBefore: (index: number, ...values: T[]) => void;
    insertAfter: (index: number, ...values: T[]) => void;
    append: (...values: T[]) => void; 
    prepend: (...values: T[]) => void; 
    remove: (...keys: T[]) => void;
    removeSelectedItem: () => void;
    move: (key: Key, toIndex: number) => void;
    moveBefore: (key: Key, keys: Key[]) => void; 
    moveAfter: (key: Key, keys: Key[]) => void;
    update: (key: Key, newValue: T[]) => void; 
 };


