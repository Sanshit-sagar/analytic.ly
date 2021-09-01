import { ReactNode } from 'react'
import { styled } from '@stitches/react'
import {  mauve, blackA } from '@radix-ui/colors'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'

const SCROLLBAR_SIZE = 10;

const StyledScrollArea = styled(ScrollAreaPrimitive.Root, {
  borderRadius: 4,
  overflow: 'hidden',
});

const StyledViewport = styled(ScrollAreaPrimitive.Viewport, {
  width: '100%',
  height: '100%',
  borderRadius: 'inherit',
});

const StyledScrollbar = styled(ScrollAreaPrimitive.Scrollbar, {
  display: 'flex',
  userSelect: 'none',
  touchAction: 'none',
  background: '$bronze100',
  transition: 'background 160ms ease-out',
  '&:hover': { background: blackA.blackA8 },
  '&[data-orientation="vertical"]': { width: SCROLLBAR_SIZE },
  '&[data-orientation="horizontal"]': {
    flexDirection: 'column',
    height: SCROLLBAR_SIZE,
  },
});

const StyledThumb = styled(ScrollAreaPrimitive.Thumb, {
  flex: 1,
  background: '$accent',
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

const Box = styled('div', {});

export const ScrollView = ({ content }: { content: any }) => {
  
  return (
    <Box css={{ borderRadius: '5px', backgroundColor: 'transparent' }}>
      <ScrollArea style={{ width: '440px', height: '400px' }}>
        <ScrollAreaViewport css={{ backgroundColor: 'transparent' }}>
          <Box css={{ backgroundColor: 'transparent', width: '97.5%', mt: '$1', mb: '$2', py: '$2', px: '$1' }}>
            {content}
          </Box>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar orientation="vertical">
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
        <ScrollAreaScrollbar orientation="horizontal">
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
        <ScrollAreaCorner />
      </ScrollArea>
    </Box>
  );
}

export const TableScrollView = ({ content }: { content: any }) => {
  
  return (
    <Box css={{ borderRadius: '5px' }}>
      <ScrollArea style={{ width: '100%', height: '550px' }}>

        <ScrollAreaViewport>
          <Box css={{ width: '100%' }}>
            {content}
          </Box>
        </ScrollAreaViewport>

        <ScrollAreaScrollbar orientation="vertical">
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>

        <ScrollAreaScrollbar orientation="horizontal">
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>

        <ScrollAreaCorner />
      </ScrollArea>
    </Box>
  );
}

