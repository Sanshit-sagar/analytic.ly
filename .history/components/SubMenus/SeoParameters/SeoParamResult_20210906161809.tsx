import { atom, useAtom } from 'jotai'

const urlAtom = atom('/api/urchins/user/sanshit.sagar@gmail.com')
const fetchResultAtom = atom({ loading: true, error: null, data: null })

const fetchUrlAtom = atom(
    (get) => get(fetchResultAtom),
    (_get, set, url) => {
        const fetchData = async () => {
            set(fetchResultAtom, (prev) => ({ ...prev, loading: true }))
            try {
                const response = await fetch(url)
                const data = await response.json()
                set(fetchResultAtom, { loading: false, error: null, data })
            } catch (error) {
                set(fetchResultAtom, { loading: false, error, data: null })
            }
        }
        fetchData();
    }
)
runFetchAtom.onMount = (runFetch) => {

}

 const SeoParamResult = () => {
    const [fetchResult] = useAtom(fetchUrlAtom)

    return (
       <p> {JSON.stringify(fetchResult)} </p> 
    )
}

export default SeoParamResult