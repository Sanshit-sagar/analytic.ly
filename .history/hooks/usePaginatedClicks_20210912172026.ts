
interface IUsePaginatedClicksProps {
    cursor: number;
    pageSize: number;
}

const usePaginatedClicks = ({ cursor, pageSize }: IUsePaginatedClicksProps) => {
    const email = 'sanshit.sagar@gmail.com'
    let endpoint = `/api/clicks/paginate/${email}/${cursor}/${pageSize}`

    const clicks = useSWR(endpoint);
}