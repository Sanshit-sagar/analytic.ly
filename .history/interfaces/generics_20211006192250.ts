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


// DISTRIBUTIVE V/S NON DISTRIBUTIVE
type ToArray<Type> = Type extends any ? Type[] : never;

type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;

// INFER WITHIN CONDITIONALS

type GetReturnType<Type> = Type extends (...args: never[]) => infer Return ? Return : never;

type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;

type Str = Flatten<string[]>;
type Num = Flatten<number>;

type NameOrId<T extends number | string> = T extends number ? IdLabel : NameLabel;

type voidFunc = () => void;