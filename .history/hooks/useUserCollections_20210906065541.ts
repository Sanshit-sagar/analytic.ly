import useSWR from 'swr'
import { fetcher } from '../lib/utils/fetcher'

interface IUserCollectionProps {
    email: string; 
}

interface UserUtmDatum {
    utm: 'campaign' | 'term' | 'medium' | 'content' | 'source';  
    tags: ITag[]; 
}

interface ITag {
    name: string;
    associatedSlugs?: string[];
    associatedTemplateIds?: string[];
    clicks?: number;
}

export const useUserSeoCollection = ({ email }: IUserCollectionProps) => {
    email = email ||  = 'sanshit.sagar@gmail.com'

    let error = null
    const userUtms: UserUtmDatum[] = [
        { utm: 'campaign', tags: [{ name: 'word1' }, { name: 'word2' }] },
        { utm: 'term', tags:[{ name: 'word3' }, { name: 'word4' }] },
        { utm: 'medium', tags: [ { name: 'word5' }, { name: 'word7' }, { name: 'word6'}] },
        { utm: 'content', tags: [{ name: 'word8' }, { name: 'word9' }] },
        { utm: 'source', tags: [{ name: 'word10' }, { name: 'word1' }] }
    ];

    return {
        userUtms,
        loading: !userUtms && !error,
        error
    }
}