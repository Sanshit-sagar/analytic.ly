import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Select } from './Select'

export default {
  title: 'Example/SelectMenu',
  component: Select,
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;


export const Primary = Template.bind({});
Primary.args = {
    label: 'atomic.select'
};
