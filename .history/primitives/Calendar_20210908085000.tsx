import { styled } from '../stitches.config'

const StyledCalendarContainer = styled(Box, {
    width: '350px',
    display: 'flex', 
    fd: 'column',
    jc: 'flex-end',
    ai: 'center',
    gap: '$1',
    margin: 0,
    mt: '$5',
    padding: '$1',
    bc: 'transparent',
    border: '2px solid $border', 
    br: '$2',
    '&:hover': {
        border: '2px solid border3', 
        br: '$2'
    }
});


const StyledCell = styled('div', {
    position: 'relative',
    height: '30px',
    width: '30px',
    display: 'flex', 
    fd: 'column',
    jc: 'flex-start',
    ai: 'flex-end',
    gap: '$1',
    bc: 'transparent',
    border: '1px solid $border',
    br: '$1',
    padding: '$1',
    margin: 0,
    '&:hover': {
        backgroundColor: '$accent',
        borderColor: '$border3'
    }
});

const StyledDate = styled(Text, {
    color: '$text',
    size: '$2',
    margin: '$1'
});


const YearSelector = ({ onChange }) => {
    const [year, setYear] = useAtom(yearAtom)
    const month = useAtomValue(monthAtom)

    const yearItems = []
    for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
        yearItems.push({ 
            value:`${i}`, 
            textValue:`${i}`, 
            icon: undefined 
        });
    }

    const handleYearChange = (updatedMonth, updatedYear) => {
        setYear(updatedYear);
        onChange(new Date(updatedYear, month));
    }

    return (
        <SelectMenu
            selectOnly={true}
            items={yearItems}
            selectedIndex={year}
            setSelectedIndex={(value) => handleYearChange(month, value + 2021)}
            selectedValue={year}
            selectedTextValue={`${year}`}
            group={'Years'}
        />
    );
}

function YearMonthForm({ date, localeUtils, onChange }) {
    

    return (
        <form className="DayPicker-Caption">
            <Flex css={{ fd: 'row', jc: 'flex-start', ai: 'stretch', gap: '$2', mb: '$3' }}>
                <MonthSelector
                    onChange={onChange} 
                    localeUtils={localeUtils} 
                />
                <YearSelector onChange={onChange} />
            </Flex>
        </form>
    );
}