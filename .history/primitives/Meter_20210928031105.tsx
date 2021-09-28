import { styled } from '../stitches.config'
import { Text } from '../primitives/Text'

export const MeterContainer = styled('div', {
    position: 'relative',
    width: '600px', 
    display: 'flex', 
    padding: '2.5%',
    fd: 'column',
    jc: 'center',
    ai: 'stretch',
    gap: '$3',
    border: 'thin solid transparent'
});

export const MeterOutline = styled('div', {
    height: '30%', 
    width: '525px', 
    backgroundColor: '$', 
    br: '$2',
});

export const ColoredMeterBar = styled('div', {
    height: '100%',
    border: '1px solid white',
    br: '$2'
});

export const MeterInfoBar = styled('span', {
    width: '100%',
    display: 'flex',
    flexDirection: 'row', 
    jc: 'space-between', 
    ai: 'flex-start',
    gap: '$2',
    mb: '$3', 
    color: '$text',
});

export const MeterLabel = styled(Text, {
    color: '$funky', 
    fontSize: 32,
    fontWeight: 400,
    '&:hover': { 
        textDecoration: 'underline' 
    } 
});

export const MeterProgress = styled(Text, {
    color: 'inherit'
});