
interface SortDescriptor {
    
}

interface AsyncListOptions<T, C> {
    initialSelectedKeys: Iterable<Key>;
    initialSortDescriptor: SortDescriptor;

}