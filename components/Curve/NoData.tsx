import { Text } from '../../primitives/Text'
import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'

import { PatternLines  } from '@visx/pattern';

interface IMarginProps {
    top: number;
    left: number;
    bottom: number;
    right: number;
}

interface INoClicksToShowProps {
    height: number; 
    width: number;
    margin: IMarginProps;
}

const NoDataPlaceholder = ({ height, width, margin }: INoClicksToShowProps ) => {
    return (
        <Box>
            <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'center', gap: '$1', mt: '$1' }}>
                <Text size='1'>
                    No Clicks in this Range
                </Text>
                <svg width={width} height={height}>
                    <PatternLines
                        id='error'
                        height={6}
                        width={6}
                        stroke="black"
                        strokeWidth={1}
                        orientation={['vertical', 'horizontal']}
                    />
                    <rect
                        x={margin.left/2}
                        y={margin.top}
                        width={width - margin.left - margin.right}
                        height={height - margin.top - margin.bottom}
                        fill={`url(#error)`}
                        rx={14}
                    />
                </svg>
            </Flex>
        </Box>
    )
}

export default NoDataPlaceholder