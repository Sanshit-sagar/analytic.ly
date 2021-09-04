import { styled } from '../stitches.config'
import Separator from './Separator'

const AppBarLeftGroup = styled('span', {
    display: 'inline-flex',
    jc: 'flex-start', 
    ai: 'center',
    ml: '$1', 
    mr: '$2',
});

const AppBarRightGroup = styled('span', {
    display: 'inline-flex',
    jc: 'flex-end', 
    ai: 'center',
    ml: '$2', 
    mr: '$1',
});

const VerticalSeparator = () => {
    return (
        <
    )
}

const AppBarSeparator = styled(Separator, {

})

const AppBar = styled('div', {
    boxSizing: 'border-box',
    mr: '$4',
    ml: '$4',
    zIndex: '1',
    display: 'flex', 
    fd: 'row', 
    jc: 'space-between',
    ai: 'center',
    padding: '$1 $2',
    backgroundColor: '$hiContrast',
    border: 'thin solid',
    borderColor: '$funky',
    borderRadius: '5px',
    borderTop: 'none',

    boxShadow: '0 0 transparent, 0 16px 32px $$loContrast, 0 3px 5px $$loContrast',
    '&:hover': {
        boxShadow: '0 0 transparent, 0 16px 32px $$loContrast, 0 3px 5px $$loContrast',
    },
    '&:focus': {
        boxShadow: '0 0 0 1px $colors$slate8, 0 16px 32px $$loContrast, 0 3px 5px hsl(0deg 0% 0% / 10%)',
    },
    variants: {
        size: {
          1: {
            py: '$1',
          },
          2: {
            py: '$2',
          },
          3: {
            py: '$3',
          },
        },
        sticky: {
          true: {
            position: 'sticky',
            width: '100%',
            top: 0,
            left: 0,
          },
        },
        glass: {
          true: {
            backdropFilter: 'blur(12px) saturate(160%)',
          },
        },
        border: {
          true: {
            borderBottom: '1px solid',
            borderBottomColor: '$loContrast',
            borderBottomRadius: '$5',
          },
        },
        color: {
            plain: {
                backgroundColor: 'white',
            },
          loContrast: {
            backgroundColor: '$loContrast',
          },
          hiContrast: {
            backgroundColor: '$hiContrast',
          },
          accent: {
            backgroundColor: '$accent',
          },
        },
  },
  compoundVariants: [
    {
           glass: 'true',
           color: 'plain',
           css: {
             opacity: '.9',
           },
        }, {
           glass: 'true',
           color: 'accent',
           css: {
             opacity: '.9',
           },
         },
         {
           glass: 'true',
           color: 'loContrast',
           css: {
             opacity: '.9',
           },
         },
         {
           border: 'true',
           color: 'plain',
           css: {
             borderColor: '$slate6',
           },
         },
         {
           border: 'true',
           color: 'accent',
           css: {
             borderColor: '$blue11',
           },
         },
        {
           border: 'true',
           color: 'accent',
           css: {
             borderColor: '$slate6',
           },
        }
    ],
    defaultVariants: {
        size: '1',
        border: 'true',
        glass: 'true',
    }
});

export const Navigator = AppBar
export const NavigatorGroupLeft = AppBarLeftGroup 
export const NavigatorGroupRight = AppBarRightGroup