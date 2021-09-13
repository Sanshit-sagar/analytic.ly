
interface IUsePaginatedClicksProps {
    cursor: number;
    pageSize: number;
}

const usePaginatedClicks = ({ cursor, pageSize }: IUsePaginatedClicksProps) => {
    const email = 'sanshit.sagar@gmail.com'
    let endpoint = `/api/clicks/paginate/${email}/${cursor}/${pageSize}`

    const { data, error } = useSWR(endpoint);

    return {
        page: data.clickstream
    }
}