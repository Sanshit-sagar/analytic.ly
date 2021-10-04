import Re

const DestinationTabContent = () => {

    return (
        <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'flex-start', gap: '$1'}}>
            <DestinationUrlInput />
            <FilteredDestinationUrls /> 
        </Flex>
    );
}