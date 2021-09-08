import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectRadioGroup,
    SelectRadioItem,
    SelectIndicator, 
    SelectArrow,
    SelectableText
} from '../../primitives/Select' 







const SelectMenu = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [separatorIndex, setSeparatorIndex] = useAtom(separatorIndexAtom)
    const separator = useAtomValue(separatorAtom)
    const separatorText = useAtomValue(separatorTextAtom)
    
    const controlGroupLabel = SEPARATOR_LABEL
    const controlGroupName = SEPARATOR_NAME
  
      const evaluate = (value: string | number): string => typeof value==='number' ? `${value}` : value
      const handleSelection = (selectedIndex: number): void => setSeparatorIndex(selectedIndex)
      const formatContent = ({ textValue, icon }:{ textValue: string; icon: any }) => <> {icon || textValue} </>

      return (
          <ControlGroup>
              <CustomLabel value={controlGroupLabel} />
              <SelectRoot
                  open={isOpen}
                  onOpenChange={() => setIsOpen(!isOpen)}
              >
                  <SelectTrigger>
                      <Text css={{ width: '100%', display: 'flex', fd: 'row', jc: 'space-between', ai: 'stretch', gap: '$3' }}>  
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
