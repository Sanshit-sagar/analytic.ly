

export const Controller = styled(Flex, {
    width: '100%',
    fd: 'row',
    jc: 'flex-end',
    ai: 'flex-start',
    gap: '$1',
    height: 25,
    margin: 0,
    padding: '1px',
    border: '1px solid $border',
    '&:hover': {
        borderColor: '$border3'
    }
});

export const VisxParentSizeWrapper = styled('div', {
    height: '450px',
    width: '695px',
    ml: '$2',
    mt: '$1',
    mr: '$1',
    border: '2px solid',
    br: '$2', 
    borderColor: '$accent',
    bc: '$loContrast',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    gap: '$1',
    padding: '$1',
    zIndex: 4,
});