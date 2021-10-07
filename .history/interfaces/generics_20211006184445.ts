interface Box<Type> {
    contents: Type;
}

nterface Dictionary<T> {
    [key: number]: T;
}

type OrNull<Type> = Type | null;
 
type OneOrMany<Type> = Type | Type[];
 
type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>;
    
type OneOrManyOrNullStrings = OneOrManyOrNull<string>;