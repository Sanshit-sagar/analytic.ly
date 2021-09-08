




const SelectionIndicator = ({ index }: { index: number }) => {
    if(index!==selectedIndex) return null;
    return <SelectIndicator />;
}

const SelectText = ({ text }: { text: string }) => {
    return <SelectableText> {text} </SelectableText>;
}

const SlugMenu = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)
            
    return (
        <SelectRoot
            open={isOpen || false}
            onOpenChange={() => setIsOpen(!isOpen)}
        >
            <SelectTrigger>
                <Text> 
                    {slugCategoryOptions[selectedIndex]?.category} 
                    <ChevronDownIcon />
                </Text>
            </SelectTrigger>
            <SelectContent>
                <SelectRadioGroup>
                    {slugCategoryOptions.map((option: ISlugCateogry, index: number) => {
                        return (
                            <SelectRadioItem
                                key={index}
                                onSelect={() => setSelectedIndex(index)}
                            > 
                                <SelectionIndicator index={index} />
                                <SelectText text={option.category} />
                            </SelectRadioItem>
                        );
                    })}
                </SelectRadioGroup>
            </SelectContent>
        </SelectRoot>
    );
}