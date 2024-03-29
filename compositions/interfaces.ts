import React, { ReactNode, ReactElement, JSXElementConstructor } from 'react'
import { SelectionManager } from '@react-stately/selection'

export type MenuTriggerAction = 'focus' | 'input' | 'manual'
export type SelectionMode = 'none' | 'single' | 'multiple'
export type OrientationType = 'horizontal' | 'vertical' 
export type ValidationState = 'valid' | 'invalid'
export type FocusStrategy = 'first' | 'last'
export type DirectionType = 'ltr' | 'rtl'
export type SizeType = 'small' | 'medium' | 'type'

export type ButtonType = 'button' | 'submit' | 'reset'
export type HoverEventType = 'hoverstart' | 'hoverend'
export type PointerType = 'mouse' | 'pen' 

export type ItemElement<T> = ReactElement<ItemProps<T>>
export type ChildrenType = any 
export type IconType = any
type LoadingState = 'loading' | 'loaded' | 'filtering' | 'sorting' | 'idle' | 'error'

export interface PressType {
    type: PressEventType;
    pointerType: PointerType;
    target: HTMLElement;
    shiftKey: boolean;
    ctrlKey: boolean;
    metaKey: boolean;
    altKey: boolean; 
}
type i18nFilterType = FilterTypeEnum.CONTAINS | FilterTypeEnum.STARTS_WITH | FilterTypeEnum.ENDS_WITH


export enum MenuTriggerActionEnum {
    FOCUS = 'focus',
    INPUT = 'input',
    MANUAL = 'manual'
};

export enum FocusStrategyEnum {
    FIRST = 'first',
    LAST = 'last',
};

export enum ValidationStateEnum {
    VALID = 'valid',
    INVALID = 'invalid'
};

export enum SelectionModeEnum {
    NONE = 'none', 
    SINGLE = 'single',
    MULTIPLE = 'multiple'
};

export enum DirectionEnum {
    LTR = 'ltr',
    RTL = 'rtl',
};

export enum OrientationEnum {
    HORIZONTAL = 'horizontal',
    VERTICAL = 'vertical',
}

export enum SizeEnum {
    SMALL = 'small',
    MEDIUM = 'medium',
    LARGE = 'large'
}

export enum HoverEventEnum {
    START = 'hoverstart',
    END = 'hoverend',
}


export enum PopoverVariantTypeEnum {
    SMALL = 'small',
    MEDIUM = 'medium',
    LARGE = 'large'
}

type PressEventType = 'pressstart' | 'pressend' | 'press' | 'pressup'

enum FilterTypeEnum {
    CONTAINS = 'contains',
    STARTS_WITH = 'startsWith',
    ENDS_WITH = 'endsWith',
}

export type PopoverVariantType = 
    | PopoverVariantTypeEnum.SMALL 
    | PopoverVariantTypeEnum.MEDIUM 
    | PopoverVariantTypeEnum.LARGE

export interface HoverEvent {
    type: HoverEventType;
    pointerType: PointerType;
    target: HTMLElement;
}

export interface Collection<T> {
    size: number;
    getKeys: () => Iterable<Key>;
    getItem: (key: Key) => T;
    at: (idx: number) => T;
    getKeyBefore: (key: Key) => Key | null;
    getKeyAfter: (key: Key) => Key | null;
    getFirstKey: () => Key | null; 
    getLastKey: () => Key | null; 
}

export interface Node<T> {
    type: string;
    key: Key; 
    value: T;
    level: number; 
    hasChildNodes: boolean;
    childNodes: Iterable<Node<T>>;
    rendered: React.ReactNode;
    textValue: string; 
    index?: number;
    element?: (element: ReactElement) => ReactElement;
    parentKey?: Key;
    nextKey?: Key;
    prevKey?: Key;
    props?: any;
}

export interface ItemProps<T> {
    children: ReactNode;
    title: ReactNode;
    textValue: string; 
    hasChildItems: boolean;
    childItems: Iterable<T>; 
}

export interface ComboBoxState<T> {
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
    close: () => void; 
}

interface ComboBoxWrapperProps<T> {
    item: T; 
    renderItem: (item: T) => React.ReactNode;
    onLoadMore?: () => void;
    loadingState?: LoadingState;
    defaultFilter: i18nFilterType;
    children: Collection<T>; 
    items: Iterable<T>;
    onOpenChange?: (isOpen: boolean, menuTrigger?: MenuTriggerAction | undefined) => void;
    label?: ReactNode; 
    description?: ReactNode;
    errorMessage?: ReactNode; 
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
}

export type BasicComboBoxItem = { id: string; name: string; }

export type ComboBoxComponentProps = ComboBoxWrapperProps<BasicComboBoxItem>;
export type ComboBoxStateProps = Omit<ComboBoxComponentProps, "defaultFilter">;

export type SelectionValue = number | string;
export interface SelectionOption {
    id: number;
    label: string;
}

export interface AriaNumberFieldProps<T> {
    id: string; 
    rel: string; 
    href: string;
    target: string; 
    elementType: any;
    children: ReactNode;
    isDisabled: boolean;
    isRequired: boolean;
    isReadOnly: boolean;
    placeholder: string; 
    incrementAriaLabel: string; 
    decrementAriaLabel: string; 
    excludeFromTabOrder: false; 
    validationState?: ValidationState; 
    step: number;
    value: number;
    minValue: number;
    maxValue: number;
    onChange: (value: T) => void; 
    label: string; 
    description: string;
    errorMessage: string; 
    onKeyUp: () => void; 
    onKeyDown: () => void;
    onBlur: (e: FocusEvent) => void;
    onFocus: (e: FocusEvent) => void;
    onFocusChange: (e: FocusEvent) => void; 
    onPressUp: (isFocussed: boolean) => void;
    onPressDown: (isFocussed: boolean) => void;
    onPressEnd: (isFocussed: boolean) => void;
    onPressStart: (isFocussed: boolean) => void;
    formatOptions: Intl.NumberFormatOptions;
}

export interface AriaButtonProps {
    id: string; 
    rel: string; 
    href: string;
    target: string; 
    children: ReactNode;
    isDisabled: boolean;
    isRequired: boolean;
    isReadOnly: boolean;
    placeholder: string; 
    excludeFromTabOrder: false; 
    onKeyUp: () => void; 
    onKeyDown: () => void;
    onBlur: (e: FocusEvent) => void;
    onFocus: (e: FocusEvent) => void;
    onFocusChange: (e: FocusEvent) => void; 
    onPressUp: (isFocussed: boolean) => void;
    onPressDown: (isFocussed: boolean) => void;
    onPressEnd: (isFocussed: boolean) => void;
    onPressStart: (isFocussed: boolean) => void;
    elementType: JSXElementConstructor<any>;
}