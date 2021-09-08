
const hashAB = (a: string, b: string) => `item-${a}-value-${b || ''}`
const hashI = (i: number) => `item-index-${i}`
const generateKeyFromValue = (controlGroupName: string, a: string, b?: string) => `${controlG
const generateKeyFromIndex = (controlGroupName: string, i: number) => `${controlGroupName}-${

const hash = (controlGroupName: string, a?: string, b?: string, i?: number): string => {
     let cgn = controlGroupName || `Group-${Math.random()}`
     return a && b ? generateKeyFromValue(cgn, a, b) : i ? generateKeyFromIndex(cgn, i) : `${
};
const isSelected = (i: number, sel: number): boolean => i===sel
const SelectionIndicator = ({i, sel}:{i:number; sel: number}) => isSelected(i,sel) ? <SelectI

const SeperatorSelector = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [separatorIndex, setSeparatorIndex] = useAtom(separatorIndexAtom)
    const separator = useAtomValue(separatorAtom)
    const separatorText = useAtomValue(separatorTextAtom)
    
    const controlGroupLabel = SEPARATOR_LABEL
    const controlGroupName = SEPARATOR_NAME
  
    const evaluate = (value: string | number): string => typeof value==='number' ? `${value}`
    const handleSelection = (selectedIndex: number): void => setSeparatorIndex(selectedIndex)
    const formatContent = ({ textValue, icon }:{ textValue: string; icon: any }) => <> {icon 

    return (
        <ControlGroup>
            <CustomLabel value={controlGroupLabel} />
            <SelectRoot
                open={isOpen}
                onOpenChange={() => setIsOpen(!isOpen)}
            >
                <SelectTrigger>
                    <Text css={{ width: '100%', display: 'flex', fd: 'row', jc: 'space-betwee
                        <> {separator} {separatorText} </> 
                        <ChevronDownIcon />  
                    </Text>
                </SelectTrigger>
                <SelectContent>
                    <SelectRadioGroup>
                        {separators.map((separator: ISeparator, index: number) => {
                            const { textValue, value, icon } = separator

                            return (
                                <SelectRadioItem
                                    key={hash(controlGroupName, textValue, value)}
                                    value={evaluate(value)}
                                    textValue={textValue}
                                    onSelect={() => handleSelection(index)}
                                >
                                    <SelectionIndicator 
                                        i={index} 
                                        sel={separatorIndex} 
                                    />
                                    <SelectableText> 
                                        {formatContent({ textValue, icon })} 
                                    </SelectableText>
                                </SelectRadioItem>
                            )
                        })}
                    </SelectRadioGroup>
                </SelectContent>
            </SelectRoot>
        </ControlGroup>
    )
}
