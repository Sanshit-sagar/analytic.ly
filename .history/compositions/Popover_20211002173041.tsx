import * as React from 'react'
import { styled } from '../stitches.config'

import { useOverlay, DismissButton } from '@react-aria/overlays'
import { FocusScope } from '@react-aria/focus'


interface PopoverProps {
    popoverRef?: React.RefObject<HTMLDivElement>;
    children: React.ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
}

const Wrapper = styled('div', {
    position: 'absolute',
    left: 0,
    top: '100%',
    height: 'auto',
    minHeight: '50px',
    maxHeight: '300px',
    pt: '$1',
    width: '200px',
    zIndex: 5,
    mt: '1px',
    ml: -7,
    bc: 'transparent',
    border: 'none',  
    variants: {
        size: {
            '1': {
                height: '75px',
            },
            '2': {
                height: '400px',
            },
        },
    },

    defaultVariants: {
        size: '2',
    },
});

export function Popover(props: PopoverProps) {
    let ref = React.useRef<HTMLDivElement>(null)

    let { 
        popoverRef = ref, 
        isOpen, 
        onClose, 
        children 
    } = props

    let { overlayProps } = useOverlay({
        isOpen,
        onClose,
        shouldCloseOnBlur: true,
        isDismissable: false
    }, ref)

    return (
        <FocusScope restoreFocus>
            <Wrapper 
                {...overlayProps} 
                ref={popoverRef}
            >
                {children}
                <DismissButton onDismiss={onClose} />
            </Wrapper>
        </FocusScope>
    );
}
