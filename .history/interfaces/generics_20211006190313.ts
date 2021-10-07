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

function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}