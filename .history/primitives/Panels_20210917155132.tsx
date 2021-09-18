import { styled } from '../stitches.config'
import { Text } from './Text'
import { Separator } from './Separator'

export const MainMenuPanel = styled('div', {
    height: '100%', 
    width: '1000px', 
    fd: 'column', 
    jc: 'flex-start', 
    ai: 'stretch', 
    padding: '$1'
});

export const MainMenuHeader = styled('div', {
    width: '100%', 
    maxWidth: 600, 
    margin: '0 15px'
});

export const MainMenuDescription = styled(Text, {
    fontSize:15, 
    color: '$text', 
    mt: '$1', 
    mb: '$2', 
    lineHeight: '20px', 
    textTransform: 'lowercase',
    fontWeight: 250
});

