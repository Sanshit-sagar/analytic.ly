

export const currentTime = new Date().getTime()
export const currentDate = new Date().getDate()
export const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth()
const fromMonth = new Date(currentYear, currentMonth)
const toMonth = new Date(currentYear + 1, currentMonth + 1)

export const monthAtom = atom(currentMonth)
export const yearAtom = atom(currentYear)
export const dateAtom = atom(
    (get) => new Date(get(yearAtom), get(monthAtom))
);
export const monthAtomsAtom = atom(
    (get) => get(dateAtom).getMonth(),
    (_get, set, update) => set(monthAtom, update)
);
export const yearAtomsAtom = atom(
    (get) => get(dateAtom).getFullYear(),
    (_get, set, update) => set(yearAtom, update)
)