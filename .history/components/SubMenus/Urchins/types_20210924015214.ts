import { SortDirection, LoadingState }
    
export interface ApiResponse {
    count: number;
    previous: string | undefined; 
    next: string | undefined; 
    results: string[] | undefined;
}

export interface SortDescriptor {
    column: Key;
    direction: SortDirection; 
}

export interface AsyncListStateUpdate<T, C> {
    cursor: C; 
    filterText: string; 
    items: Iterable<T>;
    selectedKeys: Iterable<Key>; 
    sortDescriptor: SortDescriptor;
}

export interface AsyncListLoadOptions<T, C> {
    items: T[];
    selectedKeys: Selection; 
    sortDescriptor: SortDescriptor;
    signal: AbortSignal; 
    cursor: C;
    filterText: string;
    loadingState: LoadingState;
}

// const AsyncListLoadOptions = (state: AsyncListLoadOptions<T,C>) => Promise<AsyncListStateUpdate<T,C>>

export interface AsyncListOptions<T, C> {
    load: (state: AsyncListLoadOptions<T, C>) => Promise<AsyncListStateUpdate<T, C>>;
    initialSelectedKeys: Iterable<Key>;
    initialSortDescriptor: SortDescriptor;
    initialFilterText: string;
    getKey: (item: T) => Key;
    sort: (state: AsyncListLoadOptions<T, C>) => Promise<AsyncListStateUpdate<T, C>>;
}

export interface UseAsyncList<T> {
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


