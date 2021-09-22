import { styled } from '../stitches.config';
import { blackA } from '@radix-ui/colors';

const StyledButton = styled('button', {
  fontSize: '15px',
  display: 'flex',
  flexDirection: 'row', 
  justifyContent: 'space-between', 
  alignItems: 'center',
  padding: '0px 2.5px 2px 2.5px',
  borderRadius: '3.5px',
  border: '1px solid',

  variants: {
    size: {
      xsmall: {
        padding: 0, 
        margin: 0, 
        fontSize: 5, 
        lineHeight: '0.8em',
        border: '0px solid transparent',
        height: '12.5px',
        width: '12.5px',
      },
      small: {
        padding: '$1',
        margin: '$1',
        fontSize: 8,
        lineHeight: 1,
      },
      med: {
        padding: '$1 $2',
      }
    },
    color: {
      violet: {
        borderColor: blackA.blackA12,
        color: blackA.blackA12,
        '&:hover': {
          borderColor: 'transparent',
          color: 'transparent',
        },
      },
      accent: {
          border: 'thin solid $border',
          bc: 'transparent',
          '&:hover': {
              borderColor: '$border3'
          },
      },
      gray: {
        backgroundColor: blackA.blackA2,
        '&:hover': {
          backgroundColor: blackA.blackA8,
        },
      },
      black: {
        backgroundColor: blackA.blackA12,
        '&:hover': {
          backgroundColor: blackA.blackA12,
        },
      },
      white: {
        backgroundColor: '#fff',
        color: '#000',
        '&:hover': {
          backgroundColor: 'gainsboro',
        },
      },
    },
    outlined: {
      true: {
        borderColor: blackA.blackA12,
      },
      false: {
        borderColor: 'transparent',
      }
    },
  },

  compoundVariants: [
    {
      color: 'violet',
      outlined: true,
      css: {
        color: 'blueviolet',
        borderColor: 'darkviolet',
        '&:hover': {
          color: 'white',
        },
      },
    },
    {
        color: 'accent',
        outlined: true,
        css: {
            borderColor: '$border',
            '&:hover': {
                borderColor: '$border3'
            }
        }
    }, 
    {
      color: 'gray',
      outlined: true,
      css: {
        color: blackA.blackA12,
        backgroundColor: 'white',
        border: `1px solid ${blackA.blackA12}`,
        '&:hover': {
          color: blackA.blackA12,
          backgroundColor: 'gainsboro',
          border: `1px solid ${blackA.blackA12}`,
        },
      },
    },
    {
      color: 'white',
      outlined: true,
      css: {
        color: '#012391',
        border: 'thin solid silver',
        borderRadius: '3.5px',
        '&:hover': {
          backgroundColor: 'gainsboro',
          color: '#012391',
        },
      },
    },
    {
      color: 'black',
      outlined: true,
      css: {
        color: 'gainsboro',
        backgroundColor: blackA.blackA11,
        border: `1px solid ${blackA.blackA1}`,
        '&:hover': {
          color: 'white',
          backgroundColor: blackA.blackA12,
          border: `1px solid ${blackA.blackA1}`,
        },
      },
    },
    {
      size: 'xsmall',
      outlined: false,
      css: {
        color: 'gainsboro',
        backgroundColor: blackA.blackA11,
        '&:hover': {
          color: 'white',
          backgroundColor: blackA.blackA12,
        },
      },
    },
    {
      size: 'small',
      outlined: false,
      css: {
        color: blackA.blackA12,
        border: 'thin solid silver',
        backgroundColor: 'transparent',
      },
    },
    {
      size: 'med',
      outlined: true,
      css: {
        color: 'gainsboro',
        backgroundColor: blackA.blackA11,
        border: `1px solid ${blackA.blackA1}`,
        '&:hover': {
          color: 'white',
          backgroundColor: blackA.blackA12,
          border: `1px solid ${blackA.blackA1}`,
        },
      },
    },
  ],

  defaultVariants: {
    color: 'gray', 
    outlined: true,
  }
});

export const Button = StyledButton;