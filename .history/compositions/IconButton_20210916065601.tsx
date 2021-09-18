


const IconButtonWithTooltip = ({ label, onClick, icon }: IIconButtonWithTooltipProps) => {

    return (
        <Tooltip content={'Remove test from configuration'}>
            <IconButton
                size='1' 
                variant='ghost'
                onClick={onClick}
            >
                <Icon label={label}>
                    {icon}
                </Icon>
            </IconButton>
        </Tooltip>
    )
}