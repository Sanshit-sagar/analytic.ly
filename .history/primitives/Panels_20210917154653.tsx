import { styled } from '../stitches.config'
import { Flex } from './Flex'

const MainMenuPanel = styled('div', {
    height: '100%', 
    width: '1000px', 
    fd: 'column', 
    jc: 'flex-start', 
    ai: 'stretch', 
    padding: '$1'
});

const MainMenuTabsContainer = styled('div', {
    width: '100%', 
    maxWidth: 600, 
    margin: '0 15px'
});

const MainMenuPanelDescription = styled(Heading, {

})