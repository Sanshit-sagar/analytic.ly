import { styled, keyframes } from '../stitches.config';

const pulse = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: '100%' },
});

export const Skeleton = styled('div', {
  backgroundColor: '$loContrast',
  position: 'relative',
  border: '0.5px solid $accentDulled',
  br: '$2',
  '&:hover': {
      borderColor: '$border3',
      backgroundColor: '$darkPanel'
  },

  '&::after': {
    animationName: `${pulse}`,
    animationDuration: '800ms',
    animationDirection: 'alternate',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
    backgroundColor: '$loContrast',
    borderRadius: '$1',
    bottom: 0,
    content: '""',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },

  variants: {
    variant: {
      container1: {
        br: '$1',
        height: '100px',
        width: '100px',
      },
      container2: {
        br: '$1',
        height: '200px',
        width: '200px',
      },
      container3: {
        br: '$1',
        height: '300px',
        width: '300px',
      },
      container4: {
        br: '$1',
        height: '400px',
        width: '400px',
      },
      container5: {
        br: '$1',
        height: '500px',
        width: '500px',
      },
      container6: {
        br: '$1',
        height: '600px',
        width: '600px',
      },
      container7: {
        br: '$1',
        height: '700px',
        width: '700px',
      },
      sidebar: {
        br: '$1',
        height: '550px',
        width: '300px',
        mt: '$2',
        bc: 'transparent',
        border: '1px solid $darkPanel'
      },
      statistic: {
        br: '$1',
        height: '75px',
        width: '95%',
        margin: '$1',
      },
      table: {
        width: '100%',
        height: '100%',
        fd: 'column', 
        jc: 'flex-start', 
        ai: 'stretch', 
        gap: '$1', 
        border: 'thin solid $border', 
        br: '$2'
      },
      tableHeader: {
        width: '1300px',
        height: '40px',
      },
      cellXlong: {
        height: '40px',
        width: '200px',
      },
      cellLong: {
        height: '40px',
        width: '150px',
      },
      cellXShort: {
        height: '40px',
        width: '50px',
      },
      cellShort: {
        height: '40px',
        width: '75px',
      },
      cell: {
        height: '40px',
        width: '100px',
      },
      cellEntry: {
        height: '85%',
        width: '95%',
      },
      panel1: {
        height: '200px',
        width: '300px',
      },
      avatar1: {
        borderRadius: '$2',
        height: '300px',
        width: '300px',
      },
      avatar2: {
        borderRadius: '$2',
        height: '500px',
        width: '500px',
      },
      avatar3: {
        borderRadius: '$2',
        height: '600px',
        width: '600px',
      },
      avatar4: {
        borderRadius: '$2',
        height: '700px',
        width: '700px',
      },
      avatar5: {
        borderRadius: '$2',
        height: '800px',
        width: '800px',
      },
      avatar6: {
        borderRadius: '$2',
        height: '900px',
        width: '900px',
      },
      heading: {
        height: '20px',
        width: '75px',
        borderColor: '$canvas'
      },
      title: {
        height: '10px',
        width: '100px',
        borderColor: '$canvas'
      },
      subtitle: {
        height: '15px',
        width: '100px',
        borderColor: '$canvas'
      },
      text: {
        height: '7.5px',
        width: '150px',
        borderColor: '$canvas'
      },
      animatedNumerical: {
        height: '25px',
        width: '25px',
        borderColor: '$canvas'
      },
      button: {
        borderRadius: '$2',
        height: '50px',
        width: '100px',
      },
    },
  },
  defaultVariants: {
    variant: 'avatar6',
  },
});