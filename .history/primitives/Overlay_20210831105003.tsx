import { styled, CSS } from '../stitches.config';

export const overlayStyles: CSS = {
  backgroundColor: 'rgba(0, 0, 0, .15)',
};

export const Overlay = styled('div', overlayStyles);

export const panelStyles: CSS = {
    backgroundColor: '$panel',
    borderRadius: '$3',
    boxShadow: '$colors$shadowLight 0px 10px 38px -10px, $colors$shadowDark 0px 10px 20px -15px',
};
  
export const Panel = styled('div', panelStyles);
