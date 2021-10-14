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
};

interface SmallContainerProps extends ContainerBaseProps {
    variant: 'small'; 
    bgColor: 'transparent'
}

interface LargeContainerProps extends ContainerBaseProps {
    variant: 'large';
    bgColor: 'transparent';
}

type ContainerProps = MargeProps<"button", SmallContainerProps | LargeContainerProps>
{ 
    { id, variant, bgColor, ...rest }: ContainerProps;
    ref: React.Ref<HTMLDivElement>
}: {
    let backgroundColor: 'transparent',

}



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