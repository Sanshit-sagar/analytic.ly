import { styled } from '../stitches.config'

const AppBarLeftGroup = styled('span', {
    display: 'inline-flex',
    jc: 'flex-start', ai: ''
})

const AppBar = styled('div', {
  boxSizing: 'border-box',
  zIndex: '1',
  display: 'flex', 
  fd: 'row', 
  jc: 'space-between',
  ai: 'center',
  padding: '$1 $2',
  mb: '$1',

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
        borderBottomColor: '$hiContrast',
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