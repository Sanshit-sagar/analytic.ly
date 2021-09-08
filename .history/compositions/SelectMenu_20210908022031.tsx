import React from 'react'
import {
    SelectTrigger,
    SelectContent,
    SelectRadioGroup,
    SelectRadioItem,
    SelectIndicator, 
    SelectableText
} from '../primitives/Select' 

import { useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'

interface ISelectionIndicatorProps {
    index:number; 
    selectedIndex: number
}

interface ISelectMenuProps {
    index: number;
    setIndex: (value: number) => void;
    item: string;
    itemText: string; 
    itemGroupName: string; 
};

const isSelected = (index: number, selectedIndex: number): boolean => index===selectedIndex
const getHashFromValue = (group: string, a: string, b?: string):string => `${group}-item-${a}-value-${b || ''}`
const getHashFromIndex = (group: string, i: number): string => `${group}-item-index-${i}`

const hash = (controlGroupName: string, a?: string, b?: string, i?: number): string => {
     let group = controlGroupName || `Group-${Math.random()}`
     return a && b ? getHashFromValue(group, a, b) : i ? getHashFromIndex(group, i) : `${Math.random()}`;
};

const SelectionIndicator = ({index, selectedIndex}: ISelectionIndicatorProps) => {
    return isSelected(index,selectedIndex) ? <SelectIndicator /> : null 
}

const SelectMenu = ({ index, setIndex, item, itemText, itemGroupName }: ISelectMenuProps) => {
    const [isOpen, setIsOpen] = useState(false)
  
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


interface ISeparator {
    textValue: string;
    value: string;
    alt?: string | undefined;
    icon?: JSX.Element | undefined;  
}

const SelectHOC = () => {
    const [separatorIndex, setSeparatorIndex] = useAtom(separatorIndexAtom)
    const separator = useAtomValue(separatorAtom)
    const separatorText = useAtomValue(separatorTextAtom)
        
    const controlGroupLabel = SEPARATOR_LABEL
    const controlGroupName = SEPARATOR_NAME


    onst separators: ISeparator[] = [
       { textValue: '-', value: 'hyphen', alt: 'dash', icon: <DashIcon /> },
       { textValue: '_', value: 'underscore', alt: undefined, icon: <MinusIcon /> },
       { textValue: '*', value: 'star', alt: 'asterisk', icon: <StarIcon /> }, 
       { textValue: '.', value: 'dot', alt: 'period', icon: <DotIcon /> }
    ;

    return (
        <SelectMenu
            index={separatorIndex}
            setIndex={setSeparatorIndex}
            item={separator}
            itemText={separatorText}
            itemGroupName={controlGroupLabel}
        /> 
    )
}