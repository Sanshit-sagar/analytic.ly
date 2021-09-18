export type Key = string; 
export type ValidationState = 'valid' | 'invalid'
export type MenuTriggerAction = 'focus' | 'input' | 'manual'
export type FocusStrategy = 'first' | 'last'

export type ItemElement<T> = React.ReactElement<ItemProps<T>>
export type ChildrenType = any 
export type IconType = any

export type SelectionValue = number | string;

export interface SelectionOption {
    id: number;
    label: string;
}

export interface ItemProps<T> {
    children: React.ReactNode;
    title: React.ReactNode;
    textValue: string; 
    hasChildItems: boolean;
    childItems: Iterable<T>; 
}

export interface ComboBoxState {
    inputValue: string;
    isFocussed: boolean;
    selectedKey: Key;
    selectedItem: Node<T>;
    collection: Collection<Node<T>>;
    disabledKeys: Set<Key>;
    selectionManager: SelectionManager;
    focusStrategy: FocusStrategy;
    isOpen: boolean;
    setInputValue: (value: string) => void; 
    commit: () => void;
    open: (focusStrategy: FocusStrategy | null, trigger: MenuTriggerAction) => void; 
    toggle: (focusStrategy: FocusStrategy | null, trigger: MenuTriggerAction) => void;
    revert: () => void;
    setFocused: (isFocused: boolean) => void;
    setSelectedKey: (selectedKey: Key) => void;
    
}

export interface ComboBoxProps<T> {
    inputRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement>;
    popoverRef: React.RefObject<HTMLDivElement>;
    listBoxRef: React.RefObject<HTMLDivElement>;
    buttonRef?: React.RefObject<HTMLDivElement>;
    items: Iterable<T>;
    onOpenChange?: (isOpen: boolean, menuTrigger?: MenuTriggerAction | undefined) => void;
    label?: React.ReactNode; 
    description?: React.ReactNode;
    errorMessage?: React.ReactNode; 
    inputValue?: string;
    defaultInputValue?: string; 
    onInputChange?: (value: string) => void; 
    allowsCustomValue?: boolean;
    menuTriggerAction: MenuTriggerAction; // defaults to 'input'
    disabledKeys?: Iterable<Key>;
    disallowEmptySelection?: boolean;
    selectedKey?: string;
    defaultSelectedKey?: string;
    onSelectionChange?: (key: Key) => any; 
    isDisabled?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean; 
    placeholder?: string;
    autoFocus?: boolean; 
    validationState?: ValidationState;
    onFocus?: (e: FocusEvent) => void; 
    onBlur?:  (e: FocusEvent) => void; 
    onFocusChange?:  (e: FocusEvent) => void; 
    necessityIndicator?: IconType; 
    children: ChildrenType;
}

