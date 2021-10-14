// type Partial<T> = {
//     [P in keyof T]?: T[P];
// };
//  USAGE of PARTIAL is: Partial<T>
// type PersonPartial = Partial<Person>;
// === type PersonPartial = { name?: string | undefined; age?: number | undefined;}

// type Readonly<T> = {
//     readonly [P in keyof T]: T[P];
// };


////////////////////////////////
///// LOOK INTO PROXY + INDEXED MAP TYPES
////////////////////////////

type PartialWithNewMember<T> = {
    [P in keyof T]?: T[P];
} & { newMember: boolean };

type Proxy<T> = {
    get(): T;
    set(value: T): void;
};

type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>;
};


// Remove types from T that are assignable to U
type Diff<T, U> = T extends U ? never : T;
// Remove types from T that are not assignable to U
type Filter<T, U> = T extends U ? T : never;

type AnyFunction = (...args: any[]) => any;

// type ReturnType<T extends AnyFunction> = T extends (...args: any[]) => infer R ? R : any;