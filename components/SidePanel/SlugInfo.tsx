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
    email: string;
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

const SlugDetailsContainerWrapper = styled('div', {
    height: '135px',
    width: '212.5px',
    padding: '1px',
    bc: '$lightestPanel',
    br: '$2',
    ml: '$3'
})
const SlugDetailsContainer = styled(Flex, {
    height: 125,
    width: 200, 
    fd: 'column',
    jc: 'flex-start',
    ai: 'stretch',
    gap: '$1',
    bc: '$darkestPanel', 
    color: '$text',
    border: '1px solid $border', 
    br: '$1',
    boxShadow: '4px 0 0 0 $neutral',
    margin: 0, 
    padding: 0,
    mt: '$1',
    ml: '$1',
    pl: '1px',
    pt: '$1'
});


const NodeText = ({ text }: { 
    text: string; 
}) => {
    return <Text css={{ color: '$funkyText'}}> {text} </Text>;
}

function deserialize(data: SerializedSlug, formatter: Intl.DateTimeFormat): SlugDetails | undefined {
    let { slug, email, url, password, expiration, destination, createdAt } = data
    
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
    }
}

export const SlugInfo = ({ slug }: { slug: string }) => {
    let formatter = useDateFormatter()
    const { data, loading, error }: SerializedSwrResponse = useSlugDetails(slug)
    
    if(loading) return  <Text> loading... </Text>
    if(error) return <Text> error </Text>

    let details: SlugDetails | undefined = (data && !loading && !error) ? deserialize(data, formatter) : undefined

    if(!details) return null

    return (
        <SlugDetailsContainerWrapper>
            <SlugDetailsContainer>
                <Tree name={<NodeText text={details.expiration?.start || '-'} />} icon={<StopwatchIcon />} defaultOpen />
                <Tree name={<NodeText text={details.expiration?.end || '-'} />} icon={<LapTimerIcon />} defaultOpen />
                <Tree name={<NodeText text={details.password} />} icon={<LockClosedIcon />} defaultOpen />
                <Tree name={<NodeText text={details.createdAt} />} icon={<ClockIcon />}  defaultOpen />
            </SlugDetailsContainer>
        </SlugDetailsContainerWrapper>
    )
}