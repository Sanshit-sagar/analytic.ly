
interface ColumnHeaderProps {
    node: GridNode<unknown>;
    isVirtualized?: boolean;
}

interface ColumnHeaderAria {
    /** Props for the [column header](https://www.w3.org/TR/wai-aria-1.1/#columnheader) element. */
    columnHeaderProps: HTMLAttributes<HTMLElement>
}