import { styled } from '../stitches.config'
import { green } from '@radix-ui/colors'


export const FieldSet = styled('fieldset', {
    all: 'unset',
    width: '50px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
});

export const FilterFieldset = styled('fieldset', {
    all: 'unset',
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
});
  
export const Label = styled('label', {
    display: 'block',
    fontSize: 12,
    color: '$hiContrast',
    fontWeight: 200,
    fontStyle: 'regular',
    lineHeight: 1
    mb: '$1',
});
  
export const Input = styled('input', {
    all: 'unset',
    flex: '1 0 auto',
    borderRadius: '$1',
    padding: '0 $1',
    color: '$accent',
    bc: 'transparent',
    border: 'thin solid',
    br: '$1',
    borderColor: '$accent',
    '&:focus': { 
        boxShadow: `0 0 0 2px ${green.green8}` 
    },
    fontSize: 12,
    placeholder: '$loContrast'
});
  