import React from 'react'

import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'

import { 
    Toolbar, 
    ToolbarButton
} from '../../primitives/Toolbar'

const mapOptions = [
    { id: '0', label: 'Global' },
    { id: '1', label: 'USA' },
];

const GeoController = ({ map, updateMap }: { I}) => {
    
    return (
        <Toolbar css={{ bc: 'transparent' }}> 
            <Flex css={{ fd: 'row', jc: 'flex-start', ai: 'stretch', gap: '$2'}}>
                {mapOptions.map((map: any, i: number) => {
                    return (
                        <ToolbarButton
                            key={i}
                            as='button'
                            value={map.id}
                            onClick={updateMap}
                        >
                            <Text size='1'> {map.label} </Text>
                        </ToolbarButton>
                    );
                })}
             </Flex>
        </Toolbar> 
    )
}

export default GeoController