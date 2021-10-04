import { styled } from '@stitches/react'
import {  blackA } from '@radix-ui/colors'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'

const SCROLLBAR_SIZE = 7;

const StyledScrollArea = styled(ScrollAreaPrimitive.Root, {
    overflow: 'hidden',
    border: 'none',
});

const StyledViewport = styled(ScrollAreaPrimitive.Viewport, {
    width: '100%',
    height: '100%',
    border: 'none',
    backgroundColor: '$panel',
});

const StyledScrollbar = styled(ScrollAreaPrimitive.Scrollbar, {
    display: 'flex',
    userSelect: 'none',
    touchAction: 'none',
    transition: 'background 160ms ease-out',
    '&[data-orientation="vertical"]': { 
      width: SCROLLBAR_SIZE 
    },
    '&[data-orientation="horizontal"]': {
        flexDirection: 'column',
        height: SCROLLBAR_SIZE,
    },
});

const StyledThumb = styled(ScrollAreaPrimitive.Thumb, {
    flex: 1,
    background: '$border',
    borderRadius: '$2',
    position: 'relative',
    width: 10,
    height: 10,
    '&::before': {
        content: '""',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    '&:hover': {
        background: '$accent',
        border: '1px solid',
        borderColor: '$hiContrast',
    }
});

const StyledCorner = styled(ScrollAreaPrimitive.Corner, {
    background: blackA.blackA8,
});

const ScrollArea = StyledScrollArea;
const ScrollAreaViewport = StyledViewport;
const ScrollAreaScrollbar = StyledScrollbar;
const ScrollAreaThumb = StyledThumb;
const ScrollAreaCorner = StyledCorner;

export const TableScrollView = ({ content }: { content: any }) => (
    <ScrollArea style={{ width: '100%', height: '550px' }}>
        <ScrollAreaViewport>
            {content}
        </ScrollAreaViewport>

        <ScrollAreaScrollbar orientation="vertical">
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>

        <ScrollAreaScrollbar orientation="horizontal">
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>

        <ScrollAreaCorner />
    </ScrollArea>
);

