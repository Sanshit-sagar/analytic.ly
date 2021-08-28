import * as Toggle from '@radix-ui/react-toggle';


const StyledToggle = styled(TogglePrimitive.Root, {
    all: 'unset',
    backgroundColor: 'white',
    color: mauve.mauve11,
    height: 35,
    width: 35,
    borderRadius: 4,
    display: 'flex',
    fontSize: 15,
    lineHeight: 1,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0 2px 10px ${blackA.blackA7}`,
    '&:hover': { 
        backgroundColor: violet.violet3 
    },
    '&[data-state=on]': { 
        backgroundColor: violet.violet6, 
        color: violet.violet12 
    },
    '&:focus': { boxShadow: `0 0 0 2px black` },
});

export const ToggleButton = () => {
    return <Toggle.Root />;
}