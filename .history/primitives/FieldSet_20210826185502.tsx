import { styled } from '../stitches.config'
import { green } from '@radix-ui/colors'


export const FieldSet = styled('fieldset', {
    all: 'unset',
    width: '50px',
});
  
export const Label = styled('label', {
    display: 'block',
    mb: '$1'
});
  
export const Input = styled('input', {
    all: 'unset',
    flex: '1 0 auto',
    borderRadius: '$1',
    padding: '0 $1',
    color: green.green11,
    bc: 'transparent',
    border: 'thin solid',
    br: '$1',
    borderColor: green.green8,
    '&:focus': { 
        boxShadow: `0 0 0 2px ${green.green8}` 
    },
});
  