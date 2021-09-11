import { styled } from '../stitches.config'
import { Text } from './Text'

export const FieldSet = styled('fieldset', {
    all: 'unset',
    width: '50px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
});

export const FieldSetGroup = styled('fieldset', {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    jc: 'flex-start', 
    ai: 'flex-start', 
    flexWrap: 'wrap',
    gap: '$1', 
    pt: '$2',
    border: 'thin solid transparent'
});

export const FieldSetInputGroup = styled('div', {
    width: '95%', 
    display: 'inline-flex',
    jc: 'space-between', 
    ai: 'stretch', 
    gap: '$1',  
    mt: '$2',
    border: '$1 solid', 
    borderColor: '$border',  
    backgroundColor: '$lightPanel', 
    color: '$text', 
    '&:hover': { 
        borderColor: 'red', 
    } 
});

export const FieldSetGroupHeading = styled('fieldset', {
    display: 'inline-flex',
    color: '$text',
    fontSize: 14,
    fontWeight: 'bold',
    mb: '$2', 
    textDecoration: 'underline', 
    textDecorationColor: '$funky',
    border: 'none',
});

export const FilterFieldset = styled('fieldset', {
    all: 'unset',
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
});

export const ControlGroup = styled('fieldset', {
    all: 'unset',
    minWidth: '50px',
    maxWidth: '450px',
    overflowY: 'hidden',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    gap: '$1',
    margin: '%1', 
    padding: '$1',
    br: '$1',
    border: 'thin solid $border'
})

export const CentralControlGroup = styled('fieldset', {
    mt: '10%',
    alignSelf: 'center',
    minWidth: '600px',
    maxWidth: '800px',
    overflowY: 'hidden',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    gap: '$1',
    padding: '$1 $2',
    br: '$2',
    border: 'thin solid $border'
});

export const Label = ({children}: {children:React.ReactNode}) => (
    <Text css={{ color: '$text', textTransform: 'uppercase' }}>{children}</Text> 
);
  
export const Input = styled('input', {
    all: 'unset',
    width: '50px',
    height: '20px',
    mb: '$1',
    flex: '1 0 auto',
    borderRadius: '$1',
    color: '$accentFull',
    bc: '$accentDulled',
    border: 'thin solid',
    br: 0,
    borderColor: '$accent',
    fontSize: 14,
    placeholder: '$loContrast'
});
  