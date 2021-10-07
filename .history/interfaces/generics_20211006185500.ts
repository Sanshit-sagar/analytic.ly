interface Box<Type> {
    contents: Type;
}

interface Dictionary<T> {
    [key: number]: T;
}

type Container<T> = { 
    value: T 
};

type OrNull<Type> = Type | null;
 
type OneOrMany<Type> = Type | Type[];
 
type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>;
    
type OneOrManyOrNullStrings = OneOrManyOrNull<string>;


// 