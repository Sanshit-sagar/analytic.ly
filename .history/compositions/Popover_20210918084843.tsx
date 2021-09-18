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
    left: '-3.5%',
    top: '100%',
    width: '107.5%',
    zIndex: 1,
    border: 'none',
    mt: '1px',
    backgroundColor: 'transparent'
});

export function Popover(props: PopoverProps) {
    let ref = React.useRef<HTMLDivElement>(null);
    let { 
        popoverRef = ref, 
        isOpen, 
        onClose, 
        children 
    } = props;

    let { overlayProps } = useOverlay({
        isOpen,
        onClose,
        shouldCloseOnBlur: true,
        isDismissable: false
    }, popoverRef);

  return (
    <FocusScope restoreFocus>
      <Wrapper {...overlayProps} ref={popoverRef}>
        {children}
        <DismissButton onDismiss={onClose} />
      </Wrapper>
    </FocusScope>
  );
}
