import { atom, useAtom } from 'jotai'


const fetchResultAtom = atom({ loading: true, error: null, data: null })
const runFetchAtom = atom(
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
    runFetch('/api/urchins/user/sanshit.sagar@gmail.com')
}

 const SeoParamResult = () => {
    const [fetchResult] = useAtom(runFetchAtom)

    return (
       <Text css={{ color: '$text' }}> {JSON.stringify(fetchResult)} </p> 
    )
}

export default SeoParamResult