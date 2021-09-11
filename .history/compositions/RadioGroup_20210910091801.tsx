import { styled } from '../stitches.config'
import { Flex } from '../primitives/Flex'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

const StyledRadio = styled(RadioGroupPrimitive.Item, {
    all: 'unset',
    backgroundColor: '$accent',
    width: 25,
    height: 25,
    borderRadius: '100%',
    boxShadow: `0 2px 10px $accent`,
    '&:hover': { 
      backgroundColor: '$accentFull',
    },
    '&:focus': { 
        boxShadow: `0 0 0 2px $funky` 
    },
});

const StyledIndicator = styled(RadioGroupPrimitive.Indicator, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  position: 'relative',
  '&::after': {
    content: '""',
    display: 'block',
    width: 11,
    height: 11,
    borderRadius: '50%',
    backgroundColor: '$panel'
  },
});

const Label = styled('label', {
    color: 'white',
    fontSize: 15,
    lineHeight: 1,
    userSelect: 'none',
    paddingLeft: 15,
});
  
const PrimitiveRadioGroup = RadioGroupPrimitive.Root;
const RadioGroupRadio = StyledRadio;
const RadioGroupIndicator = StyledIndicator;

export const RadioGroup = ({ radioItems }: { radioItems: { value: string; label: string }[]; }) => {

    return (
        <PrimitiveRadioGroup defaultValue={radioItems[0].value} aria-label="Radio alternates">
            {radioItems.map((ri, idx) => {
                return (
                    <Flex key={idx} css={{ margin: '10px 0', alignItems: 'center' }}>
                      <RadioGroupRadio value={ri.value} id={`radio-item-${idx}`}>
                        <RadioGroupIndicator />
                      </RadioGroupRadio>
                      <Label htmlFor={`radio-item-${idx}`}>{ri.label}</Label>
                    </Flex>
                );
            })}
        </PrimitiveRadioGroup>
    );
}
