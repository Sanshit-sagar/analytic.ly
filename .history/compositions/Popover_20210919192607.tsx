import * as React from 'react'
import { styled } from '../stitches.config'

import { useOverlay, DismissButton } from '@react-aria/overlays'
import { FocusScope } from '@react-aria/focus'
import { ScrollArea} from '../primitives/ScrollArea'

interface PopoverProps {
    popoverRef?: React.RefObject<HTMLDivElement>;
    children: React.ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
}

const Wrapper = styled('div', {
    position: 'absolute',
    maxHeight: '300px',
    overflow: 'hidden',
    left: 0,
    top: '100%',
    width: '100%',
    zIndex: 5,
    mt: '1px',
    bc: '$accent',
    border: '4px solid $accent',
    borderTop: 'none',
    br: '$2'
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
    }, popoverRef)

    return (
        <FocusScope restoreFocus>
            <Wrapper 
                {...overlayProps} 
                ref={popoverRef}
            >
                <ScrollArea>
                    {children}
                    <DismissButton onDismiss={onClose} />
                </ScrollArea>
            </Wrapper>
        </FocusScope>
    );
}
