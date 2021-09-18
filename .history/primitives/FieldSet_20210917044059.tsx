import { styled } from '../stitches.config'
import { Text } from './Text'

export const FieldSet = styled('fieldset', {
    all: 'unset',
    width: '50px',
    height: '100%',
    display: 'flex',
    fd: 'column',
    jc: 'space-between',
    ai: 'stretch',
    gap: '$1'
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
    width: '175px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    gap: '$1',
    padding: '$1',
    br: '$1',
    border: 'thin solid $border'
})

export const LargeControlGroup = styled('fieldset', {
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
    border: 'thin solid $border',
    br: '$1',
    '&:hover': {
        borderColor: '$border3',
        color: '$accentContrast',
    }
})

export const CentralControlGroup = styled(LargeControlGroup, {
    border: 'thin solid $border',
    br: '$2'
});

export const BorderlessControlGroup = styled(LargeControlGroup, {
    backgroundColor: '$neutral',
    border: '2px solid $border',
    br: '$2',
    padding: '$2 $4',
    margin: '$2',
    '&:hover': {
        borderColor: '$border3'
    }
}); 

export const Label = ({children}: {children:React.ReactNode}) => (
    <Text css={{ color: '$text', textTransform: 'uppercase' }}>
        {children}
    </Text> 
);

const InputBase = styled('input', {
    mb: '$1',
    flex: '1 0 auto',
    color: '$text',
    bc: '$canvas',
    br: '$1',
    border: 'thin solid $border',
    placeholder: '$accentDulled',
    padding: '$2',
    outline: 'none',
    '&:hover': {
        borderColor: '$border3'
    },
});
  
export const Input = styled(InputBase, {
    width: '95px',
    height: '20px',
});

export const MediumInput = styled(InputBase, {
    width: '125px',
    height: '20px'
}); 

export const LargeInput = styled(InputBase, {
    height: '25px',
    width: '125px'
});
  