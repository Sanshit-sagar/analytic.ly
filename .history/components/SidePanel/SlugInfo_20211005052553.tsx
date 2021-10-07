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

interface SlugDetails {
    createdAt: number; 
    destination: string; 
    email: string; 
    expiration: ExpirationType | undefined; 
    password: string; 
    slug: string; 
    encodedUrl: string; 
}

function deserialize({ slug, url, password, expiration, destination, createdAt }: { } | undefined {
   
    if(!data?.slug) return undefined;

    let formatter = useDateFormatter()

    let doesExpire = false
    let expArr: string[] = []
    let expStart: string = ''
    let expEnd: string  = ''

    if(data?.expiration) {
        doesExpire = true
        expArr = data.expiration.substring(9).split('&'),
        expStart = expArr?.length ?  formatter.format(new Date(parseInt(expArr[0]))) : ''
        expEnd = expArr?.length && expArr[1]?.length ? formatter.format(new Date(parseInt(expArr[1].substring(6)))) : ''
    }

    return {
        ...data,
        encodedUrl: data.url,
        createdAt: formatter.format(new Date(data.createdAt)),
        password: data.password.substring(5),
        expiration: doesExpire ? {
                        start: expStart,
                        end: expEnd,
                    } : undefined
        }
}

type SwrResponse = {
    data: string[];
    loading: boolean;
    error: Error | any | null
}

export const SlugInfo = ({ slug }: SlugDetails) => {
    const { data, loading, error }: SwrResponse = useSlugDetails(slug)
    
    if(loading) return  <Text> loading... </Text>
    if(error) return <Text> error </Text>


    let details: SlugDetails | undefined = (data && !loading && !error) ? deserialize(data) : undefined

    if(details===undefined) return null
    
    return (
        <SlugDetailsContainer>
            <Tree name={details.expiration} icon={<StopwatchIcon />} defaultOpen />
            <Tree name={details.password} icon={<LockClosedIcon />} defaultOpen />
            <Tree name={details.createdAt} icon={<ClockIcon />}  defaultOpen />
        </SlugDetailsContainer>
    )
}