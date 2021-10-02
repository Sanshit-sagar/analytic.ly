import { styled } from '../../stitches.config'

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { ScrollArea } from '../../primitives/ScrollArea'
import { Tree } from '../../compositions/Tree'
import { Box } from '../../primitives/Box'
import useSWR from 'swr'

import { ExampleTable } from '../Table/Aria/ExampleTable'


import {
    useSavedSlugs, 
    useSavedDestinations 
} from '../../hooks/useSavedCollections'

interface SwrResponse {
    data: string[];
    loading: boolean;
    error: Error | null; 
}
interface CollectionProps {
    name: string; 
    data: string[]; // TODO replace with Collection[] 
    loading: boolean;
    error: Error | null; 
}

interface MappingProps {
    name: string; 
    data: {
        [key: string]: string[] 
    }; 
    loading: boolean; 
    error: Error | null; 
}

const CollectionContainer = styled(Flex, {
    height: '100%',
    width: '300px',
    margin: 0,
    padding: '$1',
    fd: 'column', 
    jc: 'flex-start', 
    ai: 'flex-start', 
    gap: '$1'
});

const Collection = ({ name, data, loading, error }: CollectionProps) => {
    if(loading) return <Text> Loading... </Text>
    if(error) return <Text> Error {error?.message || '!'} </Text>
    
    return (
        <CollectionContainer>    
            <Tree name={<Text size='2'> {name} </Text>} level={1} defaultOpen>
                {data && data.map((datum: string, idx: number) => (
                    <Tree 
                        key={`slugIdx-${idx}`} 
                        level={2} 
                        name={datum} 
                    />
                ))}
            </Tree>
        </CollectionContainer>
    )
}

function ExampleTable(props) {
    let columns = [
      {name: 'Name', key: 'name'},
      {name: 'Type', key: 'type'},
      {name: 'Date Modified', key: 'date'}
    ];
  
    let rows = [
      {id: 1, name: 'Games', date: '6/7/2020', type: 'File folder'},
      {id: 2, name: 'Program Files', date: '4/7/2021', type: 'File folder'},
      {id: 3, name: 'bootmgr', date: '11/20/2010', type: 'System file'},
      {id: 4, name: 'log.txt', date: '1/18/2016', type: 'Text Document'}
    ];
  
    return (
      <Table aria-label="Example dynamic collection table" {...props}>
        <TableHeader columns={columns}>
          {(column) => <Column>{column.name}</Column>}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => <Row>{(columnKey) => <Cell>{item[columnKey]}</Cell>}</Row>}
        </TableBody>
      </Table>
    );
  }

const SlugInfo = ({ slug }: { slug: string; }) => {
    const {data, error} = useSWR(`/api/configs/slug/${slug}`)

    let fields = data ? Object.entries(data.data) : []

    return (
        <Box css={{ height: '50px', width: '50px', bc: '$panelDullest'}}>
            
        </Box>
    )
}

const Mapping = ({ name, data, loading, error }: MappingProps) => {
    if(loading) return <Text> Loading... </Text>
    if(error) return <Text> Error {error?.message || '!'} </Text>

    return (
        <ScrollArea>
            <CollectionContainer>
                <Tree name={<Text size='2'> {name} </Text>} level={1} defaultOpen>
                    {data && Object.keys(data).map((url, i) => {
                        let slugs = data[url] 
                        return (
                            <Tree key={i} name={`${url} (${slugs.length})`} level={2} actionable defaultOpen>
                                {slugs.map((slug, j) => (
                                    <Tree key={j} name={slug} linkable level={3}>
                                        <SlugInfo slug={slug} /> 
                                    </Tree> 
                                ))}
                            </Tree>
                        )
                    })}
                </Tree>
            </CollectionContainer>
        </ScrollArea>
    )
}

export const SavedSlugs = () => {
    const { data, loading, error }: SwrResponse = useSavedSlugs()
    return <Collection name={'Slugs'} data={data} loading={loading} error={error} /> 
}

export const SavedDestinations = () => {
    const { data, loading, error }: SwrResponse = useSavedDestinations()
    return <Mapping name={'Destination URLs'} data={data} loading={loading} error={error} /> 
}