import {
    Quantity,
    TimeAgo,
    TickSize,
    
}


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