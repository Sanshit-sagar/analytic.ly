type Partial<T> = {
    [P in keyof T]?: T[P];
};
//  USAGE of PARTIAL is: Partial<T>
// PersonPartial = Partial<Person>;
// Partial = 

type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

