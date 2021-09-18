import { styled } from '../stitches.config'

import { Text } from './Text'
import { Heading } from './Heading'
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
    margin: '0 10px'
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

export const MainMenuContent = styled('div', {
    width: '100%', 
    height: '100%',
    display: 'flex', 
    fd: 'column', 
    jc: 'center', 
    ai: 'center', 
    gap: '$1', 
    pt: '$2', 
    pb: '$2', 
    pl: '$1',
    pr: '$1' 
})

export const MainMenuDivider = () => <Separator size='2' css={{ ml: '10px' }} />
export const MainMenuHeading = ({ children }: { children: React.ReactNode }) => <Heading size='2'> {children} </Heading>