


export const CheckboxDemo = () => (
    <Flex css={{ alignItems: 'center' }}>
      <Checkbox defaultChecked id="c1">
        <CheckboxIndicator>
          <CheckIcon />
        </CheckboxIndicator>
      </Checkbox>
      <Label css={{ paddingLeft: 15 }} htmlFor="c1">
        Accept terms and conditions.
      </Label>
    </Flex>
  );
  