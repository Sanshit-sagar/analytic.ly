import { styled } from '../stitches.config'
import { green, mauve } from '@radix-ui/colors'

export const Fieldset = styled('fieldset', {
    all: 'unset',
    marginBottom: 15,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
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
    borderRadius: 4,
    padding: '0 10px',
    fontSize: 15,
    lineHeight: 1,
    color: violet.violet11,
    boxShadow: `0 0 0 1px ${green.green8}`,
    height: 20,
    '&:focus': { boxShadow: `0 0 0 2px ${green.green8}` },
});
