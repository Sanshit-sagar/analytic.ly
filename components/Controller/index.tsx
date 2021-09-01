import React from 'react'

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { 
    ToolbarToggleGroup, 
    ToolbarToggleItem,
    Toolbar
} from '../../primitives/Toolbar'

import { useAtom } from 'jotai'
import { 
    selectedIndexAtom, 
    mapOptions
} from '../../pages/geo'


interface IMapOption {
    id: number;
    title: string; 
}

export const MapToggleGroup = () => {
    const [selectedIndex, setSelectedIndex] = useAtom(selectedIndexAtom)

    const handleChange = (value: string) => {
        setSelectedIndex(parseInt(value));
    }

    return (
        <ToolbarToggleGroup 
            type="single" 
            value={selectedIndex} 
            onValueChange={handleChange} 
            aria-label="Text alignment"
            disabled={false}
        >
            {mapOptions.map((mapOpt: IMapOption, i: number) => {
                return (
                    <ToolbarToggleItem 
                        key={i}
                        value={`${mapOpt.id}`}
                        aria-label="Current-Map"
                    >
                        <Text size='1'> {`${mapOpt.title}`} </Text>
                    </ToolbarToggleItem>
                );
            })}
        </ToolbarToggleGroup>
    );
}

const Controller = () => {

    return (
        <Toolbar>
            <Flex css={{ fd: 'row', jc: 'flex-start', ai: 'stretch', gap: '$1' }}>
                <MapToggleGroup />
            </Flex>
        </Toolbar>
    );
}

export default Controller 