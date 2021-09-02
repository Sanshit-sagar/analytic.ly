

import { ScrollArea } from '../primitives/ScrollArea'

import { Flex } from '../primitives/Flex'
import { DashboardLayoutRow } from '../primitives/Shared'
import { Box } from '../primitives/Box'

import Header from '../components/Header'
// import PieChart from '../components/Pie'
// import GroupedBars from '../components/Bars'
import Statistics from '../components/Statistics'

export interface IDashboardProps {
    children: any; 
}

const DashboardLayout = ({ children }: IDashboardProps) => {

    return (
        <ScrollArea>
            <Header />

            <Box css={{ height: '70%', color: '$9', display: 'flex', fd: 'row', jc: 'space-between', ai: 'flex-end' }}>
                <> {children} </>
                <Statistics />
            </Box>
        </ScrollArea>
    )
}

export default DashboardLayout


{/* <DashboardLayoutRow> */}
{/* <PieChart /> */}
{/* <GroupedBars /> */}
{/* </DashboardLayoutRow> */}