import { styled } from '../../stitches.config'

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { Tree } from '../../compositions/Tree'
import { useSlugDetails } from '../../hooks/useSavedCollections'


// import { ClockIcon, LockClosedIcon, StopwatchIcon } from '@radix-ui/react-icons'
// import { deleteAbTestConfigAtom } from '../../atoms/abtesting'

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


interface SlugDetails {
    createdAt: number; 
    destination: string; 
    email: string; 
    expiration: string; 
    password: string; 
    slug: string; 
    url: string; 
}

function deserialize(data: SlugDetails): SlugDetails | undefined {
    if(!data?.slug) return undefined;

    return {
        ...data,
        encodedUrl: data.url,
        createdAt: new Date(data.url).toDateString(),
    }
}

type SwrResponse = {
    data: string[];
    loading: boolean;
    error: Error | any | null
}

type JsonProps = {
    collapsed: boolean;
    onAdd: boolean;
    onEdit: boolean;
    onDelete: boolean; 
    enableClipboard: boolean;
    displayObjectSize: boolean;
    displayDataTypes: boolean;
    indentWidth: number; 
    collapseStringsAfter: number; 
    iconStyle: "circle" | "triangle" | "square" | undefined;
}

const defaultProps: JsonProps = {
    collapsed: false,
    collapseStringsAfter: 5,
    onAdd: false,
    onEdit: false,
    onDelete: false,
    displayObjectSize: false,
    enableClipboard: false,
    indentWidth: 4,
    displayDataTypes: false,
    iconStyle: 'square'
};

function getExampleJson() {
    return {
        string: 'this is a test string',
        integer: 42,
        array: [1, 2, 3, 'test', NaN],
        float: 3.14159,
        undefined: undefined,
        object: {
            'first-child': true,
            'second-child': false,
            'last-child': null
        },
        string_number: '1234',
        date: new Date()
    };
};


export const SlugInfo = ({ slug }: SlugDetails) => {
    const { data, loading, error }: SwrResponse = useSlugDetails(slug)
    
    if(loading) return  <Text> loading... </Text>
    if(error) return <Text> error </Text>

    let details: SlugDetails | undefined = (data && !loading && !error) ? deserialize(data) : undefined
    if(details===undefined) return null

    return (
        <SlugDetailsContainer>
            <ReactJson 
                src={() => getExampleJson()} 
                {...defaultProps} 
            />
        </SlugDetailsContainer>
    )
}



// export const SlugInfo = ({ slug }: SlugDetails) => {
  
//     const { data, loading, error }: SwrResponse = useSlugDetails(slug)
    
//     if(loading) return  <Text> loading... </Text>
//     if(error) return <Text> error </Text>


//     let details: SlugDetails | undefined = (data && !loading && !error) ? deserialize(data) : undefined

//     if(details===undefined) return null
    
//     return (
//         <SlugDetailsContainer>
//             <Tree name={details.expiration} icon={<StopwatchIcon />} defaultOpen />
//             <Tree name={details.password} icon={<LockClosedIcon />} defaultOpen />
//             <Tree name={details.createdAt} icon={<ClockIcon />}  defaultOpen />
//         </SlugDetailsContainer>
//     )
// }