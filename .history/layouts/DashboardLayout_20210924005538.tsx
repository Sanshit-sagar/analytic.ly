import { styled } from '../stitches.config'

import { AppContainer } from '../primitives/Shared'
import { ScrollArea } from '../primitives/ScrollArea'

import PieChart from '../components/Pie'
import Plafond from '../components/Plafond'
import GroupedBars from '../components/Bars'
import Statistics from '../components/Statistics'


export interface IDashboardProps {
    children: any; 
}

export const MainComponent = styled('div', {
    bc: 'transparent', 
    height: '600px', 
    width: '1100px', 
    maxHeight: '600px', 
    maxWidth: '1100px', 
    ml: '$2',
    mt: '$2',
    mb: '$1',
    mr: '$1'
});

export const DashboardLayoutRow = styled('div', {
    height: '100%', 
    width: '100%', 
    display: 'flex', 
    fd: 'row', 
    jc: 'flex-start', 
    ai: 'flex-start'
});

export const DashboardLayoutGraphRow = styled('div', {
    height: '475px',
    width: '100%',
    display: 'flex',
    fd: 'row',
    jc: 'space-between', 
    ai: 'flex-start',
    gap: '$2'
});

const meta = {
    title: 'Prism with Next.js',
    description:
      'Example using Prism / Markdown with Next.js including switching syntax highlighting themes.',
    cardImage:
      'https://og-image.now.sh/**Prism**%20with%20Next.js.png?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-white-logo.svg',
    ...pageMeta
};


const DashboardLayout = ({ children }: IDashboardProps) => {

    return (
        <AppContainer className='container'>
            <Plafond /> 

            <ScrollArea>
                <DashboardLayoutRow>
                    <MainComponent>
                        {children}
                    </MainComponent>
                    <Statistics />
                </DashboardLayoutRow>

                <DashboardLayoutRow>
                    <PieChart />
                    <GroupedBars />
                </DashboardLayoutRow>

            </ScrollArea>
        </AppContainer>
    )
}

export default DashboardLayout