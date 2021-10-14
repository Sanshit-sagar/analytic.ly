// type Partial<T> = {
//     [P in keyof T]?: T[P];
// };
//  USAGE of PARTIAL is: Partial<T>
// type PersonPartial = Partial<Person>;
// === type PersonPartial = { name?: string | undefined; age?: number | undefined;}

// type Readonly<T> = {
//     readonly [P in keyof T]: T[P];
// };

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

function proxify<T>(o: T): Proxify<T> {
    // ... wrap proxies ...
}

// let props = { rooms: 4 };
// let proxyProps = proxify(props);

function unproxify<T>(props: Proxify<T>) {

}