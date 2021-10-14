type Partial<T> = {
    [P in keyof T]?: T[P];
};
//  USAGE of PARTIAL is: Partial<T>
// PersonPartial = p

type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

