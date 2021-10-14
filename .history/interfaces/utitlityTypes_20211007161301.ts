type Partial<T> = {
    [P in keyof T]?: T[P];
};

type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

type PersonPartial = Partial<Person>

type ReadonlyPerson = Readonly<Person>;