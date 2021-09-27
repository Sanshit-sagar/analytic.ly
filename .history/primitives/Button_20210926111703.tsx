import { styled } from '../stitches.config';
import { blackA, violetA, greenA, crimsonA } from '@radix-ui/colors';


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
            borderColor: crimsonA.crimsonA10,
            color: crimsonA.crimsonA6,
            backgroundColor: crimsonA.crimsonA8,
            '&:hover': {
                backgroundColor: crimsonA.crimsonA10,
            }
        },
        green: {
            borderColor: greenA.greenA12,
            color: greenA.greenA1,
            backgroundColor: greenA.greenA6,
            '&:hover': {
                backgroundColor: greenA.greenA8,
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
    // {
    //     color:'green',
    //     outlined: true,
    //     css: {
    //         color:'green',
    //         border: '2px solid green',
    //         br: '$1',
    //         '&:hover': {
    //             backgroundColor: 'gainsboro',
    //             color: 'green'
    //         }
    //     }
    // },
    // {
    //   color: 'white',
    //   outlined: true,
    //   css: {
    //     color: '#012391',
    //     border: 'thin solid silver',
    //     borderRadius: '$1',
    //     '&:hover': {
    //       backgroundColor: 'gainsboro',
    //       color: '#012391',
    //     },
    //   },
    // },
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
      size: 'medium',
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