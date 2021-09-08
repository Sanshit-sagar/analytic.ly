import { atom, useAtom } from 'jotai'


const urlAtom = atom('/api/urchins/user/sanshit.sagar@gmail.com')
const fetchUrlAtom = atom(async (get) => {
    const response = await fetch(get(urlAtom))
    return await response.json()
})

export const SeoParamResult = () => {
    const [fetchResult] = useAtom(fetchUrlAtom)

    return (
       <p> {JSON.stringify(fetchResult)} </p> 
    )
}