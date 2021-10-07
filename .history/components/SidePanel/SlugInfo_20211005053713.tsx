import { styled } from '../../stitches.config'

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { Tree } from '../../compositions/Tree'


import { useSlugDetails } from '../../hooks/useSavedCollections'
import { ClockIcon, LockClosedIcon, StopwatchIcon } from '@radix-ui/react-icons'

import { useDateFormatter } from '@react-aria/i18n'

const SlugDetailsContainer = styled(Flex, {
    height: 100,
    width: 100, 
    fd: 'column',
    jc: 'flex-start',
    ai: 'stretch',
    gap: '$1',
    bc: 'transparent', 
    color: '$text',
    border: 'none', 
    margin: 0, 
    padding: 0,
    ml: '$1',
    pl: '1px',
    pt: '$1',
});

type ExpirationType = { start: string; end: string; }

interface SerializedSlug {
    slug: string;
    destination: string; 
    url: string;
    password?: string;
    expiration?: string;
    createdAt: number;
}

interface SlugDetails {
    createdAt: number;
    destination: string; 
    email: string; 
    expiration: ExpirationType | undefined; 
    password: string; 
    slug: string; 
    encodedUrl: string; 
}

function deserialize(data: SerializedSlug): SlugDetails {
    let { slug, url, password, expiration, destination, createdAt } = data
   
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
        destination,
        encodedUrl: url,
        createdAt: formatter.format(new Date(createdAt)),
        password: password?.substring(5) && '',
        expiration: doesExpire ? { start: expStart, end: expEnd } : undefined,
    };
}

type SwrResponse = {
    data: string[];
    loading: boolean;
    error: Error | any | null;
}

const NodeText = ({ text }: { text: string }) => {
    return (
        <Text css={{ color: '$funkyText'}}> {children} </Text> 
    );
}

export const SlugInfo = ({ slug }: { slug: string }) => {
    const { data, loading, error }: SwrResponse = useSlugDetails(slug)
    
    if(loading) return  <Text> loading... </Text>
    if(error) return <Text> error </Text>


    let details: SerializedSlug | undefined = (data && !loading && !error) ? deserialize(data) : undefined

    if(details===undefined) return null
    
    return (
        <SlugDetailsContainer>
            <Tree name={<NodeText text={details.expiration}/>} icon={<StopwatchIcon />} defaultOpen />
            <Tree name={<NodeText text={details.password}/>} icon={<LockClosedIcon />} defaultOpen />
            <Tree name={<NodeText text={details.createdAt}/>} icon={<ClockIcon />}  defaultOpen />
        </SlugDetailsContainer>
    )
}