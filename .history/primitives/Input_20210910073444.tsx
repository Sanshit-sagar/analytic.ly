import { styled } from '../stitches.config'
import { green } from '@radix-ui/colors'

export const Fieldset = styled('fieldset', {
    all: 'unset',
    marginBottom: 15,
    width: '25px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    border: 'thin solid',
    borderColor: 'green',
    br: '$2'
});
  
export const Label = styled('label', {
    fontSize: 13,
    lineHeight: 1,
    marginBottom: 10,
    color: green.green12,
    display: 'block',
});
  
export const Input = styled('input', {
    all: 'unset',
    flex: '1 0 auto',
    borderRadius: '$1',
    padding: '0 10px',
    color: 'accent',
    height: '100%',
    width: '100%',
    backgroundColor: '$accentDulled',
    '&:focus': { 
        boxShadow: `0 0 0 2px $accent`
    },
});
