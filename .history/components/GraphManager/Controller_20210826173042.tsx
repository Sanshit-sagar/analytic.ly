import {
    Toolbar,
    ToolbarSeparator
} from '../../primitives/ToolbarSeparator'

import {
    Quantity,
    TimeAgo,
    TickSize,
    ToggleGroup,
    Actions
} from './index'


const Controls = () => {

    return (
        <Toolbar>
            <Quantity />
            <TimeAgo /> 
            <TickSize />
            <ToolbarSeparator />
            <ToggleGroup /> 
            <ToolbarSeparator />
            <Actions />
        </Toolbar>
    );
}