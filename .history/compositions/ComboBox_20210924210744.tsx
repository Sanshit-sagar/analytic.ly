import {useOverlayTriggerState} from '@react-stately/overlays';
import {
  useOverlay,
  useOverlayTrigger,
  useOverlayPosition,
  useModal,
  OverlayProvider,
  OverlayContainer,
  DismissButton
} from '@react-aria/overlays';
import {useDialog} from '@react-aria/dialog';
import {FocusScope} from '@react-aria/focus';
import {useButton} from '@react-aria/button';
import {mergeProps} from '@react-aria/utils';

const Popover = React.forwardRef(
  ({title, children, isOpen, onClose, style, ...otherProps}, ref) => {
    // Handle interacting outside the dialog and pressing
    // the Escape key to close the modal.
    let {overlayProps} = useOverlay(
      {
        onClose,
        isOpen,
        isDismissable: true
      },
      ref
    );

    // Hide content outside the modal from screen readers.
    let {modalProps} = useModal();

    // Get props for the dialog and its title
    let {dialogProps, titleProps} = useDialog({}, ref);

    return (
      <FocusScope restoreFocus>
        <div
          {...mergeProps(overlayProps, dialogProps, otherProps, modalProps)}
          ref={ref}
          style={{
            background: 'white',
            color: 'black',
            padding: 30,
            ...style
          }}>
          <h3 {...titleProps} style={{marginTop: 0}}>
            {title}
          </h3>
          {children}
          <DismissButton onDismiss={onClose} />
        </div>
      </FocusScope>
    );
  }
);
