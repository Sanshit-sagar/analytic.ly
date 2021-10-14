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
} & { newMember: boolean }