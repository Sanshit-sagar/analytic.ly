
interface IUsePaginatedClicksProps {
    cursor: number;
    pageSize: number;
}

const usePaginatedClicks = ({ cursor, pageSize: number }: IUsePaginatedClicksProps) => {
    const email = 'sanshit.sagar@gmail.com'
    let endpoint = `/api/clicks/paginate/${email}/${cursor}/${pageSize}`
}