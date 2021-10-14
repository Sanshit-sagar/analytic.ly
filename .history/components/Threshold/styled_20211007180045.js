import React from 'react'
import { styled } from '../../stitches.config'
import { Flex } from '../../primitives/Flex'

const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    margin: '$1',
    padding: '$1',
    gap: '$1',
    border: '1px solid $accent',
    borderRadius: '$2',
    overflow: 'hidden',
    zIndex: 5,
};

const wrapperStyles = {
    backgroundColor: '$loContrast',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    margin: '$1',
    padding: '$1', 
    gap: '$1',
    border: '1px solid $accent',
    borderRadius: '$2',
    overflow: 'hidden',
    zIndex: 4,
};

const SmallInnerContainer = styled(Flex, {
    ...containerStyles,
    height: '600px',
    width: '1100px',
});

const LargeInnerContainer = styled(Flex, {
    ...containerStyles,
    height: '600px',
    width: '1400px'
});

const SmallInnerWrapper = styled(Flex, {
    ...wrapperStyles,
    height: '600px',
    width: '1080px',
});

const LargeInnerWrapper = styled(Flex, {
    ...wrapperStyles,
    height: '600px',
    width: '1400px'
})

export const LargeInnerContainer = ({ children }) => (
    <LargeContainer> 
        <LargeInnerWrapper>
            {children}
        </LargeInnerWrapper> 
    </LargeContainer>
);

export const SmallContainer = ({ children }) => (
    <SmallContainer>
        <SmallWrapper>
            {children}
        </SmallWrapper>
    </SmallContainer>
); 


// type MergeElementProps<
//     T extends React.ElementType, 
//     P extends object = {}
// > = Omit<React.ComponentPropsWithRef<T>, keyof P> & P;


// interface ContainerBaseProps {
//     id?: string; 
// };

// interface SmallContainerProps extends ContainerBaseProps {
//     variant: 'small'; 
//     bgColor: 'transparent'
// }

// interface LargeContainerProps extends ContainerBaseProps {
//     variant: 'large';
//     bgColor: 'transparent';
// }

// type ContainerProps = MergeElementProps<"div", SmallContainerProps | LargeContainerProps>;

// function ContainerBase = (
//     { id, variant, ...rest }: ContainerProps,
//     ref: React.Ref<HTMLDivElement>,
// ) {
//     if(variant==='small') {

//     }   
// }


// export const MenuBar = styled(Flex, {
//     width: '99.75%', 
//     height: 35, 
//     fd: 'row', 
//     jc: 'space-between', 
//     ai: 'center', 
//     gap: '$2',
//     pl: '$2',
//     pr: '$2',
//     ml: '$1',
//     bc: '$loContrast',
//     border: '1px solid $accent',
//     br: '$2',
//     color: '$text',
//     overflowX: 'hidden',
//     overflowY: 'hidden',
//     '&:hover': {
//         borderColor: '$accentPressed'
//     }
// })

// function ContainerBase(
//     { id, variant, ...rest }: ,
//     ref: React.RefObject<HTMLDivElement>,
// ) {
//     let size = 'small';


//     if(variant === 'size') {
//         const props: ContainerSizeProps = rest as any,
//         height = props.size,
//     }; 


//     return (
//         <Flex 
//             ref={ref} 
//             id={id} 
//             {...rest} 
//             css={{ ...baselineStyles }} 
//  for    )


// type ContainerProps = {
//     id?: string; 
//     isLarge?: boolean; 
// } & React.ComponentPropsWithoutRef<"div">