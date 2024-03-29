import { styled } from '../stitches.config';
import { blackA, violet, green, crimson, blue } from '@radix-ui/colors';

const StyledButton = styled('button', {
    display: 'flex',
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center',

    variants: {
        size: {
            xsmall: {
                padding: '$1 $2', 
                fontSize: 8, 
                lineHeight: '0.75em',
            },
            small: {
                padding: '$2 $4',
                fontSize: 12,
                lineHeight: '1em',
            },
            medium: {
                padding: '$3 $6',
                fontSize: 16,
                lineHeight: '1.5em',
            },
            large: {
                padding: '$4 $8',
                fontSize: 20,
                lineHeight: '2em',
            },
            xlarge: {
                padding: '$5 40px',
                fontSize: 24,
                lineHeight: '2.5em',
            },
        },
        color: {
            red: {
                borderColor: crimson.crimson11,
                color: crimson.crimson1,
                backgroundColor: crimson.crimson6,
                '&:hover': {
                    backgroundColor: crimson.crimson8,
                }
            },
            blue: {
                borderColor: blue.blue10,
                color: blue.blue1,
                backgroundColor: blue.blue6,
                '&:hover': {
                    backgroundColor: blue.blue8,
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
                borderColor: violet.violet10,
                color: violet.violet1,
                backgroundColor: violet.violet6,
                '&:hover': {
                    backgroundColor: violet.violet8,
                }
            },
            gray: {
                bc: blackA.blackA2,
                '&:hover': {
                    bc: blackA.blackA8,
                },
            },
            black: {
                borderColor: blackA.blackA10,
                color: blackA.blackA12,
                backgroundColor: blackA.blackA6,
                '&:hover': {
                    backgroundColor: blackA.blackA8,
                }
            },
            transparent: {
                bc: 'transparent',
                borderColor: 'darkgray',
                '&:hover': {
                    bc: 'darkgray',
                    color: 'black',
                    borderColor: 'black',
                },
                '&:focus': {
                    bc: 'gainsboro',
                    borderColor: 'black',
                    color: 'black'
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
                },
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
        radius: {
            0: {
                br: 0,
            },
            1: {
                br: '$1',
            },
            2: {
                br: '$2',
            },
            3: {
                br: '$3',
            },
            4: {
                br: '10px',
            },
            5: {
                br: '25px'
            }
        }},

        compoundVariants: [{
            color: 'accent',
            outlined: true,
            css: {
                borderColor: '$border',
                '&:hover': {
                    borderColor: '$border3'
                },
            },
        }
    ],
        defaultVariants: {
            color: 'accent', 
            outlined: true,
        }
});

export const Button = StyledButton;