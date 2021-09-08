

interface IUserCollectionProps {
    email: string; 
}

interface UserUtmDatum {
    utm: string;
    tags: UserUtmDatum[]; 
}

export const useUserSeoCollection = ({ email }: IUserCollectionProps) => {
    const userUtms: UserUtmDatum[] = [
        { utm: 'campaign', tags: [{ name: 'word1' }, { name: 'word2' }] },
        { utm: 'term', tags:[{ name: 'word3' }, { name: 'word4' }] },
        { utm: 'medium', tags: [ { name: 'word5' }, { name: 'word7' }, { name: 'word6'}] },
        { utm: 'content', tags: [{ name: 'word8' }, { name: 'word9' }] },
        { utm: 'source', tags: [{ name: 'word10' }, { name: 'word1' }] }
    ];
}