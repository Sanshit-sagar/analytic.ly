import { styled } from '../stitches.config'
import { green } from '@radix-ui/colors'


export const Fieldset = styled('fieldset', {
    all: 'unset',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  });
  
export const Label = styled('label', {
    fontSize: 10,
    lineHeight: 1,
    color: violet.violet12,
    display: 'block',
  });
  
export const Input = styled('input', {
    all: 'unset',
    flex: '1 0 auto',
    borderRadius: '$1',
    padding: '0 $1',
    color: green.green11,
    height: 20,
    '&:focus': { 
        boxShadow: `0 0 0 2px ${green.green8}` },
});
  