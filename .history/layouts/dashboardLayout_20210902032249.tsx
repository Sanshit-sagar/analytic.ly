import { Flex } from '../primitives/Flex'
import { ScrollArea } from '../primitives/ScrollArea'
import { DashboardLayoutRow } from '../primitives/Shared'
import { Box } from '../primitives/Box'

import Header from '../components/Header'
import PieChart from '../components/Pie'
import GroupedBars from '../components/Bars'
import Statistics from '../components/Statistics'

export interface IDashboardProps {
    children: any; 
}

const DashboardLayout = ({ children }: IDashboardProps) => {

    return (
        <ScrollArea>
            <Header />

            <DashboardLayoutRow>
                <> {children} </>
                <Statistics />
            </DashboardLayoutRow>

            <DashboardLayoutRow>
                <PieChart />
                <GroupedBars />
            </DashboardLayoutRow>
        </ScrollArea>
    )
}

export default DashboardLayout