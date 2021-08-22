import React from 'react'

import { Box } from '../../primitives/Box'
import { Text } from '../../primitives/Text'

import { 
    Toolbar, 
    ToolbarToggleGroup,
    ToolbarToggleItem, 
    ToolbarLink, 
    ToolbarButton, 
    ToolbarSeparator 
} from '../../primitives/Toolbar'

import Loading from '../Loading'
import RangeSelector from './Selector'
import { useClickHistoryForUser } from '../../hooks/useClicks'

import { RefreshIcon } from '@radix-ui/react-icons'

const SelectionMenu = ({ amount, range, interval, darkMode, updateAmount, updateRange, updateInterval, toggleDarkMode }: WrapperProps) => {
    // const [updatedAt, setUpdatedAt] = useState(new Date(1970, 1, 1).getTime().toString());

    const { clicks, loading, error } = useClickHistoryForUser(amount, range, interval)
   
    if(error) return <p> error... </p>
    if(!clicks) return <p> no data </p> 
    
    return (
        <Box css={{ width: '100%' }}> 
            <Toolbar aria-label="Formatting options">
    
                <RangeSelector
                    loading={loading}
                    metricName='Amount'
                    metricValue={amount}
                    handleUpdate={updateAmount}
                />
                <RangeSelector 
                    loading={loading}
                    metricName='Range'
                    metricValue={range} 
                    handleUpdate={updateRange} 
                />

                <RangeSelector
                    loading={loading}
                    metricName='Interval'
                    metricValue={interval}
                    handleUpdate={updateInterval}
                /> 
                
                <ToolbarSeparator />

                <ToolbarToggleGroup type="single">
                    <ToolbarToggleItem value={loading ? '' : "sec"}>
                        { loading ? <Loading /> : <Text size='1'> Sec </Text> }
                    </ToolbarToggleItem>
                    <ToolbarToggleItem value={loading ? '' : "min"}>
                        { loading ? <Loading /> : <Text size='1'> Min </Text> }
                    </ToolbarToggleItem>
                    <ToolbarToggleItem value={loading ? '' : "hour"}>
                        { loading ? <Loading /> : <Text size='1'> Hour </Text> }
                    </ToolbarToggleItem>
                    <ToolbarToggleItem value={loading ? '' : "day"}>
                        { loading ? <Loading /> : <Text size='1'> Day </Text> }
                    </ToolbarToggleItem>
                </ToolbarToggleGroup>

                <ToolbarSeparator />

               {/* {updatedAt?.length &&
                    <ToolbarLink href="#" target="_blank" css={{ marginRight: 10 }}>
                        Edited 2 mins ago
                    </ToolbarLink>
                } */}
                <ToolbarButton css={{ marginLeft: 'auto' }}>
                    <RefreshIcon />
                </ToolbarButton>
            </Toolbar>
        </Box>
    );
}

export default SelectionMenu

