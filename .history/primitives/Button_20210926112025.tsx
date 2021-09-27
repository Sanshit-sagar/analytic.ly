import { styled } from '../stitches.config';
import { blackA, violetA, green, crimsonA } from '@radix-ui/colors';


const StyledButton = styled('button', {
  display: 'flex',
  flexDirection: 'row', 
  justifyContent: 'center', 
  alignItems: 'center',
  padding: '$1 $2',

  variants: {
    size: {
        xsmall: {
            padding: '0.25px 0.5px', 
            fontSize: 5, 
            lineHeight: '0.8em',
        },
        small: {
            padding: '$1',
            fontSize: 8,
            lineHeight: '1em',
        },
        medium: {
            padding: '$1 $2',
            fontSize: 11,
            lineHeight: '1em',
        },
        large: {
            padding: '$2 $4',
            fontSize: 14,
            lineHeight: '1.2em',
        },
        xlarge: {
            padding: '$3 $6',
            fontSize: 16,
            lineHeight: '1.5em',
        },
    },
    color: {
        red: {
            borderColor: crimson.crimsonA10,
            color: crimsonA.crimsonA6,
            backgroundColor: crimsonA.crimsonA8,
            '&:hover': {
                backgroundColor: crimsonA.crimsonA10,
            }
        },
        green: {
            borderColor: green.green10,
            color: green.green1,
            backgroundColor: green.green6,
            '&:hover': {
                backgroundColor: green.green8,
            }
        },
        violet: {
            borderColor: violetA.violetA12,
            color: violetA.violetA1,
            backgroundColor: violetA.violetA8,
            '&:hover': {
                backgroundColor: violetA.violetA10,
            }
        },
        accent: {
                border: '2px solid $border',
                bc: '$accent',
                color: '$hiContrast',
                '&:hover': {
                    borderColor: '$border3',
                    color: '$hiContrast',
                    bc: '$accentHover'
                },
                '&:focus': {
                    borderColor: '$funkyText',
                    bc: '$accentPressed'
                }
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
        transparent: {
            border: '1px solid $border',
            backgroundColor: 'transparent',
            color: '$accent',
            '&:hover': {
                borderColor: '$border3',
                backgroundColor: 'transparent',
                color: '$accentHover',
            },
            '&:focus': {
                bc: 'gainsboro',
                border: '$funkyText',
                color: '$accentPressed'
            }
        },
    },
    outlined: {
        true: {
            border: '2px solid',
        },
        false: {
            border: 'none',
        }
    },
  },

  compoundVariants: [
    {
        color: 'accent',
        outlined: true,
        css: {
            borderColor: '$border',
            '&:hover': {
                borderColor: '$border3'
            },
        },
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
  ],

  defaultVariants: {
    color: 'accent', 
    outlined: true,
  }
});

export const Button = StyledButton;