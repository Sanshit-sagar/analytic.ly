
interface SortDescriptor {
    column: Key;
    
}

interface AsyncListOptions<T, C> {
    initialSelectedKeys: Iterable<Key>;
    initialSortDescriptor: SortDescriptor;

}