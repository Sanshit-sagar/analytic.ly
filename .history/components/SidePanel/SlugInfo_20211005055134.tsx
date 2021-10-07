import { styled } from '../../stitches.config'

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { Tree } from '../../compositions/Tree'

import { 
    ClockIcon, 
    LockClosedIcon, 
    StopwatchIcon, 
    LapTimerIcon 
} from '@radix-ui/react-icons'

import { useDateFormatter } from '@react-aria/i18n'
import { useSlugDetails } from '../../hooks/useSavedCollections'

export type ExpirationType = { start: string; end: string; }

export interface SerializedSlug {
    slug: string;
    url: string;
    destination: string; 
    password?: string;
    expiration?: string;
    createdAt: number;
}

export interface SlugDetails {
    createdAt: string;
    destination: string; 
    email: string; 
    expiration: ExpirationType | undefined; 
    password: string; 
    slug: string; 
    encodedUrl: string; 
}


interface SerializedSwrResponse {
    data: SerializedSlug | undefined; 
    loading: boolean;
    error: Error | null; 
}


const NodeText = ({ text }: { text: string }) => {
    return <Text css={{ color: '$funkyText'}}> {text} </Text>;
}

function deserialize(data: SerializedSlug): SlugDetails | undefined {
    let { slug, email, url, password, expiration, destination, createdAt } = data
   
    if(!slug) return undefined;

    let formatter = useDateFormatter()

    let doesExpire = false
    let expArr: string[] = []
    let expStart: string = ''
    let expEnd: string  = ''

    if(expiration) {
        doesExpire = true
        expArr = expiration.substring(9).split('&'),
        expStart = expArr?.length ?  formatter.format(new Date(parseInt(expArr[0]))) : ''
        expEnd = expArr?.length && expArr[1]?.length ? formatter.format(new Date(parseInt(expArr[1].substring(6)))) : ''
    }

    return {
        slug,
        email,
        destination,
        encodedUrl: url,
        createdAt: formatter.format(new Date(createdAt)),
        password: password?.length ? password?.substring(5) : '',
        expiration: doesExpire ? { start: expStart, end: expEnd } : undefined,
    };
}

export const SlugInfo = ({ slug }: { slug: string }) => {
    const { data, loading, error }: SerializedSwrResponse = useSlugDetails(slug)
    
    if(loading) return  <Text> loading... </Text>
    if(error) return <Text> error </Text>


    let details: SlugDetails | undefined = (data && !loading && !error) ? deserialize(data) : undefined

    if(!details) return null
    
    return (
        <SlugDetailsContainer>
            <Tree name={<NodeText text={details.expiration?.start || '-' />} icon={<StopwatchIcon />} defaultOpen />
            <Tree name={<NodeText text={details.expiration?.end || '-' />} icon={<LapTimerIcon />} defaultOpen />
            <Tree name={<NodeText text={details.password} />} icon={<LockClosedIcon />} defaultOpen />
            <Tree name={<NodeText text={details.createdAt} />} icon={<ClockIcon />}  defaultOpen />
        </SlugDetailsContainer>
    )
}