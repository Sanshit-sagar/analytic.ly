import React from 'react'
import { styled } from '../../stitches.config'
import { Flex } from '../../primitives/Flex'

const containerStyles = {
    overflowY: 'hidden',
    overflowX: 'hidden',
    display: 'flex',
    fd: 'column',
    jc: 'space-between',
    ai: 'stretch',
    gap: 0,
    padding: '$1',
    margin: '$1',
    bc: 'transparent',
}

const wrapperStyles = {
    
}
export const Container = styled(Flex, {
    ...containerStyles
    height: 600,
    width: 1100,
})

export const LgContainer = styled(Flex, {
    height: 600,
    width: 1400,
    overflowY: 'hidden',
    overflowX: 'hidden',
    display: 'flex',
    fd: 'column',
    jc: 'space-between',
    ai: 'stretch',
    gap: 0,
    padding: '$1',
    margin: '$1',
    bc: 'transparent',
})


export const ParentSizeWrapper = styled(Flex, {
    height: 575,
    width: 1080,
    overflowY: 'hidden',
    overflowX: 'hidden',
    bc: '$loContrast',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    zIndex: 4,
    gap: '$1',
    margin: '$1',
    padding: '$1',
    border: '1px solid $accent',
    br: '$2'
})

export const LgParentSizeWrapper = styled(Flex, {
    height: 575,
    width: 1380,
    overflowY: 'hidden',
    overflowX: 'hidden',
    bc: '$loContrast',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    zIndex: 4,
    gap: '$1',
    margin: '$1',
    padding: '$1',
    border: '1px solid $accent',
    br: '$2'
})

export const MenuBar = styled(Flex, {
    width: '99.75%', 
    height: 35, 
    fd: 'row', 
    jc: 'space-between', 
    ai: 'center', 
    gap: '$2',
    pl: '$2',
    pr: '$2',
    ml: '$1',
    bc: '$loContrast',
    border: '1px solid $accent',
    br: '$2',
    color: '$text',
    overflowX: 'hidden',
    overflowY: 'hidden',
    '&:hover': {
        borderColor: '$accentPressed'
    }
})

const LargeContainer = React.forwardRef<HTMLDivElement>((props, ref) => {
    return (
        <LgContainer> 
            <LgParentSizeWrapper ref={ref} {...props}>

            </LgParentSizeWrapper>
        </LgContainer>
    );
}