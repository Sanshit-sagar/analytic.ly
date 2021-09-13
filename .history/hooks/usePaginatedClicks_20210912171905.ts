

const usePaginatedClicks = ({ cursor: number, pageSize: number }) => {
    const email = 'sanshit.sagar@gmail.com'
    let endpoint = `/api/clicks/paginate/${email}/${cursor}/${pageSize}`
}