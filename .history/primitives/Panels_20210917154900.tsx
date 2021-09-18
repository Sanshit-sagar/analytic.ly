import { styled } from '../stitches.config'
import { Text } from './Text'

export const MainMenuPanel = styled('div', {
    height: '100%', 
    width: '1000px', 
    fd: 'column', 
    jc: 'flex-start', 
    ai: 'stretch', 
    padding: '$1'
});

export const MainMenuTabsContainer = styled('div', {
    width: '100%', 
    maxWidth: 600, 
    margin: '0 15px'
});

export const MainMenuPanelDescription = styled(Text, {
    fontSize:15, 
    color: '$text', 
    mt: '$1', 
    mb: '$2', 
    lineHeight: '20px', 
    textTransform: 'lowercase',
    fontWeight: 250
});