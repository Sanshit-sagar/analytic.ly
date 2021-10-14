import React from 'react'
import { styled } from '../../stitches.config'
import { Flex } from '../../primitives/Flex'

const containerStyles: React.HTMLAttributes<HTMLDivElement> = {
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
};

const wrapperStyles: React.HTMLAttributes<HTMLDivElement> = {
    overflowY: 'hidden',
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
};

export const Container = styled(Flex, {
    ...containerStyles,
    height: 600,
    width: 1100,
})

export const LgContainer = styled(Flex, {
    ...containerStyles,
    height: 600,
    width: 1400
})


export const ParentSizeWrapper = styled(Flex, {
    ...wrapperStyles,
    height: 575,
    width: 1080,
})

export const LgParentSizeWrapper = styled(Flex, {
    ...wrapperStyles,
    height: 575,
    width: 1380
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

let ContainerProps = React.ComponentProps<typeof>

const LargeContainer = React.forwardRef<HTMLDivElement, >((props, ref) => {
    return (
        <LgContainer> 
            <LgParentSizeWrapper {...props} ref={ref}>
                {props.children}
            </LgParentSizeWrapper>
        </LgContainer>
    );
}