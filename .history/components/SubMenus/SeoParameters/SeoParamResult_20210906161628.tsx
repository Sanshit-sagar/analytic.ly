import { atom, useAtom } from 'jotai'

const urlAtom = atom('/api/urchins/user/sanshit.sagar@gmail.com')
const fetchResultAtom = atom({ loading: true, error: null, data: null })

const fetchUrlAtom = atom(
    (get) => get(fetchResultAtom),
    (_get, set, url) => {
        const fetchData = async () => {

        }
    }
})

 const SeoParamResult = () => {
    const [fetchResult] = useAtom(fetchUrlAtom)

    return (
       <p> {JSON.stringify(fetchResult)} </p> 
    )
}

export default SeoParamResult