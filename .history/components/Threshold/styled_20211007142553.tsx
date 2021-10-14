import React from 'react'
import { styled } from '../../stitches.config'
import { Flex } from '../../primitives/Flex'

const containerStyles: React.CSSProperties = {
    overflowY: 'hidden',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    zIndex: 4,
    gap: '$1',
    margin: '$1',
    padding: '$1',
    border: '1px solid $accent',
    borderRadius: '$2'
};

const wrapperStyles: React.CSSProperties = {
    overflowY: 'hidden',
    backgroundColor: '$loContrast',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    zIndex: 4,
    gap: '$1',
    margin: '$1',
    padding: '$1',
    border: '1px solid $accent',
    borderRadius: '$2'
};

interface ContainerBaseProps {
    id?: string; 
    isLarge?: boolean;
    s
}

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

function ContainerBase(
    { id, display, flex, backgroundColor, color, }: 
)


type ContainerProps = {
    id?: string; 
    isLarge?: boolean; 
} & React.ComponentPropsWithoutRef<"div">;

const LargeContainer = React.forwardRef<HTMLDivElement, ContainerProps>((props, ref) => {
    return (
        <LgContainer> 
            <LgParentSizeWrapper {...props} ref={ref}>
                {props.children}
            </LgParentSizeWrapper>
        </LgContainer>
    );
}